import { useState, useEffect, useRef, DragEvent } from "react";
import { X, Calendar, User, Mail, Phone, CreditCard, Upload, Loader2, CheckCircle2, ChevronRight, ChevronLeft, Copy, Info } from "lucide-react";
import { KATEGORI_PESERTA, EVENT_INFO, REKENING_PEMBAYARAN, SLOT_WAKTU_CEK_GULA } from "../config";
import { RegistrationData } from "../types";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successData, setSuccessData] = useState<{ id: string; totalAkhir: number; data: any } | null>(null);

  // Form Fields
  const [kategoriId, setKategoriId] = useState(KATEGORI_PESERTA[0].id);
  const [pilihanKegiatan, setPilihanKegiatan] = useState<"Symposium" | "Symposium + Workshop">("Symposium");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  
  // Custom conditional fields
  const [noSTR, setNoSTR] = useState("");
  const [institusi, setInstitusi] = useState("");
  const [noKTP, setNoKTP] = useState("");
  const [cabangPersadia, setCabangPersadia] = useState("");
  const [slotWaktuCekGula, setSlotWaktuCekGula] = useState(SLOT_WAKTU_CEK_GULA[0]);
  
  // Document uploads
  const [buktiMahasiswa, setBuktiMahasiswa] = useState<{ base64: string; name: string } | null>(null);
  const [buktiTransfer, setBuktiTransfer] = useState<{ base64: string; name: string } | null>(null);
  const [isUploadingMahasiswa, setIsUploadingMahasiswa] = useState(false);
  const [isUploadingTransfer, setIsUploadingTransfer] = useState(false);

  // Calculated Fees
  const [hargaDasar, setHargaDasar] = useState(0);
  const [kodeUnik, setKodeUnik] = useState(0);
  const [totalAkhir, setTotalAkhir] = useState(0);

  const dragRefTransfer = useRef<HTMLDivElement>(null);
  const dragRefMahasiswa = useRef<HTMLDivElement>(null);

  const selectedKategori = KATEGORI_PESERTA.find((k) => k.id === kategoriId) || KATEGORI_PESERTA[0];

  // Helper to determine if Early Bird is active
  const isEarlyBirdActive = () => {
    const deadline = new Date(`${EVENT_INFO.batasEarlyBird}T23:59:59+07:00`).getTime();
    const now = new Date().getTime();
    return now <= deadline;
  };

  // Helper to determine if Onsite pricing is active
  const isOnsiteActive = () => {
    const deadline = new Date(`${EVENT_INFO.batasOnsite}T00:00:00+07:00`).getTime();
    const now = new Date().getTime();
    return now >= deadline;
  };

  // 1. Recalculate price when category or pilihanKegiatan changes
  useEffect(() => {
    const isEB = isEarlyBirdActive();
    const isOnsite = isOnsiteActive();
    let price = 0;

    if (selectedKategori.akses === "ilmiah") {
      const hargaObj = pilihanKegiatan === "Symposium" ? selectedKategori.hargaSymposium : selectedKategori.hargaSymposiumWorkshop;
      if (hargaObj) {
        price = isOnsite ? hargaObj.onsite : (isEB ? hargaObj.earlyBird : hargaObj.onsite); // If it's between EB and Onsite, what should it be? Let's use onsite price if it's after early bird, or maybe early bird? The prompt says "early bird (s.d 31 mei), onsite (mulai 1 agustus)". Let's assume regular price is onsite price if there's no intermediate price.
        // Actually, the prompt says "early bird (s.d 31 mei), onsite (mulai 1 agustus)". There is a gap between June and July. I'll just use Onsite for anything after Early Bird as there's no middle price defined.
        price = isEB ? hargaObj.earlyBird : hargaObj.onsite;
      }
    } else {
      price = isEB ? (selectedKategori.hargaEarlyBird || 0) : (selectedKategori.hargaReguler || 0);
    }
    setHargaDasar(price);
  }, [kategoriId, selectedKategori, pilihanKegiatan]);

  // 2. Generate unique code 100-999 once when proceeding to step 2
  const generateUniqueCode = async (basePrice: number) => {
    let code = Math.floor(100 + Math.random() * 900);
    
    // Optional check collision with backend
    try {
      const res = await fetch(`/api/check-code/${code}`);
      const result = await res.json();
      if (result.exists) {
        // regenerate once if collides
        code = Math.floor(100 + Math.random() * 900);
      }
    } catch (e) {
      console.log("Check collision fallback:", e);
    }

    setKodeUnik(code);
    setTotalAkhir(basePrice + code);
  };

  // Helper to compress image in browser
  const compressImageFile = (file: File): Promise<{ base64: string; name: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 1000;
          let width = img.width;
          let height = img.height;

          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);
          
          // Compress quality set to 0.7 JPEG
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve({ base64: dataUrl, name: file.name });
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  // Image Upload handlers (Support Click & Drag and Drop)
  const handleFileChange = async (file: File, type: "mahasiswa" | "transfer") => {
    if (!file.type.startsWith("image/")) {
      setError("Hanya diperbolehkan mengunggah file gambar (JPEG, PNG).");
      return;
    }

    if (type === "mahasiswa") {
      setIsUploadingMahasiswa(true);
      try {
        const res = await compressImageFile(file);
        setBuktiMahasiswa(res);
        setError("");
      } catch (err) {
        setError("Gagal mengompresi bukti mahasiswa.");
      } finally {
        setIsUploadingMahasiswa(false);
      }
    } else {
      setIsUploadingTransfer(true);
      try {
        const res = await compressImageFile(file);
        setBuktiTransfer(res);
        setError("");
      } catch (err) {
        setError("Gagal mengompresi bukti transfer.");
      } finally {
        setIsUploadingTransfer(false);
      }
    }
  };

  // Drag and Drop events
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent, type: "mahasiswa" | "transfer") => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0], type);
    }
  };

  // Navigation Logic
  const handleNextStep1 = () => {
    // Validation
    if (!namaLengkap.trim()) return setError("Nama lengkap wajib diisi.");
    if (!email.trim() || !email.includes("@")) return setError("Email valid wajib diisi.");
    if (!whatsapp.trim() || whatsapp.length < 9) return setError("Nomor WhatsApp valid wajib diisi.");

    const fields = selectedKategori.fieldTambahan;
    if (fields.includes("noSTR") && !noSTR.trim()) return setError("Nomor STR wajib diisi.");
    if (fields.includes("institusi") && !institusi.trim()) return setError("Institusi wajib diisi.");
    if (fields.includes("noKTP") && (!noKTP.trim() || noKTP.length < 16)) return setError("Nomor KTP (16 digit) wajib diisi.");
    if (fields.includes("cabangPersadia") && !cabangPersadia.trim()) return setError("Cabang PERSADIA wajib diisi.");
    if (fields.includes("buktiMahasiswa") && !buktiMahasiswa) return setError("Silakan unggah kartu mahasiswa / bukti akademik.");

    setError("");
    generateUniqueCode(hargaDasar);
    setStep(2);
  };

  const handleNextStep2 = () => {
    // Proceed to upload proof of payment
    setStep(3);
  };

  const handleSubmitRegistration = async () => {
    if (!buktiTransfer) {
      setError("Silakan unggah bukti transfer/pembayaran Anda.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    const dataPayload: RegistrationData = {
      kategoriId: selectedKategori.id,
      pilihanKegiatan: selectedKategori.akses === "ilmiah" ? pilihanKegiatan : undefined,
      namaLengkap,
      email,
      whatsapp,
      hargaDasar,
      kodeUnik,
      totalAkhir,
      status: "Menunggu Verifikasi",
      akses: selectedKategori.akses,
      noSTR: selectedKategori.fieldTambahan.includes("noSTR") ? noSTR : undefined,
      institusi: selectedKategori.fieldTambahan.includes("institusi") ? institusi : undefined,
      noKTP: selectedKategori.fieldTambahan.includes("noKTP") ? noKTP : undefined,
      cabangPersadia: selectedKategori.fieldTambahan.includes("cabangPersadia") ? cabangPersadia : undefined,
      slotWaktuCekGula: selectedKategori.fieldTambahan.includes("slotWaktuCekGula") ? slotWaktuCekGula : undefined,
      buktiMahasiswaName: buktiMahasiswa?.name,
      buktiMahasiswaBase64: buktiMahasiswa?.base64,
      buktiTransferName: buktiTransfer.name,
      buktiTransferBase64: buktiTransfer.base64
    };

    try {
      const webAppUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBAPP_URL || GOOGLE_SHEET_CONFIG.webAppUrl;
      let response;
      let result;

      if (!webAppUrl && import.meta.env.PROD) {
        throw new Error("Google Apps Script Web App URL belum diatur.");
      }

      if (webAppUrl) {
        // Direct call to Google Sheets to support static hosting (like Netlify)
        const randomId = Math.floor(1000 + Math.random() * 9000);
        const registrationId = `KNS2026-${randomId}`;
        
        const payload = {
          ...dataPayload,
          id: registrationId,
          status: "Menunggu Verifikasi",
          timestamp: new Date().toISOString()
        };

        response = await fetch(webAppUrl, {
          method: "POST",
          headers: { 
            "Content-Type": "text/plain;charset=utf-8" 
          },
          body: JSON.stringify({ action: "daftar", data: payload }),
          redirect: "follow"
        });
        
        result = await response.json();
        if (result.success) {
           result.id = registrationId;
           result.data = payload;
        }
      } else {
        // Fallback to Express backend (for local dev / Render / Cloud Run)
        response = await fetch("/api/daftar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: dataPayload }),
        });
        result = await response.json();
      }

      if ((response.ok || webAppUrl) && result.success) {
        setSuccessData({
          id: result.id,
          totalAkhir: totalAkhir,
          data: result.data
        });
        setStep(4);
      } else {
        setError(result.message || "Gagal memproses pendaftaran. Silakan coba kembali.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Koneksi server terputus. Pendaftaran gagal dikirim.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Berhasil disalin: " + text);
  };

  const resetForm = () => {
    setStep(1);
    setError("");
    setSuccessData(null);
    setNamaLengkap("");
    setEmail("");
    setWhatsapp("");
    setNoSTR("");
    setInstitusi("");
    setNoKTP("");
    setCabangPersadia("");
    setBuktiMahasiswa(null);
    setBuktiTransfer(null);
  };

  const handleClose = () => {
    if (step === 4) {
      resetForm();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      id="registration-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div
        id="registration-modal-box"
        className="relative bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]"
      >
        {/* Header Block */}
        <div className="bg-[#1E3A8A] text-white p-6 flex justify-between items-center shrink-0">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg leading-tight">Formulir Pendaftaran</h3>
            <p className="text-xs text-[#F8FAFC]/95 mt-0.5">Konas Persadia 2026 Online Portal</p>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
            aria-label="Tutup Modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dynamic Multi-Step Progress Tracker */}
        <div className="bg-slate-50 border-b border-slate-100 px-6 py-3.5 flex justify-between items-center text-xs text-slate-500 font-bold shrink-0">
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? "bg-[#1E3A8A] text-white" : "bg-slate-200"}`}>1</span>
            <span className={step === 1 ? "text-slate-800" : ""}>Biodata</span>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? "bg-[#1E3A8A] text-white" : "bg-slate-200"}`}>2</span>
            <span className={step === 2 ? "text-slate-800" : ""}>Pembayaran</span>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? "bg-[#1E3A8A] text-white" : "bg-slate-200"}`}>3</span>
            <span className={step === 3 ? "text-slate-800" : ""}>Bukti</span>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
          <div className="flex items-center gap-1.5">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? "bg-emerald-600 text-white animate-pulse" : "bg-slate-200"}`}>4</span>
            <span className={step === 4 ? "text-emerald-800" : ""}>Selesai</span>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-600 font-semibold rounded-xl text-xs flex items-start gap-2">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: BIODATA & CATEGORY SELECTION */}
          {step === 1 && (
            <div className="space-y-4">
              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Kategori Pendaftaran</label>
                <select
                  value={kategoriId}
                  onChange={(e) => setKategoriId(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC]/40 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm text-slate-800 font-medium cursor-pointer"
                >
                  {KATEGORI_PESERTA.map((k) => (
                    <option key={k.id} value={k.id}>
                      {k.label} ({k.akses === "ilmiah" ? "Sesi Ilmiah" : "Pesta Rakyat"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Pilihan Kegiatan Dropdown for Ilmiah */}
              {selectedKategori.akses === "ilmiah" && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Pilihan Kegiatan</label>
                  <select
                    value={pilihanKegiatan}
                    onChange={(e) => setPilihanKegiatan(e.target.value as any)}
                    className="w-full px-4 py-3 bg-[#F8FAFC]/40 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm text-slate-800 font-medium cursor-pointer"
                  >
                    <option value="Symposium">Symposium Saja</option>
                    <option value="Symposium + Workshop">Symposium + Workshop</option>
                  </select>
                </div>
              )}

              {/* General Personal Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Nama Lengkap & Gelar</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Contoh: dr. Budi Setiawan, Sp.PD"
                      value={namaLengkap}
                      onChange={(e) => setNamaLengkap(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Alamat Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="Contoh: budi@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">No. WhatsApp Aktif</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                  />
                </div>
              </div>

              {/* Conditional Additional Fields based on selectedKategori */}
              {selectedKategori.fieldTambahan.includes("noSTR") && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">No. STR Aktif</label>
                  <input
                    type="text"
                    placeholder="Masukkan 16 digit No. STR"
                    value={noSTR}
                    onChange={(e) => setNoSTR(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                  />
                </div>
              )}

              {selectedKategori.fieldTambahan.includes("institusi") && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Asal Institusi / Rumah Sakit / Puskesmas</label>
                  <input
                    type="text"
                    placeholder="Contoh: RSUD Dr. Soetomo Surabaya"
                    value={institusi}
                    onChange={(e) => setInstitusi(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                  />
                </div>
              )}

              {selectedKategori.fieldTambahan.includes("noKTP") && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">No. KTP / NIK (16 digit)</label>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="Masukkan 16 digit Nomor NIK KTP Anda"
                    value={noKTP}
                    onChange={(e) => setNoKTP(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                  />
                </div>
              )}

              {selectedKategori.fieldTambahan.includes("cabangPersadia") && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Unit / Cabang PERSADIA</label>
                  <input
                    type="text"
                    placeholder="Contoh: PERSADIA Unit Bogor Barat"
                    value={cabangPersadia}
                    onChange={(e) => setCabangPersadia(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm"
                  />
                </div>
              )}

              {selectedKategori.fieldTambahan.includes("slotWaktuCekGula") && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Pilih Slot Waktu Cek Gula Darah Gratis</label>
                  <select
                    value={slotWaktuCekGula}
                    onChange={(e) => setSlotWaktuCekGula(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0D9488] text-sm cursor-pointer"
                  >
                    {SLOT_WAKTU_CEK_GULA.map((slot, idx) => (
                      <option key={idx} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Bukti Mahasiswa Upload UI */}
              {selectedKategori.fieldTambahan.includes("buktiMahasiswa") && (
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1.5">Unggah Bukti Akademik / Kartu Mahasiswa</label>
                  <div
                    ref={dragRefMahasiswa}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, "mahasiswa")}
                    onClick={() => document.getElementById("file-mahasiswa")?.click()}
                    className="border-2 border-dashed border-slate-200 hover:border-[#0D9488] rounded-2xl p-5 text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition"
                  >
                    <input
                      type="file"
                      id="file-mahasiswa"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileChange(e.target.files[0], "mahasiswa");
                        }
                      }}
                    />
                    {isUploadingMahasiswa ? (
                      <div className="flex flex-col items-center justify-center gap-1.5 py-2">
                        <Loader2 className="h-6 w-6 animate-spin text-[#1E3A8A]" />
                        <span className="text-xs text-slate-500 font-medium">Mengompresi Gambar...</span>
                      </div>
                    ) : buktiMahasiswa ? (
                      <div className="text-xs">
                        <CheckCircle2 className="h-6 w-6 text-emerald-500 mx-auto mb-1.5" />
                        <span className="font-extrabold text-[#1E3A8A] block max-w-xs mx-auto truncate">{buktiMahasiswa.name}</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Klik untuk mengganti gambar</span>
                      </div>
                    ) : (
                      <div className="text-xs">
                        <Upload className="h-6 w-6 text-slate-400 mx-auto mb-1.5" />
                        <span className="font-bold text-slate-700 block">Tarik & Letakkan atau Klik untuk Unggah</span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">Format Gambar (PNG, JPEG) max 10MB</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: PAYMENT & UNIQUE CODE */}
          {step === 2 && (
            <div className="space-y-5 animate-fadeIn">
              <div className="bg-[#1E3A8A]/5 rounded-2xl p-4 border border-[#1E3A8A]/10">
                <span className="text-[10px] font-black uppercase text-[#1E3A8A] tracking-wider">Kategori Dipilih</span>
                <h4 className="font-extrabold text-slate-800 text-sm leading-tight mt-0.5">{selectedKategori.label}</h4>
              </div>

              {/* Payment Details Container */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase">
                  <span>Biaya Registrasi</span>
                  <span>
                    {hargaDasar === 0 ? "Gratis" : new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(hargaDasar)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-500 font-bold uppercase pb-3 border-b border-dashed border-slate-200">
                  <span className="flex items-center gap-1">
                    Kode Unik Acak
                    <span className="bg-[#1E3A8A]/10 text-[#1E3A8A] px-1 py-0.5 rounded text-[9px]">Sistem</span>
                  </span>
                  <span className="text-[#1E3A8A]">+{kodeUnik}</span>
                </div>
                <div className="flex justify-between items-center pt-1.5">
                  <span className="text-xs font-black text-slate-700 uppercase">Total Akhir Transfer</span>
                  <span className="text-xl font-black text-slate-900">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalAkhir)}
                  </span>
                </div>
              </div>

              {/* Banking Transfer Details */}
              <div className="bg-white rounded-2xl p-5 border border-[#0D9488]/30 shadow-sm space-y-4">
                <h5 className="text-xs font-black text-[#1E3A8A] uppercase flex items-center gap-1.5">
                  <CreditCard className="h-4 w-4" />
                  Rekening Tujuan Pembayaran
                </h5>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Bank</span>
                    <strong className="text-slate-800 text-sm">{REKENING_PEMBAYARAN.bank}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Atas Nama</span>
                    <strong className="text-slate-800 text-xs">{REKENING_PEMBAYARAN.atasNama}</strong>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-400 font-bold block uppercase tracking-wider text-[10px]">Nomor Rekening</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <strong className="text-[#1E3A8A] text-base font-black tracking-wider">{REKENING_PEMBAYARAN.nomorRekening}</strong>
                      <button
                        onClick={() => copyToClipboard(REKENING_PEMBAYARAN.nomorRekening)}
                        className="p-1 rounded hover:bg-slate-100 text-[#0D9488]"
                        title="Salin No Rekening"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-100 text-amber-800 rounded-2xl text-xs space-y-2">
                <p className="font-extrabold flex items-center gap-1">
                  <Info className="h-4 w-4 shrink-0 text-amber-600" />
                  PERINGATAN PENTING:
                </p>
                <p className="leading-relaxed">
                  Mohon transfer <strong>PERSIS PAS</strong> sejumlah <strong className="text-sm bg-amber-100 px-1.5 py-0.5 rounded">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalAkhir)}</strong> (termasuk 3 digit kode unik di akhir) agar tim bendahara kami dapat memverifikasi pembayaran Anda secara cepat dan otomatis. Simpan screenshot struk transaksi Anda untuk diunggah di langkah berikutnya.
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SCREENSHOT PROOF OF PAYMENT UPLOAD */}
          {step === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-[#1E3A8A]/5 rounded-2xl p-4 border border-[#1E3A8A]/10 text-center">
                <span className="text-xs text-slate-500 font-bold block uppercase">Total yang Harus Ditransfer:</span>
                <strong className="text-xl font-black text-[#1E3A8A] block tracking-tight">
                  {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(totalAkhir)}
                </strong>
              </div>

              {/* File Upload Area */}
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-2">Unggah Struk / Bukti Transfer</label>
                <div
                  ref={dragRefTransfer}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, "transfer")}
                  onClick={() => document.getElementById("file-transfer")?.click()}
                  className="border-2 border-dashed border-[#0D9488]/40 hover:border-[#1E3A8A] rounded-2xl p-8 text-center cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition"
                >
                  <input
                    type="file"
                    id="file-transfer"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileChange(e.target.files[0], "transfer");
                      }
                    }}
                  />
                  {isUploadingTransfer ? (
                    <div className="flex flex-col items-center justify-center gap-1.5 py-4">
                      <Loader2 className="h-8 w-8 animate-spin text-[#1E3A8A]" />
                      <span className="text-xs text-slate-500 font-bold">Mengompresi Gambar Bukti Transfer...</span>
                    </div>
                  ) : buktiTransfer ? (
                    <div className="text-xs">
                      <CheckCircle2 className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                      <span className="font-extrabold text-[#1E3A8A] block max-w-sm mx-auto truncate text-sm">{buktiTransfer.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-1">Struk berhasil diunggah dan dikompresi. Klik untuk mengganti gambar</span>
                    </div>
                  ) : (
                    <div className="text-xs py-4">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2.5" />
                      <span className="font-extrabold text-slate-700 block text-sm">Ambil Gambar dari Kamera / Galeri</span>
                      <span className="text-slate-500 block mt-0.5">atau Tarik & Lepaskan struk transfer di sini</span>
                      <span className="text-[10px] text-slate-400 block mt-1.5">File berupa Gambar (PNG, JPG) maks 10MB</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && successData && (
            <div className="text-center py-6 space-y-6 animate-scaleIn">
              <div className="p-3 bg-emerald-500 text-white rounded-full inline-block mx-auto">
                <CheckCircle2 className="h-12 w-12" />
              </div>

              <div className="space-y-1">
                <h4 className="text-xl font-black text-slate-800">Registrasi Berhasil Terkirim!</h4>
                <p className="text-xs text-slate-500">Formulir pendaftaran Anda telah tercatat di Google Sheets kami.</p>
              </div>

              {/* Registration Code Display Box */}
              <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-slate-200/70 inline-block w-full max-w-sm">
                <span className="text-[10px] font-black text-slate-400 block uppercase tracking-wider">No. Registrasi Unik</span>
                <div className="flex items-center justify-center gap-2 mt-1 mb-2">
                  <strong className="text-2xl font-black text-[#1E3A8A] tracking-widest">{successData.id}</strong>
                  <button
                    onClick={() => copyToClipboard(successData.id)}
                    className="p-1 rounded hover:bg-white text-[#0D9488]"
                    title="Salin No Registrasi"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-[10px] text-slate-500 bg-white/70 px-3 py-1.5 rounded-lg border border-slate-200">
                  Simpan kode registrasi di atas untuk memeriksa status verifikasi secara mandiri kapan saja.
                </div>
              </div>

              {/* Summary details */}
              <div className="text-xs text-slate-600 space-y-1 max-w-sm mx-auto text-left bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Nama Lengkap:</span>
                  <strong className="text-slate-800">{namaLengkap}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Kategori Tiket:</span>
                  <strong className="text-slate-800">{selectedKategori.label}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Akses Tiket:</span>
                  <strong className="text-slate-800 uppercase">{selectedKategori.akses === "ilmiah" ? "Sesi Ilmiah (Novotel)" : "Pesta Rakyat (GOR Pakansari)"}</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 mt-1">
                  <span>Total Transfer:</span>
                  <strong className="text-[#1E3A8A]">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(successData.totalAkhir)}</strong>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed px-4">
                Konfirmasi resmi lanjutan serta pengiriman Tiket E-Card akan dihubungi oleh panitia pelaksana secara manual via Email / WhatsApp dalam waktu 1x24 jam setelah proses verifikasi transfer mutasi bank selesai. Terima kasih atas partisipasi Anda.
              </p>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center shrink-0">
          {step === 1 && (
            <>
              <span className="text-xs text-slate-400 font-bold">Masa Early Bird Terbuka</span>
              <button
                id="btn-step1-next"
                onClick={handleNextStep1}
                className="px-6 py-3 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-extrabold text-sm rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Lanjutkan ke Pembayaran
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <button
                onClick={() => setStep(1)}
                className="px-4 py-3 text-[#1E3A8A] hover:text-[#1e40af] font-bold text-sm flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                Kembali
              </button>
              <button
                id="btn-step2-next"
                onClick={handleNextStep2}
                className="px-6 py-3 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-extrabold text-sm rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Sudah Bayar, Unggah Struk
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <button
                disabled={isSubmitting}
                onClick={() => setStep(2)}
                className="px-4 py-3 text-[#1E3A8A] hover:text-[#1e40af] font-bold text-sm flex items-center gap-1 cursor-pointer disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
                Kembali
              </button>
              <button
                id="btn-step3-submit"
                onClick={handleSubmitRegistration}
                disabled={isSubmitting || !buktiTransfer}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-extrabold text-sm rounded-full shadow transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  <>
                    Kirim Pendaftaran
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            </>
          )}

          {step === 4 && (
            <button
              onClick={handleClose}
              className="w-full py-3 bg-[#1E3A8A] hover:bg-[#1e40af] text-white font-extrabold text-sm rounded-xl text-center shadow transition cursor-pointer"
            >
              Selesai & Tutup Jendela
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
