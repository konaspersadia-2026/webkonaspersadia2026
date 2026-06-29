import { EventInfo, KategoriPeserta, RekeningPembayaran, GoogleSheetConfig, KontakPanitia, BrandColors, Speaker } from "./types";

// ============================================
// KONFIGURASI EVENT — EDIT BAGIAN INI SAJA
// ============================================

export const EVENT_INFO: EventInfo = {
  namaAcara: "KONAS PERSADIA, KONKER PEDI, dan KONKER PERKENI 2026",
  tema: "Pesta Rakyat Persadia, Menyehatkan Indonesia",
  tanggalMulai: "2026-11-14",
  tanggalSelesai: "2026-11-15",
  batasEarlyBird: "2026-10-15", // format: YYYY-MM-DD (setelah tanggal ini otomatis harga reguler)
};

export const KATEGORI_PESERTA: KategoriPeserta[] = [
  {
    id: "perkeni",
    label: "Anggota PERKENI (Sp. Endokrin)",
    hargaEarlyBird: 1500000,
    hargaReguler: 2000000,
    akses: "ilmiah",
    fieldTambahan: ["noSTR", "institusi"],
  },
  {
    id: "dokter_spesialis_lain",
    label: "Dokter Spesialis (non-endokrin/lain)",
    hargaEarlyBird: 1750000,
    hargaReguler: 2250000,
    akses: "ilmiah",
    fieldTambahan: ["noSTR", "institusi"],
  },
  {
    id: "nakes_pedi",
    label: "Dokter Umum / Nakes / Anggota PEDI",
    hargaEarlyBird: 1250000,
    hargaReguler: 1500000,
    akses: "ilmiah",
    fieldTambahan: ["noSTR", "institusi"],
  },
  {
    id: "mahasiswa",
    label: "Mahasiswa Kedokteran / PPDS / Residen",
    hargaEarlyBird: 750000,
    hargaReguler: 900000,
    akses: "ilmiah",
    fieldTambahan: ["institusi", "buktiMahasiswa"],
  },
  {
    id: "persadia",
    label: "Anggota PERSADIA (Diabetesi/Keluarga)",
    hargaEarlyBird: 0,
    hargaReguler: 25000,
    akses: "pesta_rakyat",
    fieldTambahan: ["noKTP", "cabangPersadia", "slotWaktuCekGula"],
  },
  {
    id: "umum",
    label: "Masyarakat Umum",
    hargaEarlyBird: 0,
    hargaReguler: 50000,
    akses: "pesta_rakyat",
    fieldTambahan: ["noKTP", "slotWaktuCekGula"],
  },
];

export const REKENING_PEMBAYARAN: RekeningPembayaran = {
  bank: "Bank Mandiri",
  nomorRekening: "133-00-1234567-8",
  atasNama: "Panitia Konas Persadia 2026",
};

export const GOOGLE_SHEET_CONFIG: GoogleSheetConfig = {
  webAppUrl: "https://script.google.com/macros/s/AKfycbz_example_web_app_url_placeholder/exec",
};

export const KONTAK_PANITIA: KontakPanitia = {
  email: "panitia@persadia2026.or.id",
  whatsapp: "+6281234567890",
};

export const BRAND_COLORS: BrandColors = {
  cream: "#F8FAFC",
  biruMuda: "#F59E0B",
  biruSedang: "#0D9488",
  biruTua: "#1E3A8A",
};

// Slots waktu untuk pemeriksaan gula darah gratis di Pesta Rakyat
export const SLOT_WAKTU_CEK_GULA = [
  "06:00 - 07:30 (Sesi Pagi I)",
  "07:30 - 09:00 (Sesi Pagi II)",
  "09:00 - 10:30 (Sesi Pagi III)",
  "10:30 - 12:00 (Sesi Siang)",
];

// Profil Pembicara Dummy (Sesuai Section 7)
export const DUMMY_SPEAKERS: Speaker[] = [
  {
    id: "sp1",
    name: "Prof. Dr. dr. Sidartawan Soegondo, Sp.PD-KEMD",
    title: "Guru Besar Endokrinologi & Metabolik",
    institution: "Universitas Indonesia / PERKENI",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    topics: ["Manajemen Mutakhir Diabetes Tipe 2", "Edukasi Diabetes Berkelanjutan"]
  },
  {
    id: "sp2",
    name: "dr. Roy Panusunan Sibarani, Sp.PD-KEMD",
    title: "Konsultan Endokrinologi & Metabolik",
    institution: "Ketua Panitia Pelaksana / PERSADIA",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    topics: ["Deteksi Dini Komplikasi Kardiovaskular pada Diabetes", "Pesta Rakyat: Pendekatan Komunitas"]
  },
  {
    id: "sp3",
    name: "Dr. dr. Wismandari, Sp.PD-KEMD",
    title: "Dokter Spesialis Penyakit Dalam - Konsultan",
    institution: "Seksi Ilmiah PERKENI",
    imageUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=300",
    topics: ["Gangguan Tiroid dan Diabetes", "Terapi Insulin Presisi"]
  },
  {
    id: "sp4",
    name: "dr. Dicky Levenus Tahapary, Sp.PD-KEMD, Ph.D",
    title: "Peneliti & Staf Pengajar Endokrinologi",
    institution: "Wakil Ketua / RSCM-FKUI",
    imageUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    topics: ["Epidemiologi Diabetes di Indonesia", "Gaya Hidup dan Remisi Diabetes"]
  },
  {
    id: "sp5",
    name: "dr. Monika, Sp.PD",
    title: "Edukator Diabetes & Praktisi Klinis",
    institution: "PEDI (Perkumpulan Edukator Diabetes Indonesia)",
    imageUrl: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300",
    topics: ["Komunikasi Terapeutik dalam Edukasi Diabetes", "Peran Keluarga dalam Pemantauan Gula Mandiri"]
  },
  {
    id: "sp6",
    name: "Dr. dr. K Heri Nugroho Hario Seno, Sp.PD-KEMD",
    title: "Konsultan Diabetes Senior",
    institution: "Penasehat Panitia / Universitas Diponegoro",
    imageUrl: "https://images.unsplash.com/photo-1582750433449-649350141f16?auto=format&fit=crop&q=80&w=300",
    topics: ["Kaki Diabetes: Pencegahan Amputasi", "Nutrisi Medis pada Pasien Geriatri"]
  }
];

// Susunan Panitia Pelaksana (Sesuai Section 7)
export const SUSUNAN_PANITIA = {
  penasehat: [
    "Prof. Dr. dr. Achmad Rudijanto, Sp.PD., KEMD",
    "Prof. Dr. dr. Sidartawan Soegondo, Sp.PD., KEMD",
    "Prof. Dr. dr. Mardi Santoso, Sp.PD., KEMD",
    "Dr. dr. K Heri Nugroho Hario Seno, Sp.PD., KEMD"
  ],
  ketua: "dr. Roy Panusunan Sibarani, Sp.PD., KEMD",
  wakilKetua: "dr. Dicky Levenus Tahapary, Sp.PD., KEMD, Ph.D",
  bendahara: [
    "Ibu Magdalena Vandry",
    "dr. Monika"
  ],
  sekretaris: [
    "dr. William Djauhari",
    "dr. Widya Mandala Sari, Sp.PD"
  ],
  seksiAcara: [
    "Bapak Nofri",
    "Ibu Adisti",
    "dr. Pandu Tridana Sakti, Sp.PD"
  ],
  seksiIlmiah: [
    "Dr. dr. Wismandari, Sp.PD., KEMD",
    "dr. Johanes Purworto, Sp.PD., KEMD",
    "dr. Nur Rusyda Kuddah, Sp.PD., KEMD"
  ],
  seksiTransportasi: [
    "Mohammad Sidik",
    "Ali Nandho"
  ],
  seksiKonsumsi: "Ibu Susanti Suharto (Persadia Bogor)",
  seksiPeserta: [
    "Pak Agus Sumitro (Persadia Depok)",
    "Pak Han Phattua L (Persadia Jakarta)"
  ],
  seksiPublikasi: "Steven Wijaya",
  seksiProtokol: [
    "dr. Fauzia Kirana, Sp.PD",
    "dr. Maria Sen"
  ]
};
