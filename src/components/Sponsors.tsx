import { motion } from "motion/react";
import { Sparkles, Star } from "lucide-react";

export default function Sponsors() {
  // We use placeholder images for sponsors. 
  // Larger resolution for main sponsors, smaller for supporting partners.
  
  const mainSponsors = [
    { id: 1, name: "Novo Nordisk", url: "https://placehold.co/300x150/ffffff/1e3a8a?text=Novo+Nordisk" },
    { id: 2, name: "Sanofi", url: "https://placehold.co/300x150/ffffff/0d9488?text=Sanofi" },
    { id: 3, name: "Dexcom", url: "https://placehold.co/300x150/ffffff/f59e0b?text=Dexcom" },
  ];

  const supportingSponsors = [
    { id: 1, name: "Abbott", url: "https://placehold.co/150x80/f8fafc/64748b?text=Abbott" },
    { id: 2, name: "Medtronic", url: "https://placehold.co/150x80/f8fafc/64748b?text=Medtronic" },
    { id: 3, name: "Roche", url: "https://placehold.co/150x80/f8fafc/64748b?text=Roche" },
    { id: 4, name: "Bayer", url: "https://placehold.co/150x80/f8fafc/64748b?text=Bayer" },
    { id: 5, name: "Kalbe", url: "https://placehold.co/150x80/f8fafc/64748b?text=Kalbe" },
    { id: 6, name: "Bio Farma", url: "https://placehold.co/150x80/f8fafc/64748b?text=Bio+Farma" },
  ];

  return (
    <section id="sponsors" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Sponsors */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#1E3A8A] uppercase">Kemitraan & Dukungan</span>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mt-1 mb-4 font-sans flex items-center justify-center gap-2">
            Sponsor Utama
            <Star className="h-6 w-6 text-[#F59E0B] fill-[#F59E0B]" />
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Didukung penuh oleh mitra strategis kami dalam mewujudkan Indonesia yang lebih sehat.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {mainSponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all flex items-center justify-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <img 
                src={sponsor.url} 
                alt={sponsor.name} 
                className="w-full h-auto max-h-32 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100" 
              />
            </motion.div>
          ))}
        </div>

        {/* Supporting Partners (Running Text / Grid format) */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-slate-700 font-sans flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-[#0D9488]" />
            Mitra Pendukung
          </h3>
        </div>

        {/* We use a flex wrap container for supporting sponsors. If there are many, it wraps naturally. */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 max-w-6xl mx-auto">
          {supportingSponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.id}
              className="bg-slate-50 rounded-xl p-4 border border-slate-100 flex items-center justify-center min-w-[120px] sm:min-w-[160px] hover:bg-white hover:shadow-sm transition-all group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <img 
                src={sponsor.url} 
                alt={sponsor.name} 
                className="h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-300" 
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
