import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Motion";
import { EXPERIENCES, SUPPORTING_SOLUTIONS } from "../data";

export default function Experiences() {
  return (
    <div data-testid="experiences-page" className="pt-[72px]">
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-14">
        <Reveal><p className="label-caps mb-5">Our Offering</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-serif-display text-6xl md:text-8xl font-light leading-[0.92]">Experiences <span className="silver-text italic">We Create</span></h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-zinc-400 leading-relaxed">
            Complete wine-led experiences — not a list of suppliers. Each is curated around your audience,
            occasion and goals, with wine as the signature detail.
          </p>
        </Reveal>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pb-32 space-y-6">
        {EXPERIENCES.map((e, i) => (
          <Reveal key={e.slug} delay={0.03}>
            <Link to={`/experiences/${e.slug}`} data-testid={`experience-${e.slug}`} className="group grid grid-cols-1 md:grid-cols-12 gap-0 card-line overflow-hidden">
              <div className={`md:col-span-5 relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[320px] hover-zoom ${i % 2 ? "md:order-2" : ""}`}>
                <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="md:col-span-7 p-8 md:p-14 flex flex-col justify-center">
                <span className="label-caps mb-4 text-zinc-500">0{i + 1}</span>
                <h2 className="font-serif-display text-4xl md:text-5xl font-light mb-4 flex items-center gap-3">
                  {e.title}
                  <ArrowUpRight size={24} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </h2>
                <p className="text-lg text-zinc-400 leading-relaxed max-w-xl">{e.tagline}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <section data-testid="supporting-solutions" className="border-t border-white/10 bg-[#0a0a0a] py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mb-14">
            <Reveal><p className="label-caps mb-4">The Full Experience</p></Reveal>
            <Reveal delay={0.05}><h2 className="font-serif-display text-4xl md:text-6xl font-light leading-[1.02] mb-6">Everything Else, Handled</h2></Reveal>
            <Reveal delay={0.1}>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Wine is our signature — but a great event needs more. Through an established network of
                trusted partners, we bring together the extras that turn a gathering into an occasion,
                coordinated around you as one point of contact.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {SUPPORTING_SOLUTIONS.map((s, i) => (
              <Reveal key={s.t} delay={(i % 3) * 0.05} className="bg-[#0a0a0a]">
                <div className="p-8 h-full hover:bg-[#101010] transition-colors">
                  <h3 className="font-serif-display text-2xl font-light mb-3">{s.t}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <p className="text-xs text-zinc-600 mt-6 max-w-2xl">
              Supporting solutions are delivered together with our trusted event partners and coordinated
              by MJ Wines around your needs.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
