import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { Reveal } from "../components/Motion";
import { EVENT_STORIES, IMG } from "../data";

const GALLERY = [IMG.diningLong, IMG.pourDark, IMG.networking, IMG.cheers, IMG.glassesLine, IMG.diningTable];

export default function StoryDetail() {
  const { slug } = useParams();
  const story = EVENT_STORIES.find((s) => s.slug === slug) || EVENT_STORIES[0];

  return (
    <div data-testid="story-detail-page" className="pt-[72px]">
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <img src={story.image} alt={story.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/50 to-black/30" />
        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-16">
          <Reveal><span className="label-caps mb-4">{story.category}</span></Reveal>
          <Reveal delay={0.05}><h1 className="font-serif-display text-6xl md:text-8xl font-light leading-[0.9] max-w-4xl">{story.title}</h1></Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-sm text-zinc-300">
              <span><span className="text-zinc-500">Venue · </span>{story.venue}</span>
              <span><span className="text-zinc-500">Guests · </span>{story.guests}</span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-14">
          {[["The Brief", story.brief], ["The Experience", story.experience], ["The Wines", story.wines]].map(([h, t]) => (
            <Reveal key={h}>
              <h2 className="font-serif-display text-3xl md:text-4xl font-light mb-4">{h}</h2>
              <p className="text-lg text-zinc-400 leading-relaxed">{t}</p>
            </Reveal>
          ))}
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <Reveal>
            <div className="card-line p-8 sticky top-24">
              <h3 className="font-serif-display text-2xl font-light mb-6">What MJ Wines Delivered</h3>
              <ul className="space-y-3">
                {story.delivered.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-sm text-zinc-300">
                    <Check size={16} className="mt-0.5 text-zinc-500 shrink-0" strokeWidth={1.5} /> {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pb-24">
        <Reveal><p className="label-caps mb-8">Event Gallery</p></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY.map((g, i) => (
            <Reveal key={i} delay={(i % 3) * 0.05} className={i === 0 ? "col-span-2 md:col-span-2 row-span-2" : ""}>
              <div className="card-line overflow-hidden hover-zoom aspect-[4/3] h-full">
                <img src={g} alt={`${story.title} gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-24 text-center">
        <div className="max-w-3xl mx-auto px-5">
          <Reveal>
            <p className="font-serif-display text-2xl md:text-3xl font-light italic text-zinc-300 mb-8">{story.outcome}</p>
            <h2 className="font-serif-display text-4xl md:text-6xl font-light mb-8">Create an Experience Like This</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">Plan Your Event</Link>
              <Link to="/event-stories" className="btn-ghost inline-flex items-center gap-2 px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]"><ArrowLeft size={15} /> All Stories</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
