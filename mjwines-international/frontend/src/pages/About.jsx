import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Reveal } from "../components/Motion";
import { IMG, CONTACT } from "../data";

export default function About() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash === "#eve") {
      const el = document.getElementById("eve");
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 200);
    }
  }, [hash]);

  return (
    <div data-testid="about-page" className="pt-[72px]">
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 pt-20 md:pt-28 pb-20">
        <Reveal><p className="label-caps mb-5">About MJ Wines</p></Reveal>
        <Reveal delay={0.05}>
          <h1 className="font-serif-display text-5xl md:text-8xl font-light leading-[0.92] max-w-4xl">
            More than a wine distributor.<br /><span className="silver-text italic">A wine event concierge.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl">
            <p className="text-lg text-zinc-400 leading-relaxed">
              MJ Wines International curates and delivers wine-led experiences for corporate clients,
              private clients, hospitality businesses, event organisers and brand partners. Wine remains
              our signature and area of expertise.
            </p>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Our value lies in bringing together the right wines, venues, food, entertainment, gifting,
              logistics and trusted event partners — creating seamless and memorable experiences with one
              trusted point of contact.
            </p>
          </div>
        </Reveal>
      </section>

      <section id="eve" className="border-t border-white/10 bg-[#0a0a0a] py-20 md:py-28 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <Reveal className="md:col-span-5">
            <div className="card-line overflow-hidden hover-zoom aspect-[4/5]">
              <img src={IMG.eve} alt="Eve Lai, Director of MJ Wines International" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="card-line overflow-hidden hover-zoom aspect-square">
                <img src={IMG.eveGoldenHour} alt="Eve Lai with a curated wine" className="w-full h-full object-cover" />
              </div>
              <div className="card-line overflow-hidden hover-zoom aspect-square">
                <img src={IMG.eveSeated} alt="Eve Lai, Wine Event Concierge" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>
          <div className="md:col-span-6 md:col-start-7">
            <Reveal><p className="label-caps mb-4">Director & Wine Event Concierge</p></Reveal>
            <Reveal delay={0.05}><h2 className="font-serif-display text-5xl md:text-6xl font-light mb-6">Eve Lai</h2></Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif-display text-2xl font-light italic text-zinc-300 mb-6">
                "Hi, I'm Eve Lai, Director of MJ Wines International and your Wine Event Concierge."
              </p>
              <p className="text-base text-zinc-400 leading-relaxed mb-4">
                With over 14 years of experience in the wine industry, I curate memorable wine experiences
                and provide end-to-end event solutions for businesses and private clients.
              </p>
              <p className="text-base text-zinc-400 leading-relaxed mb-8">
                Whether it is a corporate function, private celebration, wine dinner, workshop or brand
                activation, my team and I bring together exceptional wines, trusted partners and seamless
                event execution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="btn-primary px-7 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">Plan Your Event</Link>
                <a href={CONTACT.instagramEve} target="_blank" rel="noreferrer" className="btn-ghost px-7 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.15em]">Eve's Wine Journey</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="max-w-[1400px] mx-auto px-5 md:px-10 py-20 md:py-28">
        <Reveal><p className="label-caps mb-4">Our Partners</p></Reveal>
        <Reveal delay={0.05}><h2 className="font-serif-display text-4xl md:text-6xl font-light mb-8 max-w-3xl">An established network, coordinated around you.</h2></Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg text-zinc-400 leading-relaxed max-w-3xl">
            MJ Wines brings together trusted partners across venues, catering, entertainment, logistics and
            gifting. We coordinate these services around each client's needs — so you get creativity,
            reliable execution and peace of mind, without managing multiple suppliers yourself.
          </p>
        </Reveal>
      </section>
    </div>
  );
}
