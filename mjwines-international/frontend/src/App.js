import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "sonner";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { StickyActions } from "./components/StickyActions";
import Home from "./pages/Home";
import EventStories from "./pages/EventStories";
import StoryDetail from "./pages/StoryDetail";
import Experiences from "./pages/Experiences";
import ExperienceDetail from "./pages/ExperienceDetail";
import About from "./pages/About";
import Hospitality from "./pages/Hospitality";
import Contact from "./pages/Contact";
import Testimonial from "./pages/Testimonial";
import Admin from "./pages/Admin";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

function Layout({ children }) {
  return (
    <div className="grain relative min-h-screen bg-[#050505]">
      <Nav />
      <main>{children}</main>
      <StickyActions />
      <Footer />
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let raf;
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Toaster position="top-center" theme="dark" richColors />
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/event-stories" element={<Layout><EventStories /></Layout>} />
        <Route path="/event-stories/:slug" element={<Layout><StoryDetail /></Layout>} />
        <Route path="/experiences" element={<Layout><Experiences /></Layout>} />
        <Route path="/experiences/:slug" element={<Layout><ExperienceDetail /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/hospitality" element={<Layout><Hospitality /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/share-your-story" element={<Layout><Testimonial /></Layout>} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
