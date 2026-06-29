import { KATEGORI_PESERTA, EVENT_INFO } from "../config";
import { Info, HelpCircle, FileText, CheckCircle2 } from "lucide-react";

interface RegistrationFeesProps {
  onOpenRegister: () => void;
}

export default function RegistrationFees({ onOpenRegister }: RegistrationFeesProps) {
  const formatRupiah = (num: number) => {
    if (num === 0) return "Gratis";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const getAksesLabel = (akses: "ilmiah" | "pesta_rakyat") => {
    if (akses === "ilmiah") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#1E3A8A]/10 text-[#1E3A8A] border border-[#1E3A8A]/25">
          Sesi Ilmiah (Novotel)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
        Pesta Rakyat (Pekansari)
      </span>
    );
  };

  const getSyaratText = (id: string) => {
    switch (id) {
      case "perkeni":
        return "Nomor Anggota PERKENI aktif";
      case "dokter_spesialis_lain":
        return "Nomor Surat Tanda Registrasi (STR) aktif";
      case "nakes_pedi":
        return "STR aktif atau No. Keanggotaan PEDI";
      case "mahasiswa":
        return "Kartu Tanda Mahasiswa (KTM) atau Surat Keterangan Residen";
      case "persadia":
        return "Kartu Anggota PERSADIA unit/cabang setempat";
      case "umum":
        return "KTP, Slot pemeriksaan kesehatan terbatas";
      default:
        return "Dokumen pendukung relevan";
    }
  };

  // Check if early bird is currently active
  const isEarlyBirdActive = () => {
    const deadline = new Date(`${EVENT_INFO.batasEarlyBird}T23:59:59+07:00`).getTime();
    const now = new Date().getTime();
    return now <= deadline;
  };

  const formatDateString = (dateStr: string) => {
    const options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" };
    return new Date(dateStr).toLocaleDateString("id-ID", options);
  };

  return (
    <section id="biaya" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">Kategori Peserta</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-1 mb-4 font-sans">
            Biaya & Ketentuan Pendaftaran
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold bg-[#F59E0B]/20 text-[#1E3A8A] border border-[#F59E0B]/30">
            <Info className="h-4 w-4 text-[#0D9488]" />
            Batas Biaya Early Bird: <strong className="text-slate-800">{formatDateString(EVENT_INFO.batasEarlyBird)}</strong>
          </div>
        </div>

        {/* Info Banner on Early Bird Status */}
        <div className="max-w-4xl mx-auto mb-10">
          {isEarlyBirdActive() ? (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm sm:text-base">Masa Registrasi Early Bird Aktif!</h4>
                <p className="text-xs sm:text-sm text-emerald-700/90 mt-0.5">
                  Daftarkan diri Anda sekarang sebelum tanggal <strong>{formatDateString(EVENT_INFO.batasEarlyBird)}</strong> untuk mendapatkan potongan harga eksklusif di track ilmiah.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
              <Info className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm sm:text-base">Registrasi Reguler Berlaku</h4>
                <p className="text-xs sm:text-sm text-amber-700/90 mt-0.5">
                  Periode Early Bird telah berakhir pada <strong>{formatDateString(EVENT_INFO.batasEarlyBird)}</strong>. Registrasi saat ini menggunakan biaya tarif reguler standar.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Fees Grid/Table for Mobile & Desktop */}
        <div className="max-w-5xl mx-auto overflow-hidden bg-white border border-slate-100 rounded-3xl shadow-xl mb-12">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1E3A8A] text-white border-b border-[#1E3A8A]">
                  <th className="p-4 text-xs font-bold uppercase tracking-wider pl-6">Kategori Peserta</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider">Akses Tiket</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-center">Early Bird</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider text-center">Tarif Reguler</th>
                  <th className="p-4 text-xs font-bold uppercase tracking-wider pr-6">Syarat Dokumen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {KATEGORI_PESERTA.map((kategori) => (
                  <tr
                    key={kategori.id}
                    className="hover:bg-[#F8FAFC]/30 transition duration-150"
                  >
                    <td className="p-4 font-extrabold text-slate-800 text-sm pl-6 max-w-xs">
                      {kategori.label}
                    </td>
                    <td className="p-4">{getAksesLabel(kategori.akses)}</td>
                    <td className="p-4 text-center">
                      <span className={`text-sm font-bold ${isEarlyBirdActive() && kategori.hargaEarlyBird > 0 ? "text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md" : "text-slate-500"}`}>
                        {formatRupiah(kategori.hargaEarlyBird)}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`text-sm font-bold ${!isEarlyBirdActive() ? "text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md" : "text-slate-800"}`}>
                        {formatRupiah(kategori.hargaReguler)}
                      </span>
                    </td>
                    <td className="p-4 text-xs text-slate-500 font-medium pr-6 flex items-center gap-1.5 pt-6">
                      <FileText className="h-4 w-4 text-[#0D9488] shrink-0" />
                      <span>{getSyaratText(kategori.id)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card-List View */}
          <div className="md:hidden divide-y divide-slate-100">
            {KATEGORI_PESERTA.map((kategori) => (
              <div key={kategori.id} className="p-5 hover:bg-[#F8FAFC]/10">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h4 className="font-extrabold text-slate-800 text-sm leading-snug">
                    {kategori.label}
                  </h4>
                  {getAksesLabel(kategori.akses)}
                </div>

                <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl mb-3 text-xs">
                  <div>
                    <span className="text-slate-400 font-medium block">Early Bird:</span>
                    <strong className={`text-sm ${isEarlyBirdActive() && kategori.hargaEarlyBird > 0 ? "text-emerald-600 font-extrabold" : "text-slate-700"}`}>
                      {formatRupiah(kategori.hargaEarlyBird)}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium block">Tarif Reguler:</span>
                    <strong className={`text-sm ${!isEarlyBirdActive() ? "text-amber-700 font-extrabold" : "text-slate-700"}`}>
                      {formatRupiah(kategori.hargaReguler)}
                    </strong>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <FileText className="h-4 w-4 text-[#0D9488] shrink-0 mt-0.5" />
                  <span>Syarat: <strong>{getSyaratText(kategori.id)}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Large Central Call to Action */}
        <div className="bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] rounded-3xl p-8 sm:p-12 text-center text-white shadow-xl max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold mb-3">Siap Menjadi Bagian dari Konferensi Ini?</h3>
          <p className="text-xs sm:text-sm text-[#F8FAFC] max-w-xl mx-auto mb-6">
            Klik tombol di bawah ini untuk mengisi formulir pendaftaran. Proses pendaftaran hanya memakan waktu 3 menit dengan konfirmasi bukti transfer yang mudah.
          </p>
          <button
            id="fees-btn-daftar"
            onClick={onOpenRegister}
            className="px-8 py-4 bg-[#F59E0B] hover:bg-[#F8FAFC] text-[#1E3A8A] hover:text-[#1E3A8A] font-extrabold text-base rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            Daftar Sekarang Secara Instan
          </button>
        </div>
      </div>
    </section>
  );
}
