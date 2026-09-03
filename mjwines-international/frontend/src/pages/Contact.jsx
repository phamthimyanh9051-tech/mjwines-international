import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, MessageCircle, Mail, MapPin } from "lucide-react";
import { Reveal } from "../components/Motion";
import { CONTACT, EVENT_TYPES, SERVICE_OPTIONS } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STEPS = ["Your Occasion", "Event Details", "About You"];

const Field = ({ label, k, form, setForm, type = "text" }) => (
  <div>
    <label className="label-caps block mb-2">{label}</label>
    <input
      data-testid={`enq-${k}`}
      type={type}
      value={form[k]}
      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
      className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none transition-colors"
    />
  </div>
);

export default function Contact() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", email: "", mobile: "", preferred_contact: "WhatsApp",
    event_type: "", event_date: "", guests: "", venue_status: "", budget: "",
    services: [], wine_requirements: "", details: "",
  });

  const toggleService = (s) =>
    setForm((f) => ({ ...f, services: f.services.includes(s) ? f.services.filter((x) => x !== s) : [...f.services, s] }));

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!form.name || !form.email) { setStep(2); return toast.error("Please add your name and email."); }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      setSent(true);
      toast.success("Enquiry sent! We'll be in touch soon.");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div data-testid="contact-success" className="pt-[72px] min-h-screen flex items-center justify-center px-5">
        <div className="text-center max-w-lg">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-8"><Check size={28} /></div>
          <h1 className="font-serif-display text-5xl md:text-6xl font-light mb-5">Thank you.</h1>
          <p className="text-lg text-zinc-400 leading-relaxed mb-8">
            Your enquiry is on its way to Eve and the MJ Wines team. We'll be in touch shortly to start
            shaping your wine experience.
          </p>
          <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">
            <MessageCircle size={15} /> Message us on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div data-testid="contact-page" className="pt-[72px]">
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-24 grid grid-cols-1 md:grid-cols-12 gap-14">
        <div className="md:col-span-4">
          <Reveal><p className="label-caps mb-5">Plan Your Event</p></Reveal>
          <Reveal delay={0.05}><h1 className="font-serif-display text-5xl md:text-7xl font-light leading-[0.92]">Let's begin.</h1></Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-zinc-400 leading-relaxed">
              Share a few details and we'll craft a curated concept. Not everything is required — tell us
              what you know and we'll take it from there.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 space-y-4 text-sm">
              <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"><MessageCircle size={16} strokeWidth={1.5} /> {CONTACT.whatsapp}</a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-zinc-300 hover:text-white transition-colors"><Mail size={16} strokeWidth={1.5} /> {CONTACT.email}</a>
              <span className="flex items-center gap-3 text-zinc-400"><MapPin size={16} strokeWidth={1.5} /> {CONTACT.address}</span>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="flex gap-2 mb-10">
            {STEPS.map((s, i) => (
              <div key={s} className="flex-1">
                <div className={`h-0.5 mb-2 transition-colors ${i <= step ? "bg-white" : "bg-white/15"}`} />
                <span className={`text-[11px] uppercase tracking-[0.12em] ${i === step ? "text-white" : "text-zinc-600"}`}>{s}</span>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4 }}>
              {step === 0 && (
                <div className="space-y-8">
                  <div>
                    <label className="label-caps block mb-4">Event Type</label>
                    <div className="flex flex-wrap gap-2.5">
                      {EVENT_TYPES.map((t) => (
                        <button key={t} type="button" data-testid={`event-type-${t.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => setForm({ ...form, event_type: t })}
                          className={`px-5 py-2.5 rounded-full text-[13px] border transition-colors ${form.event_type === t ? "bg-white text-black border-white" : "border-white/15 text-zinc-400 hover:border-white/40 hover:text-white"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label-caps block mb-4">Services Required</label>
                    <div className="flex flex-wrap gap-2.5">
                      {SERVICE_OPTIONS.map((s) => (
                        <button key={s} type="button" data-testid={`service-${s.toLowerCase().replace(/\s+/g, "-")}`} onClick={() => toggleService(s)}
                          className={`px-5 py-2.5 rounded-full text-[13px] border transition-colors ${form.services.includes(s) ? "bg-white text-black border-white" : "border-white/15 text-zinc-400 hover:border-white/40 hover:text-white"}`}>{s}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Preferred Date" k="event_date" form={form} setForm={setForm} type="date" />
                  <Field label="Estimated Guests" k="guests" form={form} setForm={setForm} />
                  <div>
                    <label className="label-caps block mb-2">Venue</label>
                    <div className="flex gap-2">
                      {["Confirmed", "Venue required"].map((v) => (
                        <button key={v} type="button" onClick={() => setForm({ ...form, venue_status: v })}
                          className={`px-4 py-2.5 rounded-full text-[13px] border transition-colors ${form.venue_status === v ? "bg-white text-black border-white" : "border-white/15 text-zinc-400 hover:border-white/40"}`}>{v}</button>
                      ))}
                    </div>
                  </div>
                  <Field label="Estimated Budget Range" k="budget" form={form} setForm={setForm} />
                  <div className="sm:col-span-2">
                    <label className="label-caps block mb-2">Wine Requirements</label>
                    <input data-testid="enq-wine_requirements" value={form.wine_requirements} onChange={(e) => setForm({ ...form, wine_requirements: e.target.value })} className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none transition-colors" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-caps block mb-2">Additional Details</label>
                    <textarea data-testid="enq-details" rows={3} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none transition-colors resize-none" />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Field label="Name *" k="name" form={form} setForm={setForm} />
                  <Field label="Company" k="company" form={form} setForm={setForm} />
                  <Field label="Email *" k="email" form={form} setForm={setForm} type="email" />
                  <Field label="Mobile Number" k="mobile" form={form} setForm={setForm} />
                  <div className="sm:col-span-2">
                    <label className="label-caps block mb-3">Preferred Contact Method</label>
                    <div className="flex gap-2">
                      {["WhatsApp", "Email", "Phone call"].map((v) => (
                        <button key={v} type="button" onClick={() => setForm({ ...form, preferred_contact: v })}
                          className={`px-5 py-2.5 rounded-full text-[13px] border transition-colors ${form.preferred_contact === v ? "bg-white text-black border-white" : "border-white/15 text-zinc-400 hover:border-white/40"}`}>{v}</button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex items-center justify-between">
            <button type="button" onClick={prev} disabled={step === 0} data-testid="enq-prev" className={`inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.15em] transition-opacity ${step === 0 ? "opacity-0 pointer-events-none" : "text-zinc-400 hover:text-white"}`}>
              <ArrowLeft size={15} /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} data-testid="enq-next" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button type="button" onClick={submit} disabled={loading} data-testid="enq-submit" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em] disabled:opacity-50">
                {loading ? "Sending..." : "Send Enquiry"} <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
