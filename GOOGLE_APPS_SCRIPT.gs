/**
 * GOOGLE APPS SCRIPT FOR KONAS PERSADIA 2026 WEB PORTAL
 * 
 * Skenario Penggunaan:
 * 1. Buka Google Sheet baru Anda.
 * 2. Masuk ke menu Extensions > Apps Script.
 * 3. Hapus kode default yang ada, lalu salin dan tempel kode ini seluruhnya.
 * 4. Buat folder kosong di Google Drive Anda untuk menampung Bukti Transfer & Bukti Mahasiswa,
 *    lalu ganti DRIVE_FOLDER_ID di bawah dengan ID folder tersebut.
 * 5. Klik tombol Deploy di kanan atas > New Deployment > Select type: Web App.
 * 6. Set Description, Execute as: "Me", Who has access: "Anyone".
 * 7. Klik Deploy, berikan otorisasi akses Google Drive/Sheets jika diminta.
 * 8. Salin URL Web App hasil deploy, simpan di environment variable GOOGLE_SHEET_WEBAPP_URL aplikasi Anda.
 */

// GANTI DENGAN ID FOLDER GOOGLE DRIVE ANDA
const DRIVE_FOLDER_ID = "MASUKKAN_ID_FOLDER_GOOGLE_DRIVE_DISINI";

// Nama sheet tempat data disimpan
const SHEET_NAME = "Pendaftaran_Konas_2026";

function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Tulis Header Kolom
    const headers = [
      "No. Registrasi",
      "Timestamp",
      "Nama Lengkap",
      "Email",
      "No. WhatsApp",
      "Kategori Peserta",
      "Akses",
      "Harga Dasar",
      "Kode Unik",
      "Total Akhir",
      "Status",
      "No. STR",
      "Institusi",
      "No. KTP",
      "Cabang PERSADIA",
      "Slot Cek Gula",
      "Bukti Mahasiswa",
      "Bukti Transfer"
    ];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#91C8E4");
    sheet.setFrozenRows(1);
  }
}

// Menangani permintaan POST (Kirim Data Baru & Unggah File)
function doPost(e) {
  try {
    setupSheet();
    const requestData = JSON.parse(e.postData.contents);
    
    if (requestData.action === "daftar") {
      const data = requestData.data;
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(SHEET_NAME);
      
      let folder;
      try {
        folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
      } catch (err) {
        folder = DriveApp.getRootFolder(); // Fallback ke Root jika ID tidak valid
      }
      
      // Simpan Bukti Transfer jika ada (Base64)
      let buktiTransferUrl = "";
      if (data.buktiTransferBase64 && data.buktiTransferName) {
        const fileBlob = Utilities.newBlob(
          Utilities.base64Decode(data.buktiTransferBase64.split(",")[1] || data.buktiTransferBase64),
          getMimeType(data.buktiTransferName),
          data.id + "_bukti_transfer_" + data.buktiTransferName
        );
        const file = folder.createFile(fileBlob);
        file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
        buktiTransferUrl = file.getUrl();
      }
      
      // Simpan Bukti Mahasiswa jika ada (Base64)
      let buktiMahasiswaUrl = "";
      if (data.buktiMahasiswaBase64 && data.buktiMahasiswaName) {
        const fileBlob = Utilities.newBlob(
          Utilities.base64Decode(data.buktiMahasiswaBase64.split(",")[1] || data.buktiMahasiswaBase64),
          getMimeType(data.buktiMahasiswaName),
          data.id + "_bukti_mahasiswa_" + data.buktiMahasiswaName
        );
        const file = folder.createFile(fileBlob);
        file.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.VIEW);
        buktiMahasiswaUrl = file.getUrl();
      }
      
      // Tambahkan baris data baru ke Google Sheet
      const row = [
        data.id,
        data.timestamp || new Date().toISOString(),
        data.namaLengkap,
        data.email,
        data.whatsapp,
        data.kategoriId, // akan dicocokkan dengan label di frontend
        data.akses || "",
        data.hargaDasar,
        data.kodeUnik,
        data.totalAkhir,
        data.status || "Menunggu Verifikasi",
        data.noSTR || "",
        data.institusi || "",
        data.noKTP || "",
        data.cabangPersadia || "",
        data.slotWaktuCekGula || "",
        buktiMahasiswaUrl,
        buktiTransferUrl
      ];
      
      sheet.appendRow(row);
      
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Data pendaftaran berhasil disimpan.",
        id: data.id,
        buktiTransferUrl: buktiTransferUrl,
        buktiMahasiswaUrl: buktiMahasiswaUrl
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Action tidak dikenal."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Terjadi kesalahan: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Menangani permintaan GET (Cek Status Pendaftaran)
function doGet(e) {
  try {
    setupSheet();
    const action = e.parameter.action;
    const q = e.parameter.q;
    
    if (action === "status" && q) {
      const qClean = q.trim().toLowerCase();
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = ss.getSheetByName(SHEET_NAME);
      const rows = sheet.getDataRange().getValues();
      
      const headers = rows[0];
      
      // Cari baris yang cocok (kolom 0 = No. Registrasi, kolom 3 = Email)
      for (let i = 1; i < rows.length; i++) {
        const regId = String(rows[i][0]).trim().toLowerCase();
        const email = String(rows[i][3]).trim().toLowerCase();
        
        if (regId === qClean || email === qClean) {
          // Bentuk object response dari baris yang ditemukan
          const data = {};
          data.id = rows[i][0];
          data.timestamp = rows[i][1];
          data.namaLengkap = rows[i][2];
          data.email = rows[i][3];
          data.whatsapp = rows[i][4];
          data.kategoriId = rows[i][5];
          data.akses = rows[i][6];
          data.hargaDasar = rows[i][7];
          data.kodeUnik = rows[i][8];
          data.totalAkhir = rows[i][9];
          data.status = rows[i][10];
          data.noSTR = rows[i][11];
          data.institusi = rows[i][12];
          data.noKTP = rows[i][13];
          data.cabangPersadia = rows[i][14];
          data.slotWaktuCekGula = rows[i][15];
          data.buktiMahasiswaUrl = rows[i][16];
          data.buktiTransferUrl = rows[i][17];
          
          return ContentService.createTextOutput(JSON.stringify({
            success: true,
            data: data
          })).setMimeType(ContentService.MimeType.JSON);
        }
      }
      
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        message: "Data pendaftaran tidak ditemukan."
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Request parameter tidak lengkap."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Terjadi kesalahan GET: " + err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper untuk menebak MimeType file berdasarkan ekstensi
function getMimeType(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  switch (ext) {
    case 'png': return MimeType.PNG;
    case 'gif': return MimeType.GIF;
    case 'pdf': return MimeType.PDF;
    case 'jpg':
    case 'jpeg':
    default:
      return MimeType.JPEG;
  }
}
