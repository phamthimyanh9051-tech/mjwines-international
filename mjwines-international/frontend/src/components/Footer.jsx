import React from "react";
import { Link } from "react-router-dom";
import { Instagram, MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACT, LOGO } from "../data";

export const Footer = () => (
  <footer data-testid="site-footer" className="relative z-10 bg-[#050505] border-t border-white/10 pt-20 pb-10">
    <div className="max-w-[1400px] mx-auto px-5 md:px-10">
      <img src={LOGO} alt="MJ Wines International" className="h-11 w-auto mb-12 mix-blend-screen" />
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
        <div className="md:col-span-5">
          <h3 className="font-serif-display text-4xl md:text-5xl font-light leading-[1.05] max-w-md">
            Let's create your next wine experience.
          </h3>
          <Link
            to="/contact"
            data-testid="footer-plan-btn"
            className="inline-flex btn-primary mt-8 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] rounded-full"
          >
            Plan Your Event
          </Link>
        </div>

        <div className="md:col-span-3 md:col-start-8">
          <p className="label-caps mb-5">Explore</p>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><Link to="/event-stories" className="hover:text-white transition-colors">Event Stories</Link></li>
            <li><Link to="/experiences" className="hover:text-white transition-colors">Experiences</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About & Eve</Link></li>
            <li><Link to="/hospitality" className="hover:text-white transition-colors">Hospitality & Trade</Link></li>
            <li><Link to="/share-your-story" className="hover:text-white transition-colors">Share Your Story</Link></li>
            <li><a href={CONTACT.portfolio} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Corporate Portfolio</a></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <p className="label-caps mb-5">Connect</p>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li><a href={CONTACT.whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><MessageCircle size={15} strokeWidth={1.5}/> WhatsApp</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-white transition-colors"><Mail size={15} strokeWidth={1.5}/> Email</a></li>
            <li><a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={15} strokeWidth={1.5}/> @mjwines.co</a></li>
            <li><a href={CONTACT.instagramEve} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={15} strokeWidth={1.5}/> @eve.sommelian</a></li>
            <li className="flex items-center gap-2"><MapPin size={15} strokeWidth={1.5}/> {CONTACT.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} MJ Wines International Pte Ltd. Singapore's Wine Event Concierge.</p>
        <p className="font-serif-display italic text-zinc-400">Wine experiences, thoughtfully curated and seamlessly delivered.</p>
      </div>
    </div>
  </footer>
);
