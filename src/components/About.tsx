import { HeartPulse, ShieldAlert, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { EVENT_INFO } from "../config";

export default function About() {
  return (
    <section
      id="tentang"
      className="py-20 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">Latar Belakang Acara</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-1 mb-4 font-sans">
            Tentang Kongres & Konferensi Gabungan 2026
          </h2>
          <div className="h-1.5 w-24 bg-[#0D9488] mx-auto rounded-full"></div>
        </div>

        {/* Introduction Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans">
              Menyambut peringatan <strong>World Diabetes Day (Hari Diabetes Sedunia)</strong> serta <strong>Hari Kesehatan Nasional 2026</strong>, tiga pilar penanganan diabetes terkemuka di Indonesia menyatukan langkah untuk menyelenggarakan pertemuan ilmiah sekaligus bakti masyarakat berskala nasional.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Kolaborasi historis ini menggabungkan program tahunan <strong>KONAS PERSADIA</strong> (Persatuan Diabetes Indonesia), <strong>KONKER PEDI</strong> (Perkumpulan Edukator Diabetes Indonesia), dan <strong>KONKER PERKENI</strong> (Perkumpulan Endokrinologi Indonesia).
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Dengan mengusung tema <strong className="text-[#1E3A8A]">"Pesta Rakyat Persadia, Menyehatkan Indonesia"</strong> and fokus utama pada <strong className="text-[#1E3A8A]">"Diabetes, Deteksi Dini Lebih Awal"</strong>, acara ini dirancang inklusif. Kami mempertemukan para dokter spesialis, edukator medis, perawat, ahli gizi, penyandang diabetes (diabetesi) beserta keluarga, dan masyarakat umum demi mewujudkan Indonesia yang lebih sehat dan tanggap diabetes.
            </p>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-tr from-[#1E3A8A] to-[#0D9488] text-white p-8 rounded-3xl shadow-xl space-y-6 relative">
            <div className="absolute top-4 right-4 text-white/10">
              <Sparkles className="h-24 w-24" />
            </div>
            
            <h3 className="text-xl font-bold border-b border-white/20 pb-3 flex items-center gap-2">
              <HeartPulse className="h-6 w-6 text-[#F59E0B] animate-pulse" />
              Tujuan Utama Kegiatan
            </h3>
            
            <ul className="space-y-4 text-sm">
              {[
                "Meningkatkan kapasitas dokter dan tenaga kesehatan dalam tata laksana klinis diabetes termutakhir.",
                "Memperkuat peran edukator diabetes (PEDI) dalam mendampingi pasien secara holistik.",
                "Meningkatkan kesadaran masyarakat umum melalui edukasi pencegahan dini dan gaya hidup sehat.",
                "Menyelenggarakan deteksi dini massal melalui pemeriksaan gula darah gratis bagi ribuan peserta.",
                "Membangun solidaritas dan wadah berbagi bagi penyandang diabetes di bawah naungan PERSADIA."
              ].map((text, idx) => (
                <li key={idx} className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#F59E0B] shrink-0" />
                  <span className="text-white/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Track Separation Highlight Cards */}
        <h3 className="text-xl font-bold text-center text-slate-800 mb-8">Dua Jalur (Track) Utama Acara</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sesi Ilmiah */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md flex flex-col justify-between hover:shadow-lg transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center font-bold text-xl mb-6">
                1
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Track Ilmiah (Indoor)</h4>
              <p className="text-xs font-bold text-[#1E3A8A] tracking-wider uppercase mb-3 flex items-center gap-1">
                📍 Novotel Bogor • 14 - 15 November 2026
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Diperuntukkan khusus bagi kalangan medis profesional: Dokter Spesialis Penyakit Dalam/Endokrin (anggota PERKENI), Dokter Umum, Perawat, Ahli Gizi, Educator Diabetes (anggota PEDI), Residen/PPDS, dan Mahasiswa Kedokteran. Berisi seminar sains, simposium klinis, diskusi panel, dan workshop studi kasus diabetes terbaru.
              </p>
            </div>
            <div className="bg-[#1E3A8A]/5 rounded-xl p-4 border border-[#1E3A8A]/10">
              <span className="text-xs font-semibold text-[#1E3A8A] block mb-1">Fokus Pembahasan:</span>
              <p className="text-xs text-slate-600 leading-tight">
                Pedoman klinis terbaru, inovasi terapi insulin, manajemen kaki diabetes, teknologi CGMS, dan komunikasi terapeutik bagi pendamping diabetesi.
              </p>
            </div>
          </div>

          {/* Sesi Pesta Rakyat */}
          <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md flex flex-col justify-between hover:shadow-lg transition">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center font-bold text-xl mb-6">
                2
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Track Pesta Rakyat (Outdoor/Masyarakat)</h4>
              <p className="text-xs font-bold text-[#0D9488] tracking-wider uppercase mb-3 flex items-center gap-1">
                📍 Stadion Pekansari Cibinong • 15 November 2026
              </p>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Wadah kebersamaan bagi anggota PERSADIA (penyandang diabetes & keluarganya) dan masyarakat umum. Menghadirkan beragam kegiatan luar ruangan yang edukatif dan menyehatkan jasmani untuk mengampanyekan pentingnya deteksi dini gula darah dalam mengontrol laju diabetes nasional.
              </p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <span className="text-xs font-semibold text-emerald-800 block mb-1">Rangkaian Kegiatan:</span>
              <p className="text-xs text-slate-600 leading-tight">
                Senam bugar bersama diabetesi, jalan sehat keluarga, konsultasi gizi gratis, pembagian flyer edukasi kesehatan, panggung hiburan rakyat, dan pemeriksaan gula darah gratis massal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
