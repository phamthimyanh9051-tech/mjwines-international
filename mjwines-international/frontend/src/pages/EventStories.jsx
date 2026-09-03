import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Motion";
import { EVENT_STORIES } from "../data";

const FILTERS = ["All", "Corporate", "Wine Dinner", "Workshop", "Private Celebration", "Brand Collaboration", "Hospitality", "Networking", "Venue"];

export default function EventStories() {
  const [filter, setFilter] = useState("All");
  const stories = filter === "All" ? EVENT_STORIES : EVENT_STORIES.filter((s) => s.tags.includes(filter) || s.category === filter);

  return (
    <div data-testid="event-stories-page" className="pt-[72px]">
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-14">
        <Reveal><p className="label-caps mb-5">Portfolio</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-serif-display text-6xl md:text-8xl font-light leading-[0.92]">Event <span className="silver-text italic">Stories</span></h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-2xl text-lg text-zinc-400 leading-relaxed">
            The heart of MJ Wines. Every event we deliver has a story — a brief, an experience, and an
            outcome. Explore a selection of the occasions we have curated.
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              data-testid={`filter-${f.toLowerCase().replace(/\s+/g, "-")}`}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-[12px] font-medium uppercase tracking-[0.1em] border transition-colors ${
                filter === f ? "bg-white text-black border-white" : "border-white/15 text-zinc-400 hover:border-white/40 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {stories.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 2) * 0.05}>
              <Link to={`/event-stories/${s.slug}`} data-testid={`story-${s.slug}`} className="group block card-line overflow-hidden hover-zoom">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <span className="absolute top-4 left-4 label-caps text-white/80">{s.category}</span>
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="font-serif-display text-3xl md:text-4xl font-light mb-3 flex items-center gap-3">
                    {s.title}
                    <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed">{s.brief}</p>
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-xs text-zinc-500">
                    <span>{s.venue}</span><span>·</span><span>{s.guests}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
