# MJ Wines International — Product Requirements Document

## Original Problem Statement
Redesign mjwines.co from a wine e-commerce shop into a premium "Wine Event Concierge" website for MJ Wines International Pte Ltd (Singapore). Reposition MJ Wines as a storytelling + event portfolio + lead-generation platform. No shop, no prices, no cart. Led by Director Eve Lai (14+ yrs). Cinematic, bold, black/greyscale/silver satin palette.

## Architecture
- Frontend: React 19 (CRA/craco), Tailwind, framer-motion, lenis smooth scroll, react-fast-marquee, sonner. Fonts: Cormorant Garamond + Manrope.
- Backend: FastAPI + MongoDB (motor). Enquiry storage + Emergent-managed Resend email notifications.
- Routes (frontend): / (Home), /event-stories, /event-stories/:slug, /experiences, /experiences/:slug, /about (+#eve), /hospitality, /contact, /admin.
- API: POST /api/enquiries (create + email owner), GET /api/enquiries (admin passcode header), POST /api/admin/verify.

## User Personas
- Corporate decision-makers, HR/marketing managers, EAs, business owners, event planners.
- Hospitality & trade partners (hotels, restaurants, clubs, venues).
- Private clients (weddings, birthdays, anniversaries).

## Core Requirements (static)
- Cinematic hero (rotating grayscale imagery, masked headline reveal, parallax).
- Event Stories as the heart (editorial cards + filters + detail pages with brief/experience/wines/delivered/gallery/outcome).
- Experiences (7 core) with dedicated landing pages (who/occasions/provides/enhancements/FAQ/examples/CTA).
- Hospitality & Trade page with dedicated enquiry form.
- Multi-step Plan Your Event enquiry form + admin dashboard.
- Sticky WhatsApp + Plan Your Event buttons. SEO meta + Organization schema. Mobile-first.
- No e-commerce, prices, cart, product grids.

## Implemented (2026-08-17)
- Real logo (silver "mjwines · mei jiu") in header + footer (mix-blend-screen).
- Testimonial collection: public /share-your-story form -> pending -> admin approve/hide/delete -> approved show on homepage (no fake quotes). Endpoints: POST /api/testimonials, GET /api/testimonials/approved, GET /api/testimonials (admin), PATCH/DELETE (admin).
- Admin dashboard tabbed: Enquiries + Testimonials moderation.
- Event Stories expanded to 6 slots (awaiting real photos + facts per event).
- Homepage sections: hero, marquee, numbered manifesto, featured stories, experiences grid, process, why choose, meet Eve, social proof + portfolio link, Instagram highlight cards, final CTA.
- Event Stories listing (filters) + 5 story detail pages with galleries.
- Experiences listing + 7 detail pages with FAQ accordion.
- About (+ Meet Eve anchor + Partners), Hospitality & Trade page with trade enquiry form.
- Contact 3-step enquiry form (verified backend create + email send + admin list via curl).
- Admin dashboard (passcode) at /admin.
- SEO meta/OG/schema in index.html.

## Backlog / Remaining
- P1: "Our Wine World" wine storytelling section/page (winery stories, regions, pairing).
- P1: Replace placeholder WhatsApp number, email, and add real event photography (currently stock grayscale).
- P2: Live Instagram feed (currently curated linked cards), embed corporate portfolio flipbook inline.
- P2: Client/partner logos + real testimonials once approved. Per-page dynamic titles/meta (react-helmet).
- P2: Old Shopify product URL redirects.

## Next Tasks
- Add "Our Wine World" storytelling page.
- Swap in real photos + verified contact details from client.
- Add real testimonials/logos when provided.
