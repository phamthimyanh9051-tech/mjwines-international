import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Check, Star } from "lucide-react";
import { Reveal } from "../components/Motion";
import { IMG } from "../data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Testimonial() {
  const [form, setForm] = useState({ name: "", role: "", company: "", event: "", quote: "" });
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.quote) return toast.error("Please add your name and a few words.");
    setLoading(true);
    try {
      await axios.post(`${API}/testimonials`, { ...form, rating: rating || null });
      setSent(true);
      toast.success("Thank you! Your words mean a lot.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="testimonial-page" className="pt-[72px]">
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-16 md:pt-24 pb-24 grid grid-cols-1 md:grid-cols-12 gap-14">
        <div className="md:col-span-5">
          <Reveal><p className="label-caps mb-5">Share Your Story</p></Reveal>
          <Reveal delay={0.05}>
            <h1 className="font-serif-display text-5xl md:text-7xl font-light leading-[0.92]">
              Tell us about<br /><span className="silver-text italic">your experience</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg text-zinc-400 leading-relaxed">
              We're always honoured to hear how an evening felt. Share a few words about your event with
              MJ Wines — with your permission, we may feature your story on our website.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 card-line overflow-hidden aspect-[4/3]">
              <img src={IMG.cheers} alt="Guests celebrating at an MJ Wines event" className="w-full h-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          {sent ? (
            <div data-testid="testimonial-success" className="card-line p-10 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"><Check size={28} /></div>
              <h2 className="font-serif-display text-4xl font-light mb-4">Thank you.</h2>
              <p className="text-zinc-400 leading-relaxed">
                Your words have reached the MJ Wines team. We're grateful you chose to celebrate with us.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="card-line p-8 md:p-10 space-y-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[["name", "Your Name *"], ["role", "Role / Title"], ["company", "Company"], ["event", "Event (optional)"]].map(([k, label]) => (
                  <div key={k}>
                    <label className="label-caps block mb-2">{label}</label>
                    <input
                      data-testid={`testi-${k}`}
                      value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      className="w-full bg-transparent border-b border-white/20 py-2.5 text-white focus:border-white focus:outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="label-caps block mb-3">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" data-testid={`testi-star-${n}`} onClick={() => setRating(n)} className="transition-transform hover:scale-110">
                      <Star size={26} strokeWidth={1.5} className={n <= rating ? "fill-white text-white" : "text-zinc-600"} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label-caps block mb-2">Your Words *</label>
                <textarea
                  data-testid="testi-quote"
                  rows={5}
                  value={form.quote}
                  onChange={(e) => setForm({ ...form, quote: e.target.value })}
                  placeholder="What made the experience memorable?"
                  className="w-full bg-transparent border-b border-white/20 py-2.5 text-white placeholder:text-zinc-600 focus:border-white focus:outline-none transition-colors resize-none"
                />
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed">
                By submitting, you allow MJ Wines to review your feedback and, with attribution as above,
                potentially feature it on our website.
              </p>
              <button data-testid="testi-submit" disabled={loading} className="btn-primary w-full py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em] disabled:opacity-50">
                {loading ? "Sending..." : "Share My Story"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
