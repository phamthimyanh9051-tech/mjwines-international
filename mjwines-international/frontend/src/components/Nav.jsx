import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { EXPERIENCES, LOGO } from "../data";

const NAV = [
  { label: "Event Stories", to: "/event-stories" },
  {
    label: "Experiences",
    to: "/experiences",
    children: EXPERIENCES.map((e) => ({ label: e.title, to: `/experiences/${e.slug}` })),
  },
  { label: "About", to: "/about", children: [
    { label: "About MJ Wines", to: "/about" },
    { label: "Meet Eve", to: "/about#eve" },
  ] },
  { label: "For Hospitality & Trade", to: "/hospitality" },
  { label: "Contact", to: "/contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const loc = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [loc]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-black/70 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-[72px]">
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-3">
          <img src={LOGO} alt="MJ Wines International" className="h-9 md:h-10 w-auto mix-blend-screen" />
          <span className="label-caps text-[9px] hidden sm:block border-l border-white/20 pl-3 leading-tight">Wine Event<br/>Concierge</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => setDropdown(item.label)}
              onMouseLeave={() => setDropdown(null)}
            >
              <Link
                to={item.to}
                data-testid={`nav-${item.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                className="text-[13px] font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-1"
              >
                {item.label}
                {item.children && <ChevronDown size={13} strokeWidth={1.5} />}
              </Link>
              <AnimatePresence>
                {item.children && dropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 top-full pt-4 w-64"
                  >
                    <div className="bg-black/90 backdrop-blur-xl border border-white/10 p-2">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          to={c.to}
                          className="block px-4 py-2.5 text-[13px] text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            data-testid="nav-plan-event-btn"
            className="hidden sm:inline-flex btn-primary px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.15em] rounded-full"
          >
            Plan Your Event
          </Link>
          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  className="py-3 text-lg font-serif-display border-b border-white/5"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="btn-primary text-center mt-5 px-5 py-3.5 text-[12px] font-semibold uppercase tracking-[0.15em] rounded-full"
              >
                Plan Your Event
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
