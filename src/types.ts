export interface EventInfo {
  namaAcara: string;
  tema: string;
  tanggalMulai: string;
  tanggalSelesai: string;
  batasEarlyBird: string;
}

export interface KategoriPeserta {
  id: string;
  label: string;
  hargaEarlyBird: number;
  hargaReguler: number;
  akses: "ilmiah" | "pesta_rakyat";
  fieldTambahan: Array<"noSTR" | "institusi" | "buktiMahasiswa" | "noKTP" | "cabangPersadia" | "slotWaktuCekGula">;
}

export interface RekeningPembayaran {
  bank: string;
  nomorRekening: string;
  atasNama: string;
}

export interface GoogleSheetConfig {
  webAppUrl: string; // Used as reference/fallback
}

export interface KontakPanitia {
  email: string;
  whatsapp: string;
}

export interface BrandColors {
  cream: string;
  biruMuda: string;
  biruSedang: string;
  biruTua: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  institution: string;
  imageUrl: string;
  topics: string[];
}

export interface RegistrationData {
  id?: string;
  kategoriId: string;
  namaLengkap: string;
  email: string;
  whatsapp: string;
  akses?: string;
  noSTR?: string;
  institusi?: string;
  noKTP?: string;
  cabangPersadia?: string;
  slotWaktuCekGula?: string;
  buktiMahasiswaName?: string;
  buktiMahasiswaBase64?: string;
  hargaDasar: number;
  kodeUnik: number;
  totalAkhir: number;
  buktiTransferName?: string;
  buktiTransferBase64?: string;
  status: "Menunggu Verifikasi" | "Terverifikasi" | "Ditolak";
  timestamp?: string;
}
