import os
import re
import ipaddress
import logging
import uuid
from pathlib import Path
from datetime import datetime, timezone
from typing import List, Optional
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Header
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = FastAPI()
api_router = APIRouter(prefix="/api")

# ---------------- Email config (Resend instead of Emergent) ----------------
# Sign up free at https://resend.com -> get API key -> verify a sending domain
# (or use their default test domain onboarding@resend.dev for quick testing)
RESEND_API_KEY = os.environ["RESEND_API_KEY"]
EMAIL_FROM = os.environ["EMAIL_FROM"]  # e.g. "MJ Wines International <hello@mjwines.co>"
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]
ADMIN_PASSCODE = os.environ["ADMIN_PASSCODE"]


# ---------------- Email guardrail gate (unchanged logic) ----------------
_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> Optional[str]:
    """Sends email via Resend (https://resend.com) instead of Emergent's email integration."""
    _assert_safe_email(subject, html)
    payload = {
        "from": EMAIL_FROM,
        "to": [to],
        "subject": subject,
        "html": html,
    }
    if EMAIL_REPLY_TO:
        payload["reply_to"] = EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http_client:
            resp = await http_client.post(
                "https://api.resend.com/emails",
                headers={"Authorization": f"Bearer {RESEND_API_KEY}"},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        return None


# ---------------- Models (unchanged) ----------------
class Enquiry(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    company: Optional[str] = None
    email: str
    mobile: Optional[str] = None
    preferred_contact: Optional[str] = None
    event_type: Optional[str] = None
    event_date: Optional[str] = None
    guests: Optional[str] = None
    venue_status: Optional[str] = None
    budget: Optional[str] = None
    services: List[str] = Field(default_factory=list)
    wine_requirements: Optional[str] = None
    details: Optional[str] = None
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class EnquiryCreate(BaseModel):
    name: str
    company: Optional[str] = None
    email: str
    mobile: Optional[str] = None
    preferred_contact: Optional[str] = None
    event_type: Optional[str] = None
    event_date: Optional[str] = None
    guests: Optional[str] = None
    venue_status: Optional[str] = None
    budget: Optional[str] = None
    services: List[str] = Field(default_factory=list)
    wine_requirements: Optional[str] = None
    details: Optional[str] = None


def _enquiry_email_html(e: Enquiry) -> str:
    def row(label, value):
        if not value:
            return ""
        return (f'<tr><td style="padding:6px 12px;font-size:13px;color:#71717A;'
                f'width:180px;vertical-align:top">{escape(label)}</td>'
                f'<td style="padding:6px 12px;font-size:14px;color:#111">{escape(str(value))}</td></tr>')
    services = ", ".join(e.services) if e.services else ""
    rows = "".join([
        row("Name", e.name), row("Company", e.company), row("Email", e.email),
        row("Mobile", e.mobile), row("Preferred contact", e.preferred_contact),
        row("Event type", e.event_type), row("Preferred date", e.event_date),
        row("Estimated guests", e.guests), row("Venue", e.venue_status),
        row("Budget range", e.budget), row("Services required", services),
        row("Wine requirements", e.wine_requirements), row("Details", e.details),
    ])
    return (f'<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;'
            f'font-family:Arial,sans-serif;background:#fafafa"><tr><td style="padding:28px">'
            f'<p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#888;margin:0">'
            f'New Event Enquiry</p>'
            f'<h1 style="font-size:22px;color:#111;margin:6px 0 18px">A new enquiry just arrived</h1>'
            f'<table role="presentation" width="100%" style="background:#fff;border:1px solid #eee;'
            f'border-radius:6px">{rows}</table>'
            f'<p style="font-size:12px;color:#888;margin-top:22px">Sent by {escape(EMAIL_FROM)}. '
            f'We never ask for your password or card details by email.</p></td></tr></table>')


@api_router.get("/")
async def root():
    return {"message": "MJ Wines International API"}


@api_router.post("/enquiries", response_model=Enquiry)
async def create_enquiry(payload: EnquiryCreate):
    enquiry = Enquiry(**payload.model_dump())
    await db.enquiries.insert_one(enquiry.model_dump())
    subject = f"New event enquiry from {enquiry.name}"
    await send_email(to=OWNER_EMAIL, subject=subject, html=_enquiry_email_html(enquiry))
    return enquiry


@api_router.get("/enquiries", response_model=List[Enquiry])
async def list_enquiries(x_admin_passcode: str = Header(None)):
    if x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    docs = await db.enquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return docs


@api_router.post("/admin/verify")
async def verify_admin(x_admin_passcode: str = Header(None)):
    if x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    return {"ok": True}


# ---------------- Testimonials (unchanged) ----------------
class Testimonial(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: Optional[str] = None
    company: Optional[str] = None
    event: Optional[str] = None
    rating: Optional[int] = None
    quote: str
    approved: bool = False
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class TestimonialCreate(BaseModel):
    name: str
    role: Optional[str] = None
    company: Optional[str] = None
    event: Optional[str] = None
    rating: Optional[int] = None
    quote: str


@api_router.post("/testimonials", response_model=Testimonial)
async def create_testimonial(payload: TestimonialCreate):
    t = Testimonial(**payload.model_dump())
    await db.testimonials.insert_one(t.model_dump())
    return t


@api_router.get("/testimonials/approved", response_model=List[Testimonial])
async def list_approved_testimonials():
    return await db.testimonials.find({"approved": True}, {"_id": 0}).sort("created_at", -1).to_list(100)


@api_router.get("/testimonials", response_model=List[Testimonial])
async def list_testimonials(x_admin_passcode: str = Header(None)):
    if x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    return await db.testimonials.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)


@api_router.patch("/testimonials/{tid}")
async def set_testimonial_approval(tid: str, approved: bool, x_admin_passcode: str = Header(None)):
    if x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    res = await db.testimonials.update_one({"id": tid}, {"$set": {"approved": approved}})
    if res.matched_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True, "approved": approved}


@api_router.delete("/testimonials/{tid}")
async def delete_testimonial(tid: str, x_admin_passcode: str = Header(None)):
    if x_admin_passcode != ADMIN_PASSCODE:
        raise HTTPException(status_code=401, detail="Invalid passcode")
    await db.testimonials.delete_one({"id": tid})
    return {"ok": True}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
