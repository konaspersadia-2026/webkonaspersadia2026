import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Schedules from "./components/Schedules";
import Speakers from "./components/Speakers";
import RegistrationFees from "./components/RegistrationFees";
import CheckStatus from "./components/CheckStatus";
import Location from "./components/Location";
import FAQ from "./components/FAQ";
import Committee from "./components/Committee";
import Footer from "./components/Footer";
import RegistrationModal from "./components/RegistrationModal";
import KemitraanPage from "./components/KemitraanPage";
import Sponsors from "./components/Sponsors";

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync scroll position with navbar links if on home page
  useEffect(() => {
    if (currentPath !== "/" && currentPath !== "/index.html") return;

    const handleScroll = () => {
      const sections = ["beranda", "tentang", "jadwal", "pembicara", "biaya", "cek-status", "lokasi", "panitia", "faq"];
      const scrollPosition = window.scrollY + 120; // offset navbar height

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  // Sync back/forward button path changes
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      if (window.location.pathname === "/kemitraan" || window.location.pathname === "/sponsorship") {
        setActiveSection("kemitraan");
      } else {
        setActiveSection("beranda");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "kemitraan") {
      window.history.pushState({}, "", "/kemitraan");
      setCurrentPath("/kemitraan");
      setActiveSection("kemitraan");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setActiveSection(sectionId);
      if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
        window.history.pushState({}, "", "/");
        setCurrentPath("/");
        setTimeout(() => {
          scrollToSection(sectionId);
        }, 150);
      } else {
        scrollToSection(sectionId);
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = 80; // offset navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleBackToHome = () => {
    window.history.pushState({}, "", "/");
    setCurrentPath("/");
    setActiveSection("beranda");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const isKemitraanActive = currentPath === "/kemitraan" || currentPath === "/sponsorship";

  return (
    <div id="app-root-container" className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col justify-between">
      {/* Navbar Header */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        activeSection={isKemitraanActive ? "kemitraan" : activeSection}
        onNavigate={handleNavigate}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {isKemitraanActive ? (
          <KemitraanPage onBackToHome={handleBackToHome} />
        ) : (
          <>
            {/* 1. Beranda / Hero section */}
            <Hero
              onOpenRegister={handleOpenRegister}
              onNavigate={handleNavigate}
            />

            {/* 2. Tentang Acara */}
            <About />

            {/* 3. Jadwal / Agenda Sesi */}
            <Schedules />

            {/* 4. Profil Pembicara */}
            <Speakers />

            {/* 5. Kategori & Biaya Pendaftaran */}
            <RegistrationFees
              onOpenRegister={handleOpenRegister}
            />

            {/* 6. Cek Status Registrasi */}
            <CheckStatus />

            {/* 7. Panduan Lokasi & Akomodasi */}
            <Location />

            {/* 8. Susunan Panitia Pelaksana */}
            <Committee />

            {/* Sponsor Section */}
            <Sponsors />

            {/* 9. FAQ Section */}
            <FAQ />
          </>
        )}
      </main>

      {/* Footer Block */}
      <Footer />

      {/* Multi-step Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={handleCloseRegister}
      />
    </div>
  );
}
