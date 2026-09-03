import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, CalendarHeart } from "lucide-react";
import { CONTACT } from "../data";

export const StickyActions = () => (
  <div className="fixed bottom-4 right-4 left-4 md:left-auto z-40 flex gap-3 md:flex-col md:items-end">
    <a
      href={CONTACT.whatsappLink}
      target="_blank"
      rel="noreferrer"
      data-testid="sticky-whatsapp-btn"
      className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white px-5 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.12em] hover:bg-white/20 transition-colors"
    >
      <MessageCircle size={16} strokeWidth={1.5} /> WhatsApp Eve
    </a>
    <Link
      to="/contact"
      data-testid="sticky-plan-btn"
      className="flex-1 md:flex-none flex items-center justify-center gap-2 btn-primary px-5 py-3.5 rounded-full text-[12px] font-semibold uppercase tracking-[0.12em]"
    >
      <CalendarHeart size={16} strokeWidth={1.5} /> Plan Your Event
    </Link>
  </div>
);
