import { useState, useEffect } from "react";
import { Menu, X, Activity } from "lucide-react";
import { EVENT_INFO, BRAND_COLORS } from "../config";

interface NavbarProps {
  onOpenRegister: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ onOpenRegister, activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "beranda", label: "Beranda" },
    { id: "tentang", label: "Tentang Acara" },
    { id: "jadwal", label: "Jadwal & Pembicara" },
    { id: "biaya", label: "Kategori & Biaya" },
    { id: "cek-status", label: "Cek Status" },
    { id: "lokasi", label: "Lokasi" },
    { id: "panitia", label: "Panitia" },
    { id: "faq", label: "FAQ" },
    { id: "kemitraan", label: "Kemitraan" },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#1E3A8A]/95 text-white shadow-lg backdrop-blur-md py-3"
          : "bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <div
            id="brand-logo-container"
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleItemClick("beranda")}
          >
            <div className="flex items-center justify-center bg-white rounded-md p-1">
              <img 
                src="https://placehold.co/120x40/ffffff/1e3a8a?text=Logo+Acara" 
                alt="Logo Konas Persadia" 
                className="h-8 object-contain"
              />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base tracking-tight leading-tight uppercase font-sans">
                Konas Persadia 2026
              </div>
              <div className="text-[10px] text-[#F8FAFC] hidden md:block">
                KONAS PERSADIA • KONKER PEDI • KONKER PERKENI
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleItemClick(item.id)}
                className={`px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                  item.id === "kemitraan"
                    ? activeSection === "kemitraan"
                      ? "bg-amber-400 text-[#1E3A8A] font-extrabold px-4 py-1.5 rounded-full border border-amber-400 shadow-md ml-2"
                      : "bg-amber-400/15 hover:bg-amber-400 text-amber-300 hover:text-[#1E3A8A] font-bold px-4 py-1.5 rounded-full border border-amber-400/40 ml-2 animate-pulse"
                    : activeSection === item.id || (item.id === "jadwal" && activeSection === "pembicara")
                      ? "bg-white/15 text-[#F59E0B] font-semibold rounded-md"
                      : "hover:bg-white/10 text-white/90 hover:text-white rounded-md"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              id="nav-btn-daftar"
              onClick={onOpenRegister}
              className="ml-4 px-4 py-2 bg-[#F59E0B] text-[#1E3A8A] hover:bg-[#F8FAFC] font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              id="nav-mobile-btn-daftar"
              onClick={onOpenRegister}
              className="px-3 py-1.5 bg-[#F59E0B] text-[#1E3A8A] font-bold text-xs rounded-full shadow-sm cursor-pointer"
            >
              Daftar
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 rounded-md hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div id="mobile-nav-drawer" className="lg:hidden bg-[#1E3A8A] border-t border-white/10 shadow-inner px-2 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              id={`nav-mobile-link-${item.id}`}
              onClick={() => handleItemClick(item.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                item.id === "kemitraan"
                  ? activeSection === "kemitraan"
                    ? "bg-amber-400 text-[#1E3A8A] font-extrabold border-l-4 border-amber-600 pl-3"
                    : "bg-amber-400/15 text-amber-300 font-bold border border-amber-400/30 pl-3"
                  : activeSection === item.id || (item.id === "jadwal" && activeSection === "pembicara")
                    ? "bg-white/15 text-[#F59E0B]"
                    : "text-white/95 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
