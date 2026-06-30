import { useState } from "react";
import { Clock, MapPin, BookOpen, UserCheck, Heart } from "lucide-react";
import { motion } from "motion/react";
import { SilhouetteKerumunan } from "./BackgroundSilhouettes";

export default function Schedules() {
  const [activeTab, setActiveTab] = useState<"ilmiah" | "pesta_rakyat">("ilmiah");

  // Sesi Ilmiah Schedule Data (Novotel Bogor)
  const ilmiahSchedule = [
    {
      day: "Hari 1 - Sabtu, 7 November 2026",
      events: [
        {
          time: "07:30 - 08:30",
          title: "Registrasi Peserta, Re-registrasi & Coffee Morning",
          location: "Foyer Grand Ballroom Novotel Bogor",
          speaker: "Panitia Pelaksana",
          type: "administrative"
        },
        {
          time: "08:30 - 09:30",
          title: "Sesi Pleno Pembuka: Kebijakan Nasional Deteksi Dini Diabetes",
          location: "Grand Ballroom A",
          speaker: "Perwakilan Kemenkes RI & Dr. dr. K Heri Nugroho Hario Seno, Sp.PD-KEMD",
          type: "symposium"
        },
        {
          time: "09:30 - 10:00",
          title: "Upacara Pembukaan Resmi KONAS & KONKER Bersama",
          location: "Grand Ballroom A & B",
          speaker: "dr. Roy Panusunan Sibarani, Sp.PD-KEMD (Ketua Panitia)",
          type: "administrative"
        },
        {
          time: "10:00 - 12:00",
          title: "Simposium I: Pendekatan Komprehensif Terapi Insulin & Manajemen CGMS",
          location: "Grand Ballroom A",
          speaker: "Prof. Dr. dr. Sidartawan Soegondo, Sp.PD-KEMD",
          type: "symposium"
        },
        {
          time: "12:00 - 13:30",
          title: "ISHOMA (Istirahat, Sholat, Makan Siang & Networking)",
          location: "Restoran Novotel Bogor",
          speaker: "Seksi Konsumsi",
          type: "break"
        },
        {
          time: "13:30 - 15:30",
          title: "Workshop Paralel A: Tata Laksana Penanganan Kaki Diabetes & Pencegahan Amputasi",
          location: "Parijs Room / Meeting Room 3",
          speaker: "Dr. dr. Wismandari, Sp.PD-KEMD & Tim",
          type: "workshop"
        },
        {
          time: "13:30 - 15:30",
          title: "Workshop Paralel B: Komunikasi Terapeutik & Konseling Gizi Terpadu",
          location: "Bogor Room / Meeting Room 4",
          speaker: "dr. Monika, Sp.PD & Ahli Gizi PEDI",
          type: "workshop"
        },
        {
          time: "15:30 - 17:00",
          title: "Rapat Anggota Tahunan & Pleno Kerja Organisasi PERKENI / PEDI",
          location: "Grand Ballroom B",
          speaker: "Pengurus Pusat Organisasi",
          type: "meeting"
        }
      ]
    },
    {
      day: "Hari 2 - Minggu, 8 November 2026",
      events: [
        {
          time: "08:00 - 10:00",
          title: "Simposium II: Mengatasi Hambatan Psikososial pada Pendampingan Diabetesi",
          location: "Grand Ballroom A",
          speaker: "Pengurus PEDI & dr. William Djauhari",
          type: "symposium"
        },
        {
          time: "10:00 - 12:00",
          title: "Simposium III: Pencegahan Komplikasi Ginjal & Jantung Sejak Dini",
          location: "Grand Ballroom A",
          speaker: "dr. Dicky Levenus Tahapary, Sp.PD-KEMD, Ph.D",
          type: "symposium"
        },
        {
          time: "12:00 - 13:00",
          title: "Makan Siang & Penutupan Kongres Sesi Ilmiah",
          location: "Foyer Grand Ballroom",
          speaker: "Panitia Pelaksana",
          type: "administrative"
        }
      ]
    }
  ];

  // Pesta Rakyat Schedule Data (GOR Pakansari)
  const pestaSchedule = [
    {
      day: "Hari 2 - Minggu, 8 November 2026 (GOR Pakansari)",
      events: [
        {
          time: "05:30 - 06:00",
          title: "Kumpul Peserta & Distribusi Atribut/Konsumsi Pagi",
          location: "Area Parkir Barat GOR Pakansari",
          speaker: "Koordinator Lapangan / Seksi Peserta",
          type: "administrative"
        },
        {
          time: "06:00 - 06:45",
          title: "Senam Bugar Diabetes Nasional Massal",
          location: "Panggung Utama Lapangan Luar",
          speaker: "Instruktur Senam PERSADIA Bogor",
          type: "activity"
        },
        {
          time: "06:45 - 07:45",
          title: "Jalan Sehat Keluarga Menyehatkan Indonesia",
          location: "Rute Lingkar GOR Pakansari (1.5 KM)",
          speaker: "Seluruh Peserta & Panitia",
          type: "activity"
        },
        {
          time: "07:30 - 12:00",
          title: "Pembukaan Booth Skrining Gula Darah & Pemeriksaan Kesehatan Gratis",
          location: "Tenda Medis Utama GOR Pakansari",
          speaker: "Tim Dokter Residen, Perawat & Edukator Diabetes PEDI",
          type: "health_check"
        },
        {
          time: "08:00 - 09:30",
          title: "Talkshow Interaktif Awam: Deteksi Dini & Mitos vs Fakta Mengenai Diabetes",
          location: "Panggung Utama GOR Pakansari",
          speaker: "dr. Roy Panusunan Sibarani, Sp.PD-KEMD & Tokoh Masyarakat",
          type: "talkshow"
        },
        {
          time: "09:30 - 11:30",
          title: "Panggung Hiburan Rakyat, Undian Doorprise & Demo Memasak Makanan Sehat Diabetesi",
          location: "Panggung Utama GOR Pakansari",
          speaker: "PERSADIA Bogor & Depok",
          type: "entertainment"
        },
        {
          time: "11:30 - 12:00",
          title: "Pemberian Penghargaan Unit Persadia Berprestasi & Penutupan Acara",
          location: "Panggung Utama GOR Pakansari",
          speaker: "Pengurus PERSADIA Pusat",
          type: "administrative"
        }
      ]
    }
  ];

  const getBadgeStyle = (type: string) => {
    switch (type) {
      case "symposium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "workshop":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "activity":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "health_check":
        return "bg-rose-100 text-rose-800 border-rose-200 font-bold";
      case "talkshow":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "administrative":
        return "bg-slate-100 text-slate-800 border-slate-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getEventTypeName = (type: string) => {
    switch (type) {
      case "symposium": return "Simposium Medis";
      case "workshop": return "Workshop Praktis";
      case "activity": return "Aktivitas Fisik";
      case "health_check": return "Skrining Gula Darah Gratis";
      case "talkshow": return "Edukasi Awam / Talkshow";
      case "administrative": return "Agenda Umum";
      case "meeting": return "Pleno Organisasi";
      case "break": return "Ishoma";
      case "entertainment": return "Hiburan & Pembagian Hadiah";
      default: return "Sesi Acara";
    }
  };

  return (
    <section id="jadwal" className="py-20 bg-white relative overflow-hidden">
      {/* Background Activity Silhouette */}
      <div className="absolute top-[25%] right-[-10%] sm:right-[5%] opacity-[0.03] text-slate-500 rotate-6 pointer-events-none z-0">
        <SilhouetteKerumunan className="w-64 h-64 sm:w-96 sm:h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">Susunan Kegiatan</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-1 mb-4 font-sans">
            Agenda Resmi Kegiatan 2026
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mb-6">
            Pilih track di bawah ini untuk melihat jadwal lengkap sesi ilmiah dan pesta rakyat.
          </p>

          {/* Tab Buttons */}
          <div className="inline-flex p-1 bg-[#F8FAFC] rounded-full shadow-inner border border-slate-100">
            <button
              id="tab-btn-ilmiah"
              onClick={() => setActiveTab("ilmiah")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === "ilmiah"
                  ? "bg-[#1E3A8A] text-white shadow"
                  : "text-slate-600 hover:text-[#1E3A8A]"
              }`}
            >
              Sesi Ilmiah (Novotel Bogor)
            </button>
            <button
              id="tab-btn-rakyat"
              onClick={() => setActiveTab("pesta_rakyat")}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-all duration-300 cursor-pointer ${
                activeTab === "pesta_rakyat"
                  ? "bg-[#1E3A8A] text-white shadow"
                  : "text-slate-600 hover:text-[#1E3A8A]"
              }`}
            >
              Pesta Rakyat (GOR Pakansari)
            </button>
          </div>
        </motion.div>

        {/* Schedule Display */}
        <div className="max-w-4xl mx-auto">
          {activeTab === "ilmiah" ? (
            <div className="space-y-12">
              {ilmiahSchedule.map((dayGroup, groupIdx) => (
                <div key={groupIdx} className="bg-[#F8FAFC]/45 rounded-2xl p-6 sm:p-8 border border-slate-100">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#1E3A8A] mb-6 flex items-center gap-2 pb-2 border-b border-[#0D9488]/25">
                    <BookOpen className="h-5 w-5" />
                    {dayGroup.day}
                  </h3>
                  
                  <div className="space-y-6 relative border-l-2 border-[#0D9488]/35 ml-4 sm:ml-6 pl-4 sm:pl-8">
                    {dayGroup.events.map((event, eventIdx) => (
                      <div key={eventIdx} className="relative group">
                        {/* Timeline node */}
                        <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-[#1E3A8A] group-hover:scale-125 transition-transform"></div>
                        
                        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:border-[#0D9488]/40 transition group-hover:shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="flex items-center gap-1 text-xs font-bold text-[#1E3A8A] bg-[#1E3A8A]/5 px-2 py-1 rounded">
                              <Clock className="h-3.5 w-3.5" />
                              {event.time}
                            </span>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeStyle(event.type)}`}>
                              {getEventTypeName(event.type)}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight mb-2">
                            {event.title}
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1.5 border-t border-dashed border-slate-100">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-[#0D9488]" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1 font-medium">
                              <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Narasumber: <strong className="text-slate-700">{event.speaker}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-12">
              {pestaSchedule.map((dayGroup, groupIdx) => (
                <div key={groupIdx} className="bg-emerald-50/20 rounded-2xl p-6 sm:p-8 border border-emerald-100/50">
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#0D9488] mb-6 flex items-center gap-2 pb-2 border-b border-[#0D9488]/25">
                    <Heart className="h-5 w-5 text-rose-500 animate-pulse" />
                    {dayGroup.day}
                  </h3>
                  
                  <div className="space-y-6 relative border-l-2 border-[#0D9488]/35 ml-4 sm:ml-6 pl-4 sm:pl-8">
                    {dayGroup.events.map((event, eventIdx) => (
                      <div key={eventIdx} className="relative group">
                        {/* Timeline node */}
                        <div className="absolute -left-[25px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 group-hover:scale-125 transition-transform"></div>
                        
                        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-100 hover:border-[#0D9488]/40 transition group-hover:shadow-md">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                            <span className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-1 rounded">
                              <Clock className="h-3.5 w-3.5" />
                              {event.time}
                            </span>
                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getBadgeStyle(event.type)}`}>
                              {getEventTypeName(event.type)}
                            </span>
                          </div>

                          <h4 className="font-extrabold text-slate-800 text-sm sm:text-base leading-tight mb-2">
                            {event.title}
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 pt-1.5 border-t border-dashed border-slate-100">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5 text-emerald-500" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-1 font-medium">
                              <UserCheck className="h-3.5 w-3.5 text-emerald-600" />
                              <span>Pelaksana: <strong className="text-slate-700">{event.speaker}</strong></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
