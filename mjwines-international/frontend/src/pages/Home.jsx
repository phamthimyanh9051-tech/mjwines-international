import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ArrowUpRight, ArrowRight, Quote } from "lucide-react";
import { MaskLine, Reveal } from "../components/Motion";
import { CinematicIntro } from "../components/CinematicIntro";
import { IMG, CONTACT, EXPERIENCES, EVENT_STORIES, WHY_CHOOSE, PROCESS } from "../data";

const HERO_IMAGES = [IMG.heroToast, IMG.heroDinner, IMG.heroNetworking, IMG.heroPour];

const Hero = () => {
  const [idx, setIdx] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.85]);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % HERO_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} data-testid="hero-section" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-[10%] h-[120%]">
        <AnimatePresence>
          <motion.img
            key={idx}
            src={HERO_IMAGES[idx]}
            alt="MJ Wines event experience"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
      </motion.div>
      <motion.div style={{ opacity: overlayOpacity }} className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40" />

      <div className="relative z-10 h-full max-w-[1400px] mx-auto px-5 md:px-10 flex flex-col justify-end pb-16 md:pb-24">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1 }}
          className="label-caps mb-6"
        >
          MJ Wines International · Singapore
        </motion.p>
        <h1 className="font-serif-display font-light text-[13vw] leading-[0.92] sm:text-6xl md:text-7xl lg:text-[7.5rem] tracking-tight max-w-5xl">
          <MaskLine delay={0.3}>We Create Wine</MaskLine>
          <MaskLine delay={0.45}><span className="silver-text italic">Experiences</span></MaskLine>
          <MaskLine delay={0.6}>Worth Remembering</MaskLine>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 1 }}
          className="mt-8 max-w-xl text-base md:text-lg text-zinc-300 leading-relaxed"
        >
          We curate wine-led events for businesses and private clients — from intimate pairing
          dinners and masterclasses to corporate celebrations and complete event solutions.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Link to="/contact" data-testid="hero-plan-btn" className="btn-primary px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em] flex items-center gap-2">
            Plan Your Event <ArrowRight size={16} />
          </Link>
          <Link to="/event-stories" data-testid="hero-stories-btn" className="btn-ghost px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">
            Explore Our Event Stories
          </Link>
          <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-zinc-300 hover:text-white transition-colors flex items-center gap-2">
            Chat with Eve <ArrowUpRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const MarqueeStrip = () => (
  <div className="relative z-10 border-y border-white/10 py-6 bg-[#050505]">
    <Marquee speed={30} gradient gradientColor="#050505" gradientWidth={120}>
      {["Wine Appreciation", "Corporate Events", "Pairing Dinners", "Private Celebrations", "Brand Activations", "Corporate Gifting", "Custom Wine Labels"].map((w, i) => (
        <span key={i} className="font-serif-display italic text-3xl md:text-5xl text-zinc-500 mx-12">
          {w} <span className="text-zinc-700 not-italic">·</span>
        </span>
      ))}
    </Marquee>
  </div>
);

const Manifesto = () => {
  const chapters = [
    { n: "01", h: "More Than Wine.", t: "At MJ Wines, wine is never just a bottle on a table. It is a conversation starter, a shared discovery and often the detail guests remember long after an event ends." },
    { n: "02", h: "A Complete Experience.", t: "Led by Director and Wine Event Concierge Eve Lai, we create thoughtfully curated wine experiences for corporate functions, private celebrations and brand collaborations." },
    { n: "03", h: "Every Detail Considered.", t: "From wine selection and food pairing to venues, catering, entertainment, gifting and event-day coordination, we bring together the right people and details." },
  ];
  return (
    <section data-testid="manifesto-section" className="relative z-10 bg-[#050505] py-28 md:py-40">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <Reveal><p className="label-caps mb-4">The MJ Wines Difference</p></Reveal>
        <div className="mt-8 space-y-20 md:space-y-32">
          {chapters.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05}>
              <div className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 ${i % 2 ? "md:pl-[20%]" : ""}`}>
                <div className="md:col-span-2">
                  <span className="font-serif-display text-6xl md:text-7xl text-zinc-700">{c.n}</span>
                </div>
                <div className="md:col-span-8">
                  <h2 className="font-serif-display text-4xl md:text-6xl font-light leading-[1.02] mb-6">{c.h}</h2>
                  <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">{c.t}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedStories = () => {
  const featured = EVENT_STORIES.slice(0, 4);
  return (
    <section data-testid="featured-stories-section" className="relative z-10 bg-[#0a0a0a] py-28 md:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Reveal><p className="label-caps mb-4">Portfolio</p></Reveal>
            <Reveal delay={0.05}><h2 className="font-serif-display text-5xl md:text-7xl font-light leading-none">Every Event<br /><span className="silver-text italic">Has a Story</span></h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link to="/event-stories" className="btn-ghost px-6 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em] whitespace-nowrap">View All Stories</Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {featured.map((s, i) => {
            const span = i === 0 ? "md:col-span-7" : i === 1 ? "md:col-span-5" : i === 2 ? "md:col-span-5" : "md:col-span-7";
            return (
              <Reveal key={s.slug} delay={i * 0.05} className={span}>
                <Link to={`/event-stories/${s.slug}`} data-testid={`story-card-${s.slug}`} className="group block card-line overflow-hidden hover-zoom">
                  <div className={`relative overflow-hidden ${i % 3 === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <span className="absolute top-4 left-4 label-caps text-white/80">{s.category}</span>
                  </div>
                  <div className="p-6 md:p-8">
                    <h3 className="font-serif-display text-3xl md:text-4xl font-light mb-3 flex items-center gap-3">
                      {s.title}
                      <ArrowUpRight size={22} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{s.brief}</p>
                    <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-zinc-500">
                      <span>{s.venue}</span><span>·</span><span>{s.guests}</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ExperiencesGrid = () => (
  <section data-testid="experiences-section" className="relative z-10 bg-[#050505] py-28 md:py-36">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <Reveal><p className="label-caps mb-4">What We Create</p></Reveal>
      <Reveal delay={0.05}><h2 className="font-serif-display text-5xl md:text-7xl font-light leading-none mb-16">Experiences We Create</h2></Reveal>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {EXPERIENCES.map((e, i) => (
          <Reveal key={e.slug} delay={(i % 3) * 0.05}>
            <Link to={`/experiences/${e.slug}`} data-testid={`exp-card-${e.slug}`} className="group relative block card-line overflow-hidden hover-zoom aspect-[4/5]">
              <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-0 p-6 md:p-7">
                <h3 className="font-serif-display text-2xl md:text-3xl font-light mb-2">{e.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed opacity-80">{e.tagline}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-[11px] uppercase tracking-[0.15em] text-white/70 group-hover:text-white transition-colors">
                  Discover <ArrowUpRight size={14} />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Process = () => (
  <section data-testid="process-section" className="relative z-10 bg-[#0a0a0a] py-28 md:py-36 border-y border-white/10">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <div className="max-w-2xl mb-16">
        <Reveal><p className="label-caps mb-4">How It Works</p></Reveal>
        <Reveal delay={0.05}><h2 className="font-serif-display text-4xl md:text-6xl font-light leading-[1.02] mb-6">One Trusted Partner.<br />Every Detail Considered.</h2></Reveal>
        <Reveal delay={0.1}><p className="text-lg text-zinc-400 leading-relaxed">Tell us your occasion, audience and goals. We curate the wines, experience and supporting partners around your needs — one reliable point of coordination from concept to the final toast.</p></Reveal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/10">
        {PROCESS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.05} className="bg-[#0a0a0a]">
            <div className="p-8 h-full">
              <span className="font-serif-display text-5xl text-zinc-700">{p.n}</span>
              <h3 className="font-serif-display text-2xl font-light mt-6 mb-3">{p.t}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const WhyChoose = () => (
  <section data-testid="why-section" className="relative z-10 bg-[#050505] py-28 md:py-36">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <Reveal><p className="label-caps mb-4">Why MJ Wines</p></Reveal>
      <Reveal delay={0.05}><h2 className="font-serif-display text-5xl md:text-7xl font-light leading-none mb-16">The Right Partner</h2></Reveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
        {WHY_CHOOSE.map((w, i) => (
          <Reveal key={i} delay={(i % 3) * 0.05} className="bg-[#050505]">
            <div className="p-8 h-full group hover:bg-[#0d0d0d] transition-colors">
              <h3 className="font-serif-display text-2xl font-light mb-3">{w.t}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{w.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const MeetEve = () => (
  <section data-testid="meet-eve-section" className="relative z-10 bg-[#0a0a0a] py-28 md:py-36 border-t border-white/10">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
      <Reveal className="md:col-span-5">
        <div className="relative card-line overflow-hidden hover-zoom aspect-[4/5]">
          <img src={IMG.eve} alt="Eve Lai, Director of MJ Wines International" className="w-full h-full object-cover" />
        </div>
      </Reveal>
      <div className="md:col-span-6 md:col-start-7">
        <Reveal><p className="label-caps mb-4">Meet Your Concierge</p></Reveal>
        <Reveal delay={0.05}><h2 className="font-serif-display text-5xl md:text-6xl font-light leading-none mb-6">Meet Eve Lai</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-zinc-300 leading-relaxed mb-5">
            Eve Lai is the Director of MJ Wines International and the trusted face behind its wine experiences.
          </p>
          <p className="text-base text-zinc-400 leading-relaxed mb-8">
            With over 14 years in the wine industry, she works with businesses, hospitality partners and
            private clients to design wine-led occasions that are engaging, memorable and professionally
            executed. Supported by the MJ Wines team and a trusted network of event partners, Eve brings
            together wine expertise, creative ideas and practical coordination to make every experience
            feel effortless.
          </p>
          <Link to="/about#eve" data-testid="meet-eve-btn" className="btn-ghost inline-flex px-7 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">Meet Eve</Link>
        </Reveal>
      </div>
    </div>
  </section>
);

const SocialProof = () => {
  const [testis, setTestis] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/testimonials/approved`)
      .then((r) => setTestis(r.data)).catch(() => {});
  }, []);
  const t = testis[0];
  return (
    <section data-testid="social-proof-section" className="relative z-10 bg-[#050505] py-28 md:py-36">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal><p className="label-caps mb-4">{t ? "In Their Words" : "Our Promise"}</p></Reveal>
            <Reveal delay={0.05}>
              <blockquote className="mt-6">
                <Quote size={40} className="text-zinc-700 mb-4" strokeWidth={1} />
                {t ? (
                  <>
                    <p className="font-serif-display text-3xl md:text-4xl font-light leading-[1.15] italic">"{t.quote}"</p>
                    <footer className="mt-6 text-sm text-zinc-500">— {t.name}{t.company ? `, ${t.company}` : ""}</footer>
                  </>
                ) : (
                  <p className="font-serif-display text-3xl md:text-4xl font-light leading-[1.15] italic">
                    From concept to the final toast, we curate the wines, food, venue, entertainment and details that bring people together.
                  </p>
                )}
              </blockquote>
              {t && (
                <Link to="/share-your-story" className="inline-block mt-6 text-sm text-zinc-400 hover:text-white transition-colors underline underline-offset-4">Share your own experience</Link>
              )}
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
            <Reveal delay={0.1}>
              <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                MJ Wines has curated wine-led experiences across corporate, private and hospitality settings.
                Explore our full corporate portfolio to see the breadth of events we have delivered.
              </p>
              <a href={CONTACT.portfolio} target="_blank" rel="noreferrer" data-testid="portfolio-btn" className="btn-primary inline-flex items-center gap-2 px-7 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">
                View Our Corporate Portfolio <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const InstagramFeed = () => {
  const shots = [IMG.cheers, IMG.glassesLine, IMG.networking, IMG.pourDark, IMG.dining, IMG.diningTable];
  return (
    <section data-testid="instagram-section" className="relative z-10 bg-[#0a0a0a] py-28 md:py-36 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Reveal><p className="label-caps mb-4">Follow The Journey</p></Reveal>
            <Reveal delay={0.05}><h2 className="font-serif-display text-4xl md:text-6xl font-light leading-none">From The Feed</h2></Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="flex gap-3">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em]">@mjwines.co</a>
              <a href={CONTACT.instagramEve} target="_blank" rel="noreferrer" className="btn-ghost px-5 py-3 rounded-full text-[11px] font-semibold uppercase tracking-[0.12em]">@eve.sommelian</a>
            </div>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {shots.map((s, i) => (
            <Reveal key={i} delay={(i % 6) * 0.03}>
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="group block card-line overflow-hidden hover-zoom aspect-square">
                <img src={s} alt="MJ Wines Instagram highlight" className="w-full h-full object-cover" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FinalCTA = () => (
  <section data-testid="final-cta-section" className="relative z-10 overflow-hidden py-32 md:py-48">
    <img src={IMG.heroPour} alt="Wine being poured" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-black/70" />
    <div className="relative z-10 max-w-[1400px] mx-auto px-5 md:px-10 text-center">
      <Reveal>
        <h2 className="font-serif-display text-5xl md:text-8xl font-light leading-[0.95] max-w-4xl mx-auto">
          Let's Create Your Next <span className="silver-text italic">Wine Experience</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-2xl mx-auto text-lg text-zinc-300 leading-relaxed">
          Planning a corporate event, private celebration, wine dinner, workshop or branded experience?
          Share your ideas and we will bring the right wines, people and details together.
        </p>
      </Reveal>
      <Reveal delay={0.2}>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/contact" className="btn-primary px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">Plan Your Event</Link>
          <a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="btn-ghost px-8 py-4 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">WhatsApp Eve</a>
        </div>
      </Reveal>
    </div>
  </section>
);

export default function Home() {
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === "undefined") return false;
    return !sessionStorage.getItem("mjw_intro_seen");
  });

  const finishIntro = () => {
    sessionStorage.setItem("mjw_intro_seen", "1");
    setShowIntro(false);
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <CinematicIntro onDone={finishIntro} />}
      </AnimatePresence>
      <Hero />
      <MarqueeStrip />
      <Manifesto />
      <FeaturedStories />
      <ExperiencesGrid />
      <Process />
      <WhyChoose />
      <MeetEve />
      <SocialProof />
      <InstagramFeed />
      <FinalCTA />
    </>
  );
}
