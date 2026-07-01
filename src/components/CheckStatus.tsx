import { useState, FormEvent } from "react";
import { Search, Loader2, CheckCircle2, Clock, AlertTriangle, User, Mail, CreditCard, Calendar } from "lucide-react";
import { RegistrationData } from "../types";
import { KATEGORI_PESERTA } from "../config";

export default function CheckStatus() {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [regData, setRegData] = useState<RegistrationData | null>(null);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      setError("Masukkan nomor registrasi atau email Anda.");
      return;
    }

    setIsLoading(true);
    setError("");
    setRegData(null);

    try {
      const webAppUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_CONFIG.webAppUrl;
      let response;
      let result;

      if (!webAppUrl && import.meta.env.PROD) {
        throw new Error("Google Apps Script Web App URL belum diatur.");
      }

      if (webAppUrl) {
        response = await fetch(`${webAppUrl}?action=status&q=${encodeURIComponent(query.trim())}`, {
          redirect: "follow"
        });
        result = await response.json();
      } else {
        response = await fetch(`/api/status?q=${encodeURIComponent(query.trim())}`);
        result = await response.json();
      }

      if ((response.ok || webAppUrl) && result.success && result.data) {
        setRegData(result.data);
      } else {
        setError(result.message || "Data pendaftaran tidak ditemukan. Periksa kembali input Anda.");
      }
    } catch (err: any) {
      console.error("Search error:", err);
      setError(err.message || "Gagal terhubung ke server pendaftaran. Silakan coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  const getKategoriLabel = (catId: string) => {
    const found = KATEGORI_PESERTA.find((k) => k.id === catId);
    return found ? found.label : catId;
  };

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    try {
      const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(dateStr).toLocaleDateString("id-ID", options);
    } catch (e) {
      return dateStr;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Terverifikasi":
        return (
          <div className="flex flex-col items-center p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center">
            <div className="p-3 bg-emerald-500 text-white rounded-full mb-3">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <span className="text-xl font-black text-emerald-800">STATUS: TERVERIFIKASI</span>
            <p className="text-xs text-emerald-700/80 mt-1 max-w-sm">
              Pembayaran Anda telah diverifikasi oleh bendahara panitia. Selamat bergabung! Tiket/e-card resmi akan dikirim via Email & WhatsApp.
            </p>
          </div>
        );
      case "Ditolak":
        return (
          <div className="flex flex-col items-center p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center">
            <div className="p-3 bg-rose-500 text-white rounded-full mb-3">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <span className="text-xl font-black text-rose-800">STATUS: DITOLAK</span>
            <p className="text-xs text-rose-700/80 mt-1 max-w-sm">
              Bukti transfer tidak sesuai atau transaksi tidak ditemukan. Mohon hubungi panitia melalui kontak WhatsApp di bagian bawah halaman.
            </p>
          </div>
        );
      case "Menunggu Verifikasi":
      default:
        return (
          <div className="flex flex-col items-center p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
            <div className="p-3 bg-amber-500 text-white rounded-full mb-3 animate-pulse">
              <Clock className="h-8 w-8" />
            </div>
            <span className="text-xl font-black text-amber-800">MENUNGGU VERIFIKASI</span>
            <p className="text-xs text-amber-700/80 mt-1 max-w-sm">
              Data Anda telah kami terima dengan sukses. Tim bendahara panitia sedang melakukan verifikasi mutasi rekening berdasarkan nominal & kode unik Anda.
            </p>
          </div>
        );
    }
  };

  return (
    <section id="cek-status" className="py-20 bg-[#F8FAFC]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">Verifikasi Tiket</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight mt-1 mb-4 font-sans">
            Cek Status Pendaftaran Anda
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Masukkan Nomor Registrasi resmi Anda (format: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">KNS2026-XXXX</code>) atau alamat email yang didaftarkan.
          </p>
          <div className="h-1.5 w-24 bg-[#0D9488] mx-auto rounded-full mt-4"></div>
        </div>

        {/* Query Input Card */}
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 mb-10">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="search-input" className="block text-xs font-bold text-slate-600 uppercase mb-2">
                No. Registrasi / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Contoh: KNS2026-1234 atau budi@mail.com"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-4 pr-12 py-3.5 bg-[#F8FAFC]/40 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] focus:border-[#0D9488] text-sm text-slate-800 font-medium placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-2 p-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-[#1e40af] transition disabled:opacity-50 flex items-center justify-center cursor-pointer"
                  aria-label="Cari Status"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </form>

          {error && (
            <div className="mt-4 p-3 bg-rose-50 border border-rose-100 rounded-xl text-xs text-rose-600 font-semibold flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Card */}
        {regData && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 animate-fadeIn">
            {/* Status Header Block */}
            {getStatusBadge(regData.status)}

            {/* Information Grid */}
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider pb-2 border-b border-dashed border-slate-100">
                Detail Registrasi Peserta
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">No. Registrasi</span>
                  <div className="font-extrabold text-[#1E3A8A] text-base">{regData.id}</div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Waktu Daftar</span>
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-[#0D9488]" />
                    {formatDate(regData.timestamp)}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Nama Lengkap</span>
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <User className="h-4 w-4 text-[#0D9488]" />
                    {regData.namaLengkap}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Alamat Email</span>
                  <div className="font-semibold text-slate-700 flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-[#0D9488]" />
                    {regData.email}
                  </div>
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Kategori Peserta</span>
                  <div className="font-extrabold text-slate-800 bg-[#F8FAFC] px-3 py-1.5 rounded-lg inline-block border border-slate-200">
                    {getKategoriLabel(regData.kategoriId)}
                  </div>
                </div>

                {regData.pilihanKegiatan && (
                  <div className="sm:col-span-2 space-y-1">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Pilihan Kegiatan</span>
                    <div className="font-extrabold text-[#0D9488] bg-emerald-50 px-3 py-1.5 rounded-lg inline-block border border-emerald-200">
                      {regData.pilihanKegiatan}
                    </div>
                  </div>
                )}

                {/* Additional custom fields if present */}
                {regData.noSTR && (
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">No. STR</span>
                    <div className="font-medium text-slate-700">{regData.noSTR}</div>
                  </div>
                )}

                {regData.institusi && (
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Institusi / Organisasi</span>
                    <div className="font-medium text-slate-700">{regData.institusi}</div>
                  </div>
                )}

                {regData.noKTP && (
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">No. KTP</span>
                    <div className="font-medium text-slate-700">{regData.noKTP}</div>
                  </div>
                )}

                {regData.cabangPersadia && (
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Cabang PERSADIA</span>
                    <div className="font-medium text-slate-700">{regData.cabangPersadia}</div>
                  </div>
                )}

                {regData.slotWaktuCekGula && (
                  <div className="space-y-1">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Slot Cek Gula</span>
                    <div className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block">{regData.slotWaktuCekGula}</div>
                  </div>
                )}
              </div>

              {/* Fee and Payment Details */}
              <div className="bg-[#F8FAFC]/50 rounded-2xl p-4 sm:p-5 border border-slate-200/60 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Harga Dasar</span>
                  <div className="text-slate-600 font-bold text-sm">{formatRupiah(regData.hargaDasar)}</div>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Kode Unik</span>
                  <div className="text-[#1E3A8A] font-bold text-sm">+{regData.kodeUnik}</div>
                </div>
                <div>
                  <span className="text-[#1E3A8A] font-bold block uppercase tracking-wider text-[10px]">Total Akhir Ditransfer</span>
                  <div className="text-slate-800 font-black text-base flex items-center gap-1">
                    <CreditCard className="h-4 w-4 text-[#0D9488]" />
                    {formatRupiah(regData.totalAkhir)}
                  </div>
                </div>
              </div>

              {/* Attached file link drive if returned */}
              {(regData.buktiTransferUrl || regData.buktiTransferBase64) && (
                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Unggahan Bukti Transfer</span>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-xs text-[#1E3A8A] font-semibold rounded-lg border border-blue-100">
                    <CreditCard className="h-4 w-4" />
                    <span>Telah Dilampirkan Sukses</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
