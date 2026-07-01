import { motion } from "motion/react";
import { Award, Briefcase, FileText, Mail, Phone, Calendar, MapPin, Building, ShieldCheck, HeartPulse, ChevronDown } from "lucide-react";
import { KONTAK_PANITIA, REKENING_PEMBAYARAN } from "../config";
import { useState } from "react";
import { SilhouetteKerumunan, SilhouetteMedis } from "./BackgroundSilhouettes";

interface KemitraanPageProps {
  onBackToHome: () => void;
}

export default function KemitraanPage({ onBackToHome }: KemitraanPageProps) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const sponsorshipPackages = [
    {
      name: "Diamond",
      price: "Rp 500.000.000",
      limit: "Terbatas 3 sponsor",
      color: "border-[#1E3A8A] bg-gradient-to-b from-[#1E3A8A]/5 to-transparent",
      badge: "bg-[#1E3A8A] text-white",
      features: [
        "Slot presentasi di sesi Symposium & Workshop, Meet the Expert, dan Dinner Symposium",
        "1 sesi symposium makan siang dengan pembicara pilihan sponsor",
        "Booth premium 1 hari di lokasi",
        "Tenda sarnavile 5x5m di Pesta Rakyat GOR Pakansari",
        "Logo tampil di slide, banner, umbul-umbul, goodie bag, dan kaos Pesta Rakyat",
        "Brosur promosi disisipkan ke tas peserta",
        "Gratis pendaftaran untuk 3 peserta symposium + 3 peserta workshop",
        "5 voucher konsumsi panitia",
        "100 undangan gratis dinner symposium"
      ]
    },
    {
      name: "Saphire",
      price: "Rp 350.000.000",
      limit: "Populer",
      color: "border-[#0D9488] bg-gradient-to-b from-[#0D9488]/5 to-transparent",
      badge: "bg-[#0D9488] text-white",
      features: [
        "Slot presentasi di Symposium & Workshop dan Meet the Expert",
        "Booth 1 hari di lokasi symposium & workshop",
        "Tenda sarnavile 5x5m di Pesta Rakyat GOR Pakansari",
        "Logo di slide, banner, goodie bag, dan kaos Pesta Rakyat",
        "Brosur disisipkan ke tas peserta",
        "Gratis pendaftaran untuk 2 peserta symposium + 2 peserta workshop",
        "3 voucher konsumsi panitia",
        "50 undangan gratis dinner symposium"
      ]
    },
    {
      name: "Ruby",
      price: "Rp 125.000.000",
      limit: "Strategis",
      color: "border-rose-500 bg-gradient-to-b from-rose-500/5 to-transparent",
      badge: "bg-rose-500 text-white",
      features: [
        "Slot presentasi di Symposium & Workshop",
        "Booth 1 hari di lokasi",
        "Tenda sarnavile 3x3m di Pesta Rakyat GOR Pakansari",
        "Logo di slide, banner, goodie bag, dan kaos Pesta Rakyat",
        "Brosur disisipkan ke tas peserta",
        "Gratis pendaftaran untuk 1 peserta symposium + 1 peserta workshop",
        "2 voucher konsumsi",
        "30 undangan gratis dinner symposium"
      ]
    },
    {
      name: "Emerald",
      price: "Rp 50.000.000",
      limit: "Efisien",
      color: "border-emerald-500 bg-gradient-to-b from-emerald-500/5 to-transparent",
      badge: "bg-emerald-500 text-white",
      features: [
        "Slot presentasi di sesi Workshop",
        "Booth 1 hari di lokasi",
        "Tenda sarnavile 3x3m di Pesta Rakyat GOR Pakansari",
        "Logo di slide, banner, goodie bag, dan kaos Pesta Rakyat",
        "Brosur disisipkan ke tas peserta",
        "Gratis pendaftaran untuk 2 peserta workshop",
        "2 voucher konsumsi",
        "20 undangan gratis dinner symposium"
      ]
    },
    {
      name: "Topaz",
      price: "Rp 25.000.000",
      limit: "Standard",
      color: "border-amber-500 bg-gradient-to-b from-amber-500/5 to-transparent",
      badge: "bg-amber-500 text-white",
      features: [
        "Booth 1 hari di lokasi symposium & workshop",
        "1 voucher konsumsi",
        "5 undangan gratis dinner symposium"
      ]
    },
    {
      name: "UMKM",
      price: "Rp 3.500.000",
      limit: "Lokalan & Kuliner",
      color: "border-slate-300 bg-gradient-to-b from-slate-100 to-transparent",
      badge: "bg-slate-600 text-white",
      features: [
        "Area/space only ukuran 3x3 meter (tidak termasuk listrik)",
        "Lokasi strategis di simposium/workshop dan Pesta Rakyat GOR Pakansari"
      ]
    }
  ];

  const rules = [
    {
      q: "Jadwal Pembayaran Sponsorship",
      a: `Pembayaran sponsorship dilakukan paling lambat tanggal 23 Oktober 2026 (dua minggu sebelum acara) via transfer ke Rekening Pembayaran Resmi Kemitraan:
Bank: ${REKENING_PEMBAYARAN.bank}
No. Rekening: ${REKENING_PEMBAYARAN.nomorRekening}
Atas Nama: ${REKENING_PEMBAYARAN.atasNama}`
    },
    {
      q: "Ketentuan Pembatalan oleh Sponsor",
      a: "Pembatalan setelah tanggal 23 Oktober 2026 dikenakan denda biaya pembatalan sebesar 50% dari total nilai paket sponsorship yang telah disepakati."
    },
    {
      q: "Ketentuan Pembatalan Mendekati Acara",
      a: "Pembatalan yang diajukan dalam jangka waktu 1 minggu sebelum acara diselenggarakan akan dikenakan denda sebesar 100% (dana yang sudah ditransfer dianggap hangus)."
    },
    {
      q: "Kebijakan Force Majeure",
      a: "Pembatalan atau penghentian kontrak kerja sama tidak diperkenankan setelah pembayaran dilakukan, kecuali terjadi keadaan darurat (force majeure) seperti bencana alam, kebijakan darurat pemerintah, atau kondisi luar biasa lain yang menyebabkan acara tidak dapat diselenggarakan sama sekali."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-28 pb-20 relative overflow-hidden">
      {/* Background Activity Silhouettes */}
      <div className="absolute top-[15%] left-[-5%] sm:left-[2%] opacity-[0.03] text-slate-500 rotate-12 pointer-events-none z-0">
        <SilhouetteMedis className="w-56 h-56 sm:w-80 sm:h-80" />
      </div>
      <div className="absolute bottom-[20%] right-[-5%] sm:right-[2%] opacity-[0.03] text-slate-500 -rotate-12 pointer-events-none z-0">
        <SilhouetteKerumunan className="w-56 h-56 sm:w-80 sm:h-80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back navigation */}
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 mb-8 text-xs font-bold text-[#1E3A8A] hover:text-[#0D9488] transition cursor-pointer"
        >
          &larr; Kembali ke Beranda Utama
        </button>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase flex items-center justify-center gap-1.5 mb-2">
            <Briefcase className="h-4 w-4 text-[#F59E0B]" />
            Kemitraan Strategis 2026
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-800 tracking-tight font-sans">
            Kemitraan &amp; Sponsorship
          </h1>
          <div className="h-1.5 w-24 bg-[#0D9488] mx-auto rounded-full mt-4 mb-6"></div>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            KONAS PERSADIA 2026 membuka kesempatan kemitraan dan sponsorship yang berharga bagi perusahaan farmasi, produsen alat kesehatan, serta mitra industri lainnya untuk turut hadir dan berkontribusi langsung pada momen bersejarah dengan estimasi 10.000+ peserta gabungan dari kalangan medis profesional dan masyarakat luas.
          </p>
        </div>

        {/* Packages Cards Grid */}
        <div className="mb-20">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <Award className="h-6 w-6 text-[#F59E0B]" />
              Pilihan Paket Sponsorship
            </h2>
            <p className="text-xs text-slate-500 mt-1">Urusan sponsorship dikoordinasikan langsung bersama Seksi Acara &amp; Kemitraan Panitia</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorshipPackages.map((pkg, idx) => (
              <motion.div
                key={idx}
                className={`bg-white rounded-3xl border p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${pkg.color}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800">{pkg.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${pkg.badge}`}>
                      {pkg.limit}
                    </span>
                  </div>
                  <div className="mb-6">
                    <span className="text-2xl sm:text-3xl font-extrabold text-[#1E3A8A] block">{pkg.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, fIdx) => (
                      <li key={fIdx} className="text-xs text-slate-600 flex items-start gap-2 leading-relaxed">
                        <span className="text-[#0D9488] font-bold mt-0.5">&bull;</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footnote */}
          <p className="text-[11px] italic text-slate-500 text-center mt-6">
            * Sponsor bertanggung jawab menanggung biaya akomodasi, transportasi, serta honorarium bagi pembicara dan moderator yang terlibat dalam sesi yang dipilih.
          </p>
        </div>

        {/* Section Pameran (Bento style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
          <motion.div
            className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 shadow-md flex flex-col justify-between"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <Building className="h-6 w-6 text-[#0D9488]" />
                Section Pameran &amp; Exhibition Booth
              </h2>
              <div className="h-1 w-16 bg-[#0D9488] rounded-full mb-6"></div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#0D9488]/10 text-[#0D9488] rounded-md mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-slate-800 block">Lokasi Pameran Utama:</strong>
                    <span className="text-xs text-slate-600">Novotel Bogor Golf Resort &amp; Convention Center, Golf Estate Bogor Raya, Jawa Barat</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#1E3A8A]/10 text-[#1E3A8A] rounded-md mt-0.5">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-slate-800 block">Waktu Pelaksanaan Pameran:</strong>
                    <span className="text-xs text-slate-600">7 November 2026, pukul 08:00–21:00 WIB</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1.5 bg-[#F59E0B]/10 text-[#F59E0B] rounded-md mt-0.5">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <strong className="text-xs text-slate-800 block">Spesifikasi Booth Standard:</strong>
                    <span className="text-xs text-slate-600">Ukuran 3x3 meter, tinggi maksimum 2.5 meter, konstruksi partisi sistem R8</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 leading-relaxed">
              Lokasi booth dialokasikan berdasarkan prioritas paket sponsor yang dipilih. Area pameran adalah zona bebas rokok (termasuk rokok elektrik/vape).
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-5 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] text-white rounded-3xl p-8 shadow-md flex flex-col justify-between"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">Upaya Pemecahan Rekor</span>
              <h3 className="text-2xl font-black mt-4 mb-3">Pemeriksaan Gula Darah Massal 10.000 Orang</h3>
              <p className="text-xs text-white/95 leading-relaxed mb-4">
                Sebagai bagian penting dari storytelling di Pesta Rakyat GOR Pakansari, kami menargetkan skrining kesehatan dan pemeriksaan gula darah massal gratis untuk total 10.000 peserta dalam satu hari.
              </p>
              <div className="space-y-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#F59E0B]" />
                  <span>Kesempatan branding terbesar bagi industri kesehatan.</span>
                </div>
                <div className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4 text-[#F59E0B]" />
                  <span>Liputan media nasional dan dokumentasi rekor.</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-white/70 italic mt-6">
              World Diabetes Day &amp; Hari Kesehatan Nasional 2026.
            </div>
          </motion.div>
        </div>

        {/* Accordion / Collapsible Syarat Ketentuan */}
        <div className="mb-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center justify-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[#1E3A8A]" />
              Syarat &amp; Ketentuan Sponsorship
            </h2>
            <p className="text-xs text-slate-500 mt-1">Harap pelajari regulasi kerja sama sebelum melakukan pendaftaran kemitraan</p>
          </div>

          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div key={index} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 flex justify-between items-center hover:bg-slate-50/50 transition cursor-pointer"
                >
                  <strong className="text-xs sm:text-sm text-slate-800 font-bold">{rule.q}</strong>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-300 ${
                      openAccordion === index ? "transform rotate-185" : ""
                    }`}
                  />
                </button>
                {openAccordion === index && (
                  <div className="p-5 bg-slate-50/50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {rule.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Hubungi Panitia */}
        <motion.div
          className="bg-[#1E3A8A] text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-4">Tertarik Menjadi Mitra / Sponsor?</h2>
            <p className="text-xs sm:text-sm text-white/90 mb-8 leading-relaxed">
              Dapatkan proposal penawaran kemitraan lengkap beserta layout penempatan booth pameran dengan menghubungi panitia humas &amp; kemitraan kami.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a
                href={`mailto:${KONTAK_PANITIA.email}?subject=Kemitraan%20Sponsorship%20Konas%20Persadia%202026`}
                className="w-full sm:w-auto px-6 py-3 bg-[#F59E0B] text-[#1E3A8A] hover:bg-white font-extrabold text-xs rounded-full shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="h-4 w-4" />
                Hubungi via Email ({KONTAK_PANITIA.email})
              </a>
              <a
                href={`https://wa.me/${KONTAK_PANITIA.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs rounded-full shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Phone className="h-4 w-4" />
                Hubungi via WhatsApp ({KONTAK_PANITIA.whatsapp})
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
