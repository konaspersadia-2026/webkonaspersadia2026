import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, HeartPulse, ShieldAlert, ArrowRight, Activity, Award, TrendingUp, Sparkles, CheckSquare } from "lucide-react";
import { EVENT_INFO } from "../config";
import { motion } from "motion/react";
import { SilhouetteSenam, SilhouetteJalanSehat } from "./BackgroundSilhouettes";

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
      <div className="absolute top-20 right-[-10%] w-[40rem] h-[40rem] rounded-full bg-blue-100/30 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-10 left-[-10%] w-[35rem] h-[35rem] rounded-full bg-[#0D9488]/5 blur-3xl pointer-events-none z-0" />

      {/* Background Activity Silhouettes */}
      <div className="absolute top-[18%] left-[-8%] sm:left-[2%] opacity-[0.03] text-slate-500 rotate-12 pointer-events-none z-0">
        <SilhouetteSenam className="w-56 h-56 sm:w-80 sm:h-80" />
      </div>
      <div className="absolute bottom-[15%] right-[-8%] sm:right-[2%] opacity-[0.03] text-slate-500 -rotate-12 pointer-events-none z-0">
        <SilhouetteJalanSehat className="w-56 h-56 sm:w-80 sm:h-80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Badge World Diabetes Day & Hari Kesehatan Nasional */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-6"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-[#F59E0B]/15 text-[#1E3A8A] border border-[#F59E0B]/30 backdrop-blur-sm shadow-sm">
            <HeartPulse className="h-4 w-4 animate-pulse text-rose-500" />
            World Diabetes Day 2026
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 backdrop-blur-sm shadow-sm">
            <Activity className="h-4 w-4 text-emerald-600" />
            Hari Kesehatan Nasional ke-62
          </span>
        </motion.div>

        {/* Title & Host Organizations */}
        <div className="text-center max-w-4xl mx-auto mb-4">
          <motion.p 
            className="text-xs sm:text-sm font-extrabold tracking-widest text-[#1E3A8A] uppercase mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Kongres Nasional &amp; Konferensi Kerja Bersama
          </motion.p>
          <motion.h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-tight mb-4 font-sans"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            KONAS PERSADIA <span className="text-[#1E3A8A]">2026</span>
          </motion.h1>
          <motion.p 
            className="text-base sm:text-lg font-semibold text-slate-600 mb-6 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Mewadahi <span className="font-bold text-[#1E3A8A]">PERSADIA</span> (Persatuan Diabetes Indonesia),{" "}
            <span className="font-bold text-[#1E3A8A]">PEDI</span> (Educator Diabetes), dan{" "}
            <span className="font-bold text-[#1E3A8A]">PERKENI</span> (Endokrinologi)
          </motion.p>

          {/* Theme Banner Card */}
          <motion.div 
            className="bg-white/85 backdrop-blur-md rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto mb-10 shadow-xl border border-white/40 transform transition hover:scale-[1.01]"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#0D9488]">Tema Utama</span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-800 mt-1 mb-2">
              "Pesta Rakyat Persadia, Menyehatkan Indonesia"
            </h2>
            <div className="flex justify-center items-center gap-2 text-[#1E3A8A] font-medium text-xs sm:text-sm">
              <ShieldAlert className="h-4 w-4 text-[#0D9488]" />
              <span>Topik Utama: <strong>Diabetes, Deteksi Dini Lebih Awal</strong></span>
            </div>

            {/* Campaign Taglines added directly in Hero */}
            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <p className="text-xs sm:text-sm font-extrabold text-[#1E3A8A]">
                "Deteksi Dini, Hidup Lebih Baik: Bersama Melawan Diabetes dari Akar"
              </p>
              <p className="text-[10px] sm:text-xs text-slate-500 italic mt-0.5">
                "Early Detection for Better Living: Standing Together Against Diabetes at Its Root"
              </p>
            </div>
          </motion.div>
        </div>

        {/* Date and Locations Info Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          {/* Tanggal */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/30 flex items-start gap-4 shadow-sm hover:bg-white/90 transition duration-300">
            <div className="p-3 bg-[#1E3A8A] text-white rounded-lg">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Waktu &amp; Tanggal</h4>
              <p className="text-slate-600 text-xs mt-1">Sabtu - Minggu</p>
              <p className="text-[#1E3A8A] font-bold text-xs sm:text-sm">7 - 8 November 2026</p>
            </div>
          </div>

          {/* Venue Ilmiah */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/30 flex items-start gap-4 shadow-sm hover:bg-white/90 transition duration-300">
            <div className="p-3 bg-[#0D9488] text-white rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Sesi Ilmiah (Nakes)</h4>
              <p className="text-slate-600 text-xs mt-1">Novotel Bogor</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#1E3A8A]/10 text-[#1E3A8A] font-semibold text-[9px] rounded">
                Simposium, Workshop &amp; Pameran
              </span>
            </div>
          </div>

          {/* Venue Rakyat */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-white/30 flex items-start gap-4 shadow-sm hover:bg-white/90 transition duration-300">
            <div className="p-3 bg-[#F59E0B] text-[#1E3A8A] rounded-lg font-bold">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-xs">Pesta Rakyat (Umum)</h4>
              <p className="text-slate-600 text-xs mt-1">GOR Pakansari, Cibinong</p>
              <span className="inline-block mt-1.5 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-semibold text-[9px] rounded">
                Senam, Jalan Sehat &amp; Skrining Gratis
              </span>
            </div>
          </div>
        </motion.div>

        {/* Storytelling & Visual Highlights (Section Utama) */}
        <motion.div
          className="max-w-5xl mx-auto mb-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-bold text-[#0D9488] uppercase tracking-widest bg-[#0D9488]/10 px-3 py-1 rounded-full">Storytelling &amp; Highlight Utama</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">Mengapa Anda Harus Terlibat?</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Momentum Bento Card */}
            <div className="p-5 bg-gradient-to-br from-[#1E3A8A]/5 to-transparent rounded-2xl border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="p-2 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-lg w-fit mb-3">
                  <Sparkles className="h-5 w-5" />
                </div>
                <strong className="text-xs text-slate-800 block font-bold mb-1">Momentum Kesehatan Nasional</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Acara ini dihelat tepat di antara dua tonggak penting: <strong>Hari Kesehatan Nasional (12 November)</strong> dan <strong>World Diabetes Day (14 November)</strong>, menjadi panggung kolaborasi terbesar tahun ini.
                </p>
              </div>
            </div>

            {/* Rekor Bento Card */}
            <div className="p-5 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-2xl border border-emerald-100 flex flex-col justify-between">
              <div>
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg w-fit mb-3">
                  <Award className="h-5 w-5" />
                </div>
                <strong className="text-xs text-emerald-900 block font-bold mb-1">Pemecahan Rekor Skrining</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pada Hari ke-2 di GOR Pakansari, mari jadi saksi dan bagian dari <strong>pemeriksaan gula darah massal gratis untuk 10.000 orang dalam satu hari</strong>.
                </p>
              </div>
            </div>

            {/* Statistik Bento Card */}
            <div className="p-5 bg-gradient-to-br from-rose-500/5 to-transparent rounded-2xl border border-rose-100 flex flex-col justify-between">
              <div>
                <div className="p-2 bg-rose-50 text-rose-600 rounded-lg w-fit mb-3">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <strong className="text-xs text-rose-950 block font-bold mb-1">Urgensi Diabetes Nasional</strong>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Indonesia berada di <strong>peringkat ke-5 dunia</strong> untuk jumlah penyandang diabetes terbanyak (&gt;19.5 juta jiwa), dan mayoritas tidak menyadari kondisinya. Deteksi dini adalah solusi.
                </p>
              </div>
            </div>
          </div>

          {/* Agenda Highlight Summary (Sabtu vs Minggu) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-slate-100">
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#1E3A8A] block">Hari 1 — Sabtu, 7 Nov 2026 (Novotel Bogor)</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span>Kuliah Umum &amp; Simposium Medis Komprehensif untuk dokter umum &amp; spesialis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span>Sesi edukasi interaktif khusus penyandang diabetes (diabetesi) dan keluarga pendamping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span><strong>Pelantikan Pengurus PERSADIA Periode 2026–2029</strong> resmi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-[#0D9488] shrink-0 mt-0.5" />
                  <span>Deklarasi Komitmen Nasional Deteksi Dini Diabetes.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-emerald-700 block">Hari 2 — Minggu, 8 Nov 2026 (GOR Pakansari)</span>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Pemeriksaan Gula Darah Massal Gratis (Target Rekor 10.000 peserta).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Senam Diabetes Massal dipandu instruktur berpengalaman.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Konsultasi Gizi &amp; Kesehatan Gratis bersama dokter spesialis.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckSquare className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Donor Darah Kemanusiaan dan Pameran Inovasi Kesehatan Diabetes.</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div 
          className="max-w-xl mx-auto mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
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
                <motion.div 
                  key={idx} 
                  className="bg-[#1E3A8A] text-white p-3 sm:p-4 rounded-xl shadow-md border border-[#F59E0B]/20"
                  whileHover={{ scale: 1.05, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </span>
                  <span className="block text-[10px] sm:text-xs font-medium text-[#F59E0B] uppercase mt-0.5">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Primary and Secondary CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}
