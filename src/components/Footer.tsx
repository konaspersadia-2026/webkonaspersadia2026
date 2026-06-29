import { Mail, Phone, Heart, Activity } from "lucide-react";
import { KONTAK_PANITIA, EVENT_INFO } from "../config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1E3A8A] text-white">
      {/* Contact Hub Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          <div>
            <h4 className="text-base font-black uppercase tracking-wider text-[#F59E0B] mb-2">Hubungi Panitia</h4>
            <p className="text-xs text-white/80 max-w-xs">
              Hubungi sekretariat pendaftaran kami jika Anda memerlukan bantuan koordinasi rombongan atau verifikasi manual cepat.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 text-xs font-bold">
            <a
              href={`mailto:${KONTAK_PANITIA.email}`}
              className="flex items-center justify-center md:justify-start gap-2 px-4 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition"
            >
              <Mail className="h-4 w-4 text-[#F59E0B]" />
              <span>{KONTAK_PANITIA.email}</span>
            </a>
            <a
              href={`https://wa.me/${KONTAK_PANITIA.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center md:justify-start gap-2 px-4 py-3 bg-emerald-600 rounded-xl hover:bg-emerald-700 transition"
            >
              <Phone className="h-4 w-4" />
              <span>{KONTAK_PANITIA.whatsapp} (WhatsApp)</span>
            </a>
          </div>

          <div className="text-center md:text-right">
            <span className="text-[10px] text-white/50 block font-semibold uppercase tracking-widest">Sekretariat Bersama</span>
            <span className="text-xs font-extrabold text-white">Gedung PERSADIA / PERKENI Raya</span>
            <p className="text-[10px] text-white/70 mt-0.5">Jakarta Selatan, DKI Jakarta</p>
          </div>
        </div>
      </div>

      {/* Main Footer Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-center lg:text-left">
          
          {/* Host Organizations */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <Activity className="h-5 w-5 text-[#F59E0B]" />
              <strong className="text-base font-black tracking-tight uppercase">KONAS & KONKER GABUNGAN 2026</strong>
            </div>
            <p className="text-xs text-white/80 leading-relaxed max-w-sm mx-auto lg:mx-0">
              Diselenggarakan bersama oleh tiga perkumpulan besar diabetes terpercaya di Indonesia: <strong>PERSADIA</strong> (Persatuan Diabetes Indonesia), <strong>PEDI</strong> (Perkumpulan Edukator Diabetes Indonesia), dan <strong>PERKENI</strong> (Perkumpulan Endokrinologi Indonesia).
            </p>
          </div>

          {/* Quick Info links */}
          <div className="lg:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Agenda Utama</h5>
            <ul className="text-xs space-y-1.5 text-white/80">
              <li>• Sesi Seminar & Workshop Ilmiah (Novotel Bogor)</li>
              <li>• Sesi Pesta Rakyat Diabetes (Stadion Pekansari)</li>
              <li>• Pemeriksaan Gula Darah & Skrining Gratis massal</li>
              <li>• Senam Bugar Diabetesi & Hiburan</li>
            </ul>
          </div>

          {/* Campaign support */}
          <div className="lg:col-span-4 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#F59E0B]">Kampanye Kesehatan</h5>
            <p className="text-xs text-white/80 leading-relaxed max-w-xs mx-auto lg:mx-0">
              Mendukung penuh kampanye global pencegahan diabetes dalam momentum <strong>World Diabetes Day 2026</strong> dan memperingati <strong>Hari Kesehatan Nasional ke-62</strong>.
            </p>
            <span className="inline-block px-3 py-1 bg-white/10 text-[#F59E0B] rounded-full text-[10px] font-bold">
              #DiabetesDeteksiDiniLebihAwal
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-[10px] text-white/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Panitia Pelaksana Bersama KONAS PERSADIA, PEDI, PERKENI. All Rights Reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for a healthier Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
