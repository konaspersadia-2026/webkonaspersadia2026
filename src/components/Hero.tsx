import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, HeartPulse, ShieldAlert, ArrowRight, Activity } from "lucide-react";
import { EVENT_INFO } from "../config";

interface HeroProps {
  onOpenRegister: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onOpenRegister, onNavigate }: HeroProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    const eventDate = new Date(`${EVENT_INFO.tanggalMulai}T08:00:00+07:00`).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = eventDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isOver: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="beranda"
      className="relative min-h-screen pt-24 pb-16 flex flex-col justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden"
    >
      {/* Decorative Circles */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#1E3A8A]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-[#0D9488]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Badge World Diabetes Day & Hari Kesehatan Nasional */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F59E0B]/25 text-[#1E3A8A] border border-[#F59E0B]/40 backdrop-blur-sm shadow-sm">
            <HeartPulse className="h-4 w-4 animate-pulse text-rose-500" />
            World Diabetes Day 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#0D9488]/20 text-[#1E3A8A] border border-[#0D9488]/30 backdrop-blur-sm shadow-sm">
            <Activity className="h-4 w-4 text-emerald-600" />
            Hari Kesehatan Nasional ke-62
          </span>
        </div>

        {/* Title & Host Organizations */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-xs sm:text-sm font-bold tracking-widest text-[#1E3A8A] uppercase mb-2">
            Kongres Nasional & Konferensi Kerja Bersama
          </p>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 tracking-tight leading-tight mb-4 font-sans">
            KONAS PERSADIA <span className="text-[#1E3A8A]">2026</span>
          </h1>
          <p className="text-lg sm:text-xl font-semibold text-slate-600 mb-6 px-4">
            Mewadahi <span className="font-bold text-[#1E3A8A]">PERSADIA</span> (Persatuan Diabetes Indonesia),{" "}
            <span className="font-bold text-[#1E3A8A]">PEDI</span> (Educator Diabetes), dan{" "}
            <span className="font-bold text-[#1E3A8A]">PERKENI</span> (Endokrinologi)
          </p>

          {/* Theme Banner Card */}
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-10 shadow-xl border border-white/40 transform transition hover:scale-[1.01]">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#0D9488]">Tema Utama</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 mt-1 mb-3">
              "Pesta Rakyat Persadia, Menyehatkan Indonesia"
            </h2>
            <div className="flex justify-center items-center gap-2 text-[#1E3A8A] font-medium text-sm sm:text-base">
              <ShieldAlert className="h-5 w-5 text-[#0D9488]" />
              <span>Topik Utama: <strong>Diabetes, Deteksi Dini Lebih Awal</strong></span>
            </div>
          </div>
        </div>

        {/* Date and Locations Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {/* Tanggal */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/20 flex items-start gap-4 shadow-sm hover:bg-white/85 transition duration-300">
            <div className="p-3 bg-[#1E3A8A] text-white rounded-lg">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Waktu & Tanggal</h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Sabtu - Minggu</p>
              <p className="text-[#1E3A8A] font-bold text-sm sm:text-base">14 - 15 November 2026</p>
            </div>
          </div>

          {/* Venue Ilmiah */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/20 flex items-start gap-4 shadow-sm hover:bg-white/85 transition duration-300">
            <div className="p-3 bg-[#0D9488] text-white rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Sesi Ilmiah (Nakes)</h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Novotel Bogor</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-[10px] rounded">
                Seminar, Simposium & Workshop
              </span>
            </div>
          </div>

          {/* Venue Rakyat */}
          <div className="bg-white/50 backdrop-blur-sm rounded-xl p-5 border border-white/20 flex items-start gap-4 shadow-sm hover:bg-white/85 transition duration-300">
            <div className="p-3 bg-[#F59E0B] text-[#1E3A8A] rounded-lg font-bold">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm">Pesta Rakyat (Umum)</h4>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">Stadion Pekansari Cibinong</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold text-[10px] rounded">
                Senam, Jalan Sehat & Skrining Gratis
              </span>
            </div>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="max-w-xl mx-auto mb-12 text-center">
          <h3 className="text-xs sm:text-sm font-bold text-slate-600 tracking-wider uppercase mb-3">
            {timeLeft.isOver ? "Acara Telah Dimulai / Berakhir" : "Menghitung Mundur Menuju Acara"}
          </h3>
          {!timeLeft.isOver && (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
              {[
                { label: "Hari", value: timeLeft.days },
                { label: "Jam", value: timeLeft.hours },
                { label: "Menit", value: timeLeft.minutes },
                { label: "Detik", value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#1E3A8A] text-white p-3 sm:p-4 rounded-xl shadow-md border border-[#F59E0B]/20">
                  <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-medium text-[#F59E0B] uppercase mt-0.5">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Primary and Secondary CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button
            id="hero-cta-daftar"
            onClick={onOpenRegister}
            className="w-full sm:w-auto px-8 py-4 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-extrabold text-base rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Daftar Sekarang
            <ArrowRight className="h-5 w-5" />
          </button>
          <button
            id="hero-cta-status"
            onClick={() => onNavigate("cek-status")}
            className="w-full sm:w-auto px-8 py-4 bg-white/75 hover:bg-white text-[#1E3A8A] border-2 border-[#0D9488] hover:border-[#1E3A8A] font-bold text-base rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            Cek Status Pendaftaran
          </button>
        </div>
      </div>
    </section>
  );
}
