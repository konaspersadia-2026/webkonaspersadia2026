import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Maximize payload size for image base64 uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

  // Mock registrations in memory for testing and fallback
  const mockRegistrations: any[] = [
    {
      id: "KNS2026-1234",
      kategoriId: "perkeni",
      namaLengkap: "dr. Ahmad Fauzi, Sp.PD-KEMD",
      email: "ahmad.fauzi@gmail.com",
      whatsapp: "081234567890",
      noSTR: "1234567890123456",
      institusi: "RS Umum Daerah Dr. Soetomo",
      hargaDasar: 1500000,
      kodeUnik: 342,
      totalAkhir: 1500342,
      status: "Terverifikasi",
      timestamp: new Date().toISOString()
    },
    {
      id: "KNS2026-5678",
      kategoriId: "umum",
      namaLengkap: "Budi Santoso",
      email: "budi.santoso@gmail.com",
      whatsapp: "082134567891",
      noKTP: "3201234567890001",
      slotWaktuCekGula: "07:30 - 09:00 (Sesi Pagi II)",
      hargaDasar: 0,
      kodeUnik: 785,
      totalAkhir: 785,
      status: "Menunggu Verifikasi",
      timestamp: new Date().toISOString()
    }
  ];

  // API Routes
  app.get("/api/health", (req, res) => {
    const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL || "";
    const isConfigured = webAppUrl && 
                         webAppUrl !== "https://script.google.com/macros/s/.../exec" && 
                         webAppUrl.startsWith("https://script.google.com");
    
    let maskedUrl = "Belum Dikonfigurasi (Masih kosong)";
    if (webAppUrl) {
      if (webAppUrl === "https://script.google.com/macros/s/.../exec") {
        maskedUrl = "Belum Dikonfigurasi (Masih menggunakan placeholder default)";
      } else {
        maskedUrl = webAppUrl.substring(0, 35) + "..." + webAppUrl.substring(Math.max(35, webAppUrl.length - 10));
      }
    }

    res.json({ 
      status: "ok", 
      env: process.env.NODE_ENV || "development",
      googleSheetWebApp: {
        isConfigured: !!isConfigured,
        urlPreview: maskedUrl,
        length: webAppUrl.length
      }
    });
  });

  // Proxy registration to Google Sheets Web App
  app.post("/api/daftar", async (req, res) => {
    try {
      const { data } = req.body;
      if (!data) {
        return res.status(400).json({ success: false, message: "Data pendaftaran tidak ditemukan." });
      }

      // Generate unique registration ID KNS2026-XXXX
      const randomId = Math.floor(1000 + Math.random() * 9000);
      const registrationId = `KNS2026-${randomId}`;

      const payload = {
        ...data,
        id: registrationId,
        status: "Menunggu Verifikasi",
        timestamp: new Date().toISOString()
      };

      const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

      // Check if GOOGLE_SHEET_WEBAPP_URL is configured
      const isConfigured = webAppUrl && 
                           webAppUrl !== "https://script.google.com/macros/s/.../exec" && 
                           webAppUrl.startsWith("https://script.google.com");

      if (isConfigured) {
        console.log(`Forwarding registration ${registrationId} to Google Sheets: ${webAppUrl}`);
        
        try {
          // Perform server-to-server POST to avoid CORS issues in browser
          const response = await fetch(webAppUrl!, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "daftar",
              data: payload
            }),
          });

          const resText = await response.text();
          let sheetsResult;
          try {
            sheetsResult = JSON.parse(resText);
          } catch (e) {
            sheetsResult = { success: true, message: resText };
          }

          // Also update local mock for verification fallback checks
          mockRegistrations.push(payload);

          return res.json({
            success: true,
            id: registrationId,
            data: payload,
            sheetsResponse: sheetsResult,
            source: "google-sheets"
          });
        } catch (fetchErr: any) {
          console.error("Failed to connect to Google Sheets Web App:", fetchErr);
          
          // Fallback to local memory so registration isn't lost for the preview user
          mockRegistrations.push(payload);
          return res.json({
            success: true,
            id: registrationId,
            data: payload,
            warning: "Gagal menyambung ke Google Sheets. Disimpan ke penyimpanan lokal sementara.",
            errorDetails: fetchErr.message,
            source: "local-fallback"
          });
        }
      } else {
        // No Google Sheets URL configured, run in mock standalone mode
        mockRegistrations.push(payload);
        console.log(`Saved registration ${registrationId} to local memory (Standalone Mode)`);
        
        return res.json({
          success: true,
          id: registrationId,
          data: payload,
          isMock: true,
          source: "local"
        });
      }
    } catch (err: any) {
      console.error("Registration endpoint error:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan internal server.", error: err.message });
    }
  });

  // Query registration status from Google Sheets
  app.get("/api/status", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ success: false, message: "Parameter 'q' (No. Registrasi / Email) wajib diisi." });
      }

      const qClean = query.trim().toLowerCase();
      const webAppUrl = process.env.GOOGLE_SHEET_WEBAPP_URL;

      const isConfigured = webAppUrl && 
                           webAppUrl !== "https://script.google.com/macros/s/.../exec" && 
                           webAppUrl.startsWith("https://script.google.com");

      if (isConfigured) {
        console.log(`Checking status for ${query} on Google Sheets: ${webAppUrl}`);
        try {
          const targetUrl = `${webAppUrl}?action=status&q=${encodeURIComponent(query)}`;
          const response = await fetch(targetUrl);
          
          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }

          const result = await response.json();
          return res.json(result);
        } catch (fetchErr: any) {
          console.error("Failed to query Google Sheets Web App, falling back to local memory:", fetchErr);
          
          const found = mockRegistrations.find(
            r => r.id?.toLowerCase() === qClean || r.email?.toLowerCase() === qClean
          );

          if (found) {
            return res.json({
              success: true,
              data: found,
              source: "local-fallback",
              warning: "Gagal terhubung ke Google Sheets, menampilkan data lokal."
            });
          }

          return res.status(404).json({
            success: false,
            message: "Data tidak ditemukan (koneksi Google Sheets terputus dan data tidak ada di lokal)."
          });
        }
      } else {
        // Mock standalone lookup
        const found = mockRegistrations.find(
          r => r.id?.toLowerCase() === qClean || r.email?.toLowerCase() === qClean
        );

        if (found) {
          return res.json({
            success: true,
            data: found,
            source: "local"
          });
        }

        return res.status(404).json({
          success: false,
          message: "Data pendaftaran tidak ditemukan. Anda dapat mencoba mencari menggunakan email dummy: 'ahmad.fauzi@gmail.com' atau 'budi.santoso@gmail.com' untuk pengujian."
        });
      }
    } catch (err: any) {
      console.error("Status endpoint error:", err);
      res.status(500).json({ success: false, message: "Terjadi kesalahan internal server.", error: err.message });
    }
  });

  // Check unique codes collision (Optional, per section 5 step 2)
  app.get("/api/check-code/:code", (req, res) => {
    const code = parseInt(req.params.code, 10);
    const exists = mockRegistrations.some(
      r => r.kodeUnik === code && r.status === "Menunggu Verifikasi"
    );
    res.json({ exists });
  });

  // Serve static assets or mount Vite in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
