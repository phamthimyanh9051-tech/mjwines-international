import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Star, Check, X, Trash2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Admin() {
  const [passcode, setPasscode] = useState("");
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("enquiries");
  const [enquiries, setEnquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);

  const headers = { "X-Admin-Passcode": passcode };

  const loadAll = async (pc) => {
    const h = { "X-Admin-Passcode": pc || passcode };
    const [enq, testi] = await Promise.all([
      axios.get(`${API}/enquiries`, { headers: h }),
      axios.get(`${API}/testimonials`, { headers: h }),
    ]);
    setEnquiries(enq.data);
    setTestimonials(testi.data);
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loadAll(passcode);
      setAuthed(true);
    } catch {
      toast.error("Invalid passcode");
    } finally {
      setLoading(false);
    }
  };

  const approve = async (t, val) => {
    await axios.patch(`${API}/testimonials/${t.id}?approved=${val}`, {}, { headers });
    setTestimonials((ts) => ts.map((x) => (x.id === t.id ? { ...x, approved: val } : x)));
    toast.success(val ? "Approved — now live on the site" : "Hidden from site");
  };

  const remove = async (t) => {
    await axios.delete(`${API}/testimonials/${t.id}`, { headers });
    setTestimonials((ts) => ts.filter((x) => x.id !== t.id));
    toast.success("Deleted");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white grain relative">
      <Toaster position="top-center" theme="dark" richColors />
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-16 relative z-10">
        <h1 className="font-serif-display text-4xl md:text-5xl font-light mb-2">MJ Wines Admin</h1>
        <p className="label-caps mb-10">Enquiries & Testimonials</p>

        {!authed ? (
          <form onSubmit={login} className="max-w-sm card-line p-8">
            <label className="label-caps block mb-3">Admin Passcode</label>
            <input data-testid="admin-passcode" type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none mb-6" />
            <button data-testid="admin-login" disabled={loading} className="btn-primary w-full py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em] disabled:opacity-50">
              {loading ? "..." : "Enter"}
            </button>
          </form>
        ) : (
          <div>
            <div className="flex gap-2 mb-8">
              {[["enquiries", `Enquiries (${enquiries.length})`], ["testimonials", `Testimonials (${testimonials.length})`]].map(([k, label]) => (
                <button key={k} onClick={() => setTab(k)} className={`px-5 py-2.5 rounded-full text-[12px] uppercase tracking-[0.1em] border transition-colors ${tab === k ? "bg-white text-black border-white" : "border-white/15 text-zinc-400 hover:border-white/40"}`}>{label}</button>
              ))}
            </div>

            {tab === "enquiries" && (
              <div data-testid="admin-enquiries" className="space-y-4">
                {enquiries.length === 0 && <p className="text-zinc-500">No enquiries yet.</p>}
                {enquiries.map((e) => (
                  <div key={e.id} className="card-line p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="font-serif-display text-xl">{e.name}</p>
                      <p className="text-zinc-500">{e.company}</p>
                      <p className="text-zinc-400 mt-1">{e.email}</p>
                      <p className="text-zinc-400">{e.mobile}</p>
                    </div>
                    <div>
                      <p className="label-caps mb-1">Event</p>
                      <p className="text-zinc-300">{e.event_type || "—"}</p>
                      <p className="text-zinc-500">{e.event_date} · {e.guests} guests</p>
                      <p className="text-zinc-500">{e.venue_status} · {e.budget}</p>
                    </div>
                    <div>
                      <p className="label-caps mb-1">Services</p>
                      <p className="text-zinc-400">{(e.services || []).join(", ") || "—"}</p>
                      <p className="text-zinc-500 mt-1">{e.wine_requirements}</p>
                    </div>
                    <div>
                      <p className="label-caps mb-1">Details</p>
                      <p className="text-zinc-400">{e.details || "—"}</p>
                      <p className="text-zinc-600 text-xs mt-2">{new Date(e.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "testimonials" && (
              <div data-testid="admin-testimonials" className="space-y-4">
                {testimonials.length === 0 && <p className="text-zinc-500">No testimonials submitted yet.</p>}
                {testimonials.map((t) => (
                  <div key={t.id} className="card-line p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-serif-display text-xl">{t.name}<span className="text-zinc-500 text-sm font-sans-body"> · {t.role} {t.company && `, ${t.company}`}</span></p>
                        {t.event && <p className="text-zinc-500 text-sm">{t.event}</p>}
                        {t.rating ? <div className="flex gap-0.5 mt-1">{Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} className="fill-white text-white" />)}</div> : null}
                      </div>
                      <span className={`text-[11px] uppercase tracking-[0.1em] px-3 py-1 rounded-full ${t.approved ? "bg-white text-black" : "bg-white/10 text-zinc-400"}`}>
                        {t.approved ? "Live" : "Pending"}
                      </span>
                    </div>
                    <p className="text-zinc-300 italic mt-3 leading-relaxed">"{t.quote}"</p>
                    <div className="flex gap-2 mt-5">
                      {t.approved ? (
                        <button onClick={() => approve(t, false)} className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.1em]"><X size={13} /> Hide</button>
                      ) : (
                        <button data-testid={`approve-${t.id}`} onClick={() => approve(t, true)} className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.1em]"><Check size={13} /> Approve</button>
                      )}
                      <button onClick={() => remove(t)} className="btn-ghost inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.1em]"><Trash2 size={13} /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
