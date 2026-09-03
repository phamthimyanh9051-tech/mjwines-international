import React from "react";
import { useParams, Link } from "react-router-dom";
import { Check, Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { Reveal } from "../components/Motion";
import { EXPERIENCES, EVENT_STORIES } from "../data";

const FAQS = [
  { q: "How far in advance should we book?", a: "We recommend reaching out three to four weeks ahead for corporate events, though we regularly accommodate shorter timelines. Share your date and we'll advise." },
  { q: "Do you provide the venue?", a: "We coordinate trusted venue partners, or we can work within a venue you have already confirmed. Either way, it's one point of coordination." },
  { q: "Can the experience be tailored to our budget?", a: "Yes. We shape every experience around your audience, format and budget, and we're transparent about what's possible." },
  { q: "Do you handle wine supply and service on the day?", a: "We curate the wines, manage logistics and coordinate event-day service so hosting feels effortless for you." },
];

export default function ExperienceDetail() {
  const { slug } = useParams();
  const exp = EXPERIENCES.find((e) => e.slug === slug) || EXPERIENCES[0];
  const related = EVENT_STORIES.slice(0, 3);

  return (
    <div data-testid="experience-detail-page" className="pt-[72px]">
      <section className="relative h-[65vh] min-h-[440px] overflow-hidden">
        <img src={exp.image} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-black/30" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-16">
          <Reveal><span className="label-caps mb-4">Experience</span></Reveal>
          <Reveal delay={0.05}><h1 className="font-serif-display text-5xl md:text-8xl font-light leading-[0.9] max-w-4xl">{exp.title}</h1></Reveal>
          <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg text-zinc-300">{exp.tagline}</p></Reveal>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-14">
          <Reveal>
            <h2 className="font-serif-display text-3xl md:text-4xl font-light mb-4">Who It's For</h2>
            <p className="text-lg text-zinc-400 leading-relaxed">{exp.who}</p>
          </Reveal>
          <Reveal>
            <h2 className="font-serif-display text-3xl md:text-4xl font-light mb-6">Suitable Occasions</h2>
            <div className="flex flex-wrap gap-3">
              {exp.occasions.map((o) => (
                <span key={o} className="px-5 py-2.5 rounded-full border border-white/15 text-sm text-zinc-300">{o}</span>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <h2 className="font-serif-display text-3xl md:text-4xl font-light mb-6">Frequently Asked</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-white/10">
                  <AccordionTrigger className="text-left font-sans-body text-base hover:no-underline text-zinc-200">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-zinc-400 text-base leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>

        <div className="md:col-span-4 md:col-start-9 space-y-6">
          <Reveal>
            <div className="card-line p-8">
              <h3 className="font-serif-display text-2xl font-light mb-5">What MJ Wines Provides</h3>
              <ul className="space-y-3">
                {exp.provides.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-zinc-300"><Check size={16} className="mt-0.5 text-zinc-500 shrink-0" strokeWidth={1.5} /> {p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <div className="card-line p-8">
              <h3 className="font-serif-display text-2xl font-light mb-5">Optional Enhancements</h3>
              <ul className="space-y-3">
                {exp.enhancements.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-zinc-400"><Plus size={16} className="mt-0.5 text-zinc-600 shrink-0" strokeWidth={1.5} /> {p}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal>
            <Link to="/contact" data-testid="exp-enquire-btn" className="btn-primary flex items-center justify-center px-7 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">Enquire About This Experience</Link>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <Reveal><p className="label-caps mb-8">Past Event Examples</p></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.05}>
                <Link to={`/event-stories/${s.slug}`} className="group block card-line overflow-hidden hover-zoom">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif-display text-2xl font-light">{s.title}</h3>
                    <p className="text-xs text-zinc-500 mt-2">{s.category}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
