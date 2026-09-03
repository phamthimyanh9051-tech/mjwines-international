import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { Reveal } from "../components/Motion";
import { IMG, CONTACT } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const TRADE_SERVICES = [
  "Wine supply", "Curated wine selections", "Wine pairing consultation", "Wine-menu development",
  "Staff wine training", "Wine dinners", "Guest engagement", "Collaborative events", "Event wine logistics", "Banquet support",
];

export default function Hospitality() {
  const [form, setForm] = useState({ name: "", company: "", email: "", mobile: "", details: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return toast.error("Please add your name and email.");
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, { ...form, event_type: "Hospitality & Trade", services: ["Trade / Hospitality"] });
      setSent(true);
      toast.success("Enquiry sent. We'll be in touch shortly.");
    } catch {
      toast.error("Something went wrong. Please try WhatsApp instead.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="hospitality-page" className="pt-[72px]">
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={IMG.diningTable} alt="Hospitality wine service" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-black/40" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-14">
          <Reveal><span className="label-caps mb-4">For Hospitality & Trade</span></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-serif-display text-4xl md:text-7xl font-light leading-[0.95] max-w-4xl">
              Supporting Hospitality Through Wine, Experiences & Partnership
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-6">
          <Reveal>
            <p className="text-lg text-zinc-400 leading-relaxed mb-10">
              We partner with restaurants, hotels, clubs and event venues to elevate their wine offering —
              never competing with your business. From supply to guest engagement, we support your team
              behind the scenes.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
            {TRADE_SERVICES.map((s, i) => (
              <Reveal key={s} delay={(i % 4) * 0.03}>
                <div className="flex items-start gap-3 text-zinc-300 text-sm border-b border-white/10 pb-4">
                  <Check size={16} className="mt-0.5 text-zinc-500 shrink-0" strokeWidth={1.5} /> {s}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <Reveal>
            <div className="card-line p-8">
              <h2 className="font-serif-display text-3xl font-light mb-6">Trade & Hospitality Enquiry</h2>
              {sent ? (
                <div data-testid="hospitality-success" className="py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-5"><Check size={24} /></div>
                  <p className="font-serif-display text-2xl font-light mb-2">Thank you</p>
                  <p className="text-sm text-zinc-400">We'll be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  {[["name", "Name *"], ["company", "Business / Venue"], ["email", "Email *"], ["mobile", "Mobile"]].map(([k, label]) => (
                    <div key={k}>
                      <label className="label-caps block mb-2">{label}</label>
                      <input
                        data-testid={`trade-${k}`}
                        value={form[k]}
                        onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                        className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="label-caps block mb-2">How can we support you?</label>
                    <textarea
                      data-testid="trade-details"
                      rows={3}
                      value={form.details}
                      onChange={(e) => setForm({ ...form, details: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <button data-testid="trade-submit" disabled={loading} className="btn-primary w-full py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em] disabled:opacity-50">
                    {loading ? "Sending..." : "Send Enquiry"}
                  </button>
                  <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="block text-center text-sm text-zinc-400 hover:text-white transition-colors">or WhatsApp us directly</a>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
