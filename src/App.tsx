import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Github, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Terminal, 
  Send, 
  Database, 
  Cpu, 
  Layers, 
  Globe, 
  Search, 
  Sparkles, 
  Printer, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  BookOpen, 
  Wrench, 
  Clock, 
  User, 
  ListTodo,
  FileText,
  Gamepad2,
  Download
} from "lucide-react";

import { 
  biography, 
  education, 
  experiences, 
  skills, 
  certificate, 
  projects, 
  chatAssistantAnswers 
} from "./data";
import ChessGameView from "./ChessGame";

export default function App() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "game" | "print">("portfolio");
  const [selectedExperience, setSelectedExperience] = useState<number>(0);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>("Full Stack Developer");
  
  // Interactive Chatbot States
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "bot"; text: string; time: string }>>([
    { 
      sender: "bot", 
      text: "Halo! Saya adalah **Andre AI**, asisten digital Andre. Silakan tanya kepada saya tentang Curriculum Vitae, pendidikan, sertifikasi, atau pengalaman kerja Andre!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to latest chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen]);

  // Handle chatbot messaging
  const handleSendMessage = (textToSend?: string) => {
    const rawQuery = textToSend || chatInput;
    if (!rawQuery.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = { sender: "user" as const, text: rawQuery, time: userTime };
    
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput("");

    // Simulate thinking & matching
    setTimeout(() => {
      const normalizedQuery = rawQuery.toLowerCase();
      let matchedAnswer = "Maaf sekali, saya tidak menemukannya secara spesifik. Namun Anda dapat menanyakan tentang **pendidikan**, **skill pemrograman**, **pengalaman logistik/toko**, atau **sertifikat HTML5** Andre.";

      for (const group of chatAssistantAnswers) {
        if (group.keywords.some(keyword => normalizedQuery.includes(keyword))) {
          matchedAnswer = group.answer;
          break;
        }
      }

      setMessages(prev => [...prev, {
        sender: "bot" as const,
        text: matchedAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 600);
  };

  // Preset chatbot keywords
  const chatPresets = [
    { label: "🎓 Pendidikan S1", query: "Beri tahu saya tentang pendidikan kuliah Andre" },
    { label: "💼 Pengalaman Kerja", query: "Apa saja pengalaman kerja Andre?" },
    { label: "🛠️ Skill Pemrograman", query: "Keahlian pemrograman dan teknologi apa saja yang dikuasai?" },
    { label: "📜 Sertifikat HTML5", query: "Sertifikasi apa saja yang dimiliki?" },
    { label: "📞 Hubungi Andre", query: "Bagaimana cara menghubungi kontak Andre?" }
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-cyber-dark text-slate-100 flex flex-col font-sans grid-glow antialiased relative selection:bg-cyan-500 selection:text-black">
      
      {/* GLOWING AMBIENT BACKGROUND DECORATIONS (Architectural elegance) */}
      <div className="hidden sm:block absolute top-0 left-1/4 w-[400px] max-w-[60vw] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
      <div className="hidden sm:block absolute top-2/3 right-0 w-[500px] max-w-[65vw] h-[500px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none -z-10"></div>

      {/* HEADER NAVBAR */}
      <header className="sticky top-0 z-40 bg-cyber-dark/80 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 min-h-[72px] py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full max-w-full overflow-hidden">
          <div className="flex items-center gap-3 min-w-0 w-full sm:w-auto">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20 relative overflow-hidden shrink-0">
              <div className="h-full w-full rounded-2xl bg-slate-950 overflow-hidden">
                <img
                  src={biography.profilePhoto}
                  alt={biography.name}
                  className="w-full h-full object-cover object-[center_18%] scale-110"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="font-display font-bold tracking-tight text-white text-sm sm:text-base truncate">{biography.name}</h1>
              <p className="max-w-full text-[8.5px] sm:text-[10px] uppercase tracking-[0.09em] sm:tracking-[0.16em] text-cyan-400 font-mono font-bold leading-relaxed break-words">Informatics Engineering Student • Web Developer • IoT Enthusiast</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* Tab navigation */}
            <div className="grid grid-cols-3 sm:flex w-full sm:w-auto min-w-0 bg-slate-900/80 p-1 rounded-lg border border-white/5">
              <button 
                id="btn-nav-portfolio"
                onClick={() => setActiveTab("portfolio")}
                className={`min-w-0 overflow-hidden px-1.5 sm:px-4 py-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium tracking-wide transition-all text-center ${
                  activeTab === "portfolio" 
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm" 
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                Portofolio Utama
              </button>
              <button 
                id="btn-nav-game"
                onClick={() => setActiveTab("game")}
                className={`min-w-0 overflow-hidden px-1.5 sm:px-4 py-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  activeTab === "game" 
                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm" 
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <Gamepad2 className="h-3.5 w-3.5" />
                Game
              </button>
              <button 
                id="btn-nav-cv"
                onClick={() => setActiveTab("print")}
                className={`min-w-0 overflow-hidden px-1.5 sm:px-4 py-2 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-medium tracking-wide transition-all flex items-center justify-center gap-1 sm:gap-1.5 ${
                  activeTab === "print" 
                    ? "bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 border border-cyan-500/30 shadow-sm" 
                    : "text-slate-400 hover:text-white border border-transparent"
                }`}
              >
                <Printer className="h-3.5 w-3.5" />
                CV
              </button>
            </div>

            {/* Direct Connect Mail Button */}
            <a 
              id="cta-mail-header"
              href={`mailto:${biography.email}`}
              className="hidden md:flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-455 hover:to-emerald-455 text-cyber-dark font-medium text-xs px-4 py-2 rounded-lg transition-transform hover:scale-105 active:scale-95 shadow-md shadow-cyan-500/10"
            >
              <Mail className="h-3.5 w-3.5" />
              Hubungi Saya
            </a>
          </div>
        </div>
      </header>

      {/* PORTFOLIO MODE VIEW */}
      <AnimatePresence mode="wait">
        {activeTab === "portfolio" ? (
          <motion.main 
            key="portfolio-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-grow max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10 w-full max-w-full overflow-x-hidden space-y-12 sm:space-y-16"
          >
            {/* HERO SECTION */}
            <section id="hero-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
              <div className="lg:col-span-7 space-y-6">
                
                <div className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-mono text-cyan-400 tracking-wide">
                    Halo, Nama saya
                  </h2>
                  <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold tracking-tight text-white leading-tight">
                    {biography.name}
                  </h1>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-display font-bold tracking-tight text-slate-300">
                    S1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Teknik Informatika</span> di UNAI
                  </h3>
                </div>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {biography.summary}
                </p>

                {/* Quick Info Badges Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">IPK AKADEMIK</span>
                    <span className="text-base font-bold text-white font-mono">{education.gpa}</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">SERSIFIKASI</span>
                    <span className="text-base font-bold text-cyan-400 font-mono">1 Internasional</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">TAHUN MULAI</span>
                    <span className="text-base font-bold text-white font-mono">2023</span>
                  </div>
                  <div className="bg-slate-900/50 p-3 rounded-xl border border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono block">DOMISILI</span>
                    <span className="text-xs font-bold text-emerald-400 truncate block">Bandung Barat</span>
                  </div>
                </div>

                {/* Action CTA list */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <button
                    id="btn-open-chatbot"
                    onClick={() => setChatOpen(true)}
                    className="flex items-center gap-2 bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors font-mono text-xs px-5 py-3 rounded-xl shadow-lg"
                  >
                    <Terminal className="h-4 w-4" />
                    Buka Interaktif Bot
                  </button>
                  
                  <button 
                    id="btn-goto-cv"
                    onClick={() => setActiveTab("print")}
                    className="flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 text-slate-300 hover:text-white border border-white/10 hover:border-slate-400 transition-colors text-xs px-5 py-3 rounded-xl font-medium"
                  >
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Lihat CV Lengkap
                  </button>

                  <button 
                    id="btn-launch-game-hero"
                    onClick={() => setActiveTab("game")}
                    className="flex items-center gap-2 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 text-cyan-300 hover:text-white border border-cyan-500/20 hover:border-cyan-400/50 transition-colors text-xs px-5 py-3 rounded-xl font-medium shadow-lg shadow-cyan-500/5"
                  >
                    <Gamepad2 className="h-4 w-4 text-cyan-400" />
                    Mainkan Neon Chess
                  </button>

                  <a 
                    id="link-github-hero"
                    href={biography.github}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="flex items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-white/5 hover:border-white/20 text-slate-400 hover:text-white transition-all hover:scale-105"
                    title="GitHub Profile"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* CARD PREVIEW DESIGN (Sophisticated Interactive Visualizer) */}
              <div className="lg:col-span-5 relative">
                <div className="relative mx-auto max-w-[320px] sm:max-w-[360px] aspect-[3/4] rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900 to-cyber-dark p-6 shadow-2xl flex flex-col justify-between overflow-hidden">
                  
                  {/* Decorative corner lines representing cyber style */}
                  <div className="absolute top-0 right-0 h-10 w-10 border-t border-r border-cyan-400/50 rounded-tr-3xl"></div>
                  <div className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-emerald-400/50 rounded-bl-3xl"></div>
                  <div className="absolute top-8 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

                  {/* Top segment */}
                  <div className="space-y-4 pt-4">
                    <div className="flex justify-between items-center text-xs font-mono text-slate-500">
                      <span>BIODATA</span>
                      <span className="text-cyan-400">ONLINE</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      {/* Interactive CSS rendered profile picture with high-tech framing */}
                      <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/10">
                        <div className="h-full w-full rounded-2xl bg-slate-950 flex items-center justify-center overflow-hidden">
                          <img 
                            src={biography.profilePhoto} 
                            alt={biography.name}
                            className="w-full h-full object-cover object-[center_18%] scale-110"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="absolute -bottom-1.5 -right-1.5 h-5 w-5 bg-emerald-500 rounded-full border-4 border-cyber-dark flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-cyber-dark" />
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <h4 className="text-sm font-display font-extrabold text-white">{biography.name}</h4>
                        <p className="text-[10px] font-mono text-slate-400">{education.institution}</p>
                        <p className="text-[11px] font-mono text-cyan-400">Informatics Eng.</p>
                      </div>
                    </div>
                  </div>

                  {/* Central interactive matrix block */}
                  <div className="bg-slate-950/60 p-4 rounded-2xl border border-white/5 space-y-3 font-mono text-xs">
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest border-b border-white/5 pb-1 flex justify-between">
                      <span>System Credentials</span>
                      <span className="text-emerald-400">SECURE</span>
                    </div>
                    <div className="space-y-2 text-slate-300">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight select-all">{biography.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-sky-400 shrink-0" />
                        <span className="text-[11px] select-all truncate">{biography.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <span className="text-[11px] select-all">{biography.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom section with tech codes rendering */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500">PROGRAMS STATUS</span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">PASSED</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-white/5 rounded border border-white/5 text-slate-400">React.js</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-white/5 rounded border border-white/5 text-slate-400">NestJS</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-cyan-500/10 rounded border border-cyan-500/20 text-cyan-400">HTML5 S1</span>
                      <span className="text-[9px] font-mono px-2 py-0.5 bg-emerald-500/10 rounded border border-emerald-500/20 text-emerald-400">IoT Dev</span>
                    </div>

                    <p className="text-[9px] font-mono text-slate-600 text-center uppercase tracking-widest pt-1 border-t border-white/5">
                      Universitas Advent Indonesia S1
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* EXPERIENCE SIMULATOR TIMELINE */}
            <section id="experience-section" className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    <Briefcase className="h-3.5 w-3.5" />
                    Timeline Karir
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    Pengalaman Kerja
                  </h2>
                </div>

                {/* Experience selector buttons */}
                <div className="flex gap-2 bg-slate-900 p-1.5 rounded-xl border border-white/5">
                  {experiences.map((exp, idx) => (
                    <button
                      key={exp.company}
                      id={`btn-experience-tab-${idx}`}
                      onClick={() => setSelectedExperience(idx)}
                      className={`px-4 py-2 rounded-lg text-xs font-mono transition-all ${
                        selectedExperience === idx 
                          ? "bg-cyan-500 text-cyber-dark font-bold shadow-md shadow-cyan-500/10" 
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {exp.company}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interactive Experience Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Selected Experience Detail */}
                <div className="lg:col-span-7 bg-cyber-card/60 card-gloss rounded-3xl p-6 sm:p-8 space-y-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/5 pb-4">
                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-bold text-white">
                        {experiences[selectedExperience].role}
                      </h3>
                      <p className="text-cyan-400 font-mono text-sm font-semibold">
                        {experiences[selectedExperience].company}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block bg-white/5 border border-white/5 text-slate-300 font-mono text-xs px-3 py-1 rounded-full">
                        {experiences[selectedExperience].period}
                      </span>
                      <p className="text-[11px] text-slate-500 font-mono mt-1">
                        1 Bulan Kontrak Kerja
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">LOKASI PENUGASAN</span>
                    <div className="flex items-center gap-2 text-slate-300 text-xs font-mono">
                      <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span>{experiences[selectedExperience].location}</span>
                    </div>
                  </div>

                  {/* Core tasks list */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">PENCAPAIAN DAN TUGAS UTAMA</span>
                    <ul className="space-y-3">
                      {experiences[selectedExperience].responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-xs sm:text-sm">
                          <span className="h-5 w-5 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 text-xs font-mono font-bold shrink-0 mt-0.5">
                            {i+1}
                          </span>
                          <span className="leading-relaxed">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cyber Warehouse Simulation Graphic (A truly canggih touch showing his exact CV domain!) */}
                <div className="lg:col-span-5 bg-slate-950/80 rounded-3xl p-6 border border-white/5 space-y-4 font-mono">
                  <div className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                    <span className="text-slate-400 flex items-center gap-2">
                      <Terminal className="h-4 w-4 text-emerald-400" />
                      Sistem Logistik Dev Simulation
                    </span>
                    <span className="text-[10px] text-cyan-400">ACTIVE: SIM_V01</span>
                  </div>

                  {selectedExperience === 0 ? (
                    /* PT Imani Sehat (Distribution Center) Visual simulation */
                    <div className="space-y-4 text-xs">
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Simulasi operasional Distribusi Logistik PT Misi Sehat Imani . Mengelola rantai pasokan dari pusat penyimpanan (packing) ke toko cabang.
                      </p>

                      <div className="space-y-2 bg-slate-900/50 p-3 rounded-lg border border-white/5">
                        <div className="flex justify-between text-[11px] text-slate-500">
                          <span>KAPASITAS GUDANG DC</span>
                          <span className="text-emerald-400">92% SECURE</span>
                        </div>
                        <div className="w-full bg-slate-850 h-2 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>

                      {/* Log output simulated */}
                      <div className="bg-black/40 p-3 rounded-lg text-[10px] leading-relaxed space-y-1.5 text-slate-400 border border-white/5">
                        <div className="text-cyan-400">[SYSTEM] Menginisiasi proses audit stok barang...</div>
                        <div>[IMANI_SEHAT_DC] Memverifikasi data produk packing log.</div>
                        <div>[IMANI_SEHAT_DC] Menyimpan barang ke rak kode DC-G2-E9.</div>
                        <div className="text-emerald-400">[SUCCESS] Distribusi ke Club Sehat Jakarta Pusat sukses diantar.</div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span>Pekerja DC</span>
                        <span>ANDRE LUMBANTORUAN</span>
                      </div>
                    </div>
                  ) : (
                    /* Club Sehat (Karyawan Toko) Retail Visual simulation */
                    <div className="space-y-4 text-xs">
                      <p className="text-slate-400 text-[11px] leading-relaxed">
                        Visualisasi kasir, kontrol stok inventori rak, dan pelayanan pelanggan di unit retail Club Sehat Cideng Barat.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-center text-[11px]">
                        <div className="bg-slate-900/40 p-2 rounded border border-white/5">
                          <div className="text-slate-500">STOK RAK DISETEL</div>
                        </div>
                        <div className="bg-slate-900/40 p-2 rounded border border-white/5">
                          <div className="text-slate-500">INVENTORI COUNTER</div>
                          <div className="text-sm font-bold text-emerald-400 font-mono">Audited OK</div>
                        </div>
                      </div>

                      {/* Retail log simulation */}
                      <div className="bg-black/40 p-3 rounded-lg text-[10px] leading-relaxed space-y-1.5 text-slate-400 border border-white/5">
                        <div className="text-cyan-400">[SYSTEM_STORE] Kasir standby, visual rak teratur aman.</div>
                        <div>[RETAIL] Menerima barang transit kiriman dari DC PT Imani Sehat.</div>
                        <div>[RETAIL] Melakukan updating log stok dari barang diterima dari Distribution Center.</div>
                        <div className="text-emerald-400">[SERVICE] Aktif melayani pencarian barang pembeli.</div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-500">
                        <span>Pekerja Toko</span>
                        <span>ANDRE LUMBANTORUAN</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </section>

            {/* DETAILED SKILLS ACCORDION */}
            <section id="skills-section" className="space-y-8">
              <div className="space-y-1 border-b border-white/5 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  <Wrench className="h-3.5 w-3.5" />
                  Keahlian & Teknologi
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Skill categories side picker */}
                <div className="lg:col-span-4 space-y-2">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block mb-2 px-2">KATEGORI UTAMA</span>
                  {skills.map((sc, idx) => (
                    <button
                      key={sc.category}
                      id={`btn-skill-cat-${idx}`}
                      onClick={() => setSelectedSkillCategory(sc.category)}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between border ${
                        selectedSkillCategory === sc.category 
                          ? "bg-slate-900 border-cyan-500/30 text-white shadow-md shadow-cyan-900/5" 
                          : "bg-transparent border-transparent text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
                      }`}
                    >
                      <span className="text-xs sm:text-sm font-medium tracking-wide">{sc.category}</span>
                      <ChevronRight className={`h-4 w-4 transition-transform ${selectedSkillCategory === sc.category ? "text-cyan-400 translate-x-1" : "text-slate-650"}`} />
                    </button>
                  ))}
                </div>

                {/* Dedicated Grid showing selected skills status details */}
                <div className="lg:col-span-8 bg-cyber-card/60 card-gloss rounded-3xl p-6 sm:p-8 min-h-[300px] flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-3">
                      <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                        <Cpu className="h-4 w-4 text-cyan-400" />
                        Detail {selectedSkillCategory}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">S1 IT standard</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {skills.find(s => s.category === selectedSkillCategory)?.items.map((item, idx) => (
                        <div 
                          key={item} 
                          className="bg-slate-900/40 p-4 rounded-xl border border-white/5 hover:border-cyan-500/10 transition-colors flex items-center gap-3"
                        >
                          <div className="h-8 w-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                            {selectedSkillCategory === "Bahasa Pemrograman" && <CodeLine index={idx} />}
                            {selectedSkillCategory === "Full Stack Developer" && <Layers className="h-4 w-4" />}
                            {selectedSkillCategory === "Databases & Cloud" && <Database className="h-4 w-4" />}
                            {selectedSkillCategory === "Tools & Technologies" && <Wrench className="h-4 w-4" />}
                            {selectedSkillCategory === "Keahlian Lain (Soft Skills)" && <CheckCircle2 className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-semibold text-white">{item}</p>
                            <span className="text-[10px] font-mono text-slate-500 block text-emerald-400">Status: Teruji</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Adaptive footer banner based on active skills */}
                  <div className="bg-slate-950/60 p-4 rounded-xl border border-white/5 mt-6 flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] sm:text-xs text-slate-400 leading-relaxed">
                      {selectedSkillCategory === "Full Stack Developer" && "Menguasai arsitektur frontend components berbasis state yang modular dan diintegrasikan dengan database handal NeonDB melalui REST API/TypeScript robust."}
                      {selectedSkillCategory === "Bahasa Pemrograman" && "Menguasai C/C++ serta Python untuk dasar logika pengembangan algoritma, serta mendalami JavaScript untuk rekayasa web interaktif modern."}
                      {selectedSkillCategory === "Databases & Cloud" && "Mampu memanipulasi basis data relasional PostgreSQL menggunakan SQL standar dan memanfaatkannya pada platform Serverless NeonDB."}
                      {selectedSkillCategory === "Tools & Technologies" && "Menggunakan Git & GitHub untuk version control harian, VS Code sebagai IDE utama, serta Figma dalam melakukan layout design prototyping."}
                      {selectedSkillCategory === "Keahlian Lain (Soft Skills)" && "Memiliki komunikasi tim yang kuat, kedisiplinan kerja harian yang tinggi, serta hasrat besar di bidang teknologi Embedded IoT."}
                    </p>
                  </div>

                </div>

              </div>
            </section>

            {/* DIGITALLY AUTHENTICATED INTERNATIONAL CERTIFICATE VIEW */}
            <section id="certifications-section" className="space-y-8">
              <div className="space-y-1 border-b border-white/5 pb-4">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  <Award className="h-3.5 w-3.5" />
                  Kredensial Profesional Resmi
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                  Sertifikasi Internasional Resmi
                </h2>
              </div>

              {/* Graphical Re-creation of Pearson/Certiport HTML5 Specialist Certificate */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Info Text Column */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="text-emerald-400 text-xs font-mono font-bold tracking-widest uppercase block">VALIDATED & GRANTED</span>
                    <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                      {certificate.title}
                    </h3>
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed">
                    {certificate.description}
                  </p>

                  <div className="space-y-3 font-mono text-xs text-slate-300">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">PENERBIT RESMI:</span>
                      <span className="text-white font-semibold">Certiport (Pearson Business)</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">TANGGAL LAUNCH:</span>
                      <span className="text-white">March 29, 2026</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="text-slate-500">KODE KREDENSIAL:</span>
                      <span className="text-cyan-400 select-all font-bold">PU9X-uS7G</span>
                    </div>
                  </div>

                  <a 
                    id="btn-verify-cert"
                    href={certificate.verificationUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-cyber-dark font-display font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-cyan-500/10 hover:-translate-y-0.5"
                  >
                    <Globe className="h-4 w-4" />
                    Validasi Kredensial (Verify Certiport)
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>

                {/* Certificate Image */}
                <div className="lg:col-span-7">
                  <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full rounded-2xl border-2 border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  />
                </div>

              </div>
            </section>

{/* PROJECTS CORNER */}
<section id="projects-section" className="space-y-6">
  <div className="space-y-1 border-b border-white/5 pb-4">
    <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
      <Globe className="h-3.5 w-3.5" />
      Karya Pilihan
    </div>

    <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
      Proyek Unggulan Akademis & Eksplorasi
    </h2>
  </div>

  <div className="flex justify-center">
    <div className="w-full max-w-3xl">
      {projects.map((proj, idx) => (
        <article
          key={proj.title}
          id={`project-card-${idx}`}
          className="bg-cyber-card/60 card-gloss rounded-2xl sm:rounded-3xl border border-white/5 p-5 sm:p-6 md:p-7"
        >
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[10px] sm:text-xs font-mono font-semibold text-cyan-400">
                {proj.role}
              </span>

              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-500">
                PROYEK #{idx + 1}
              </span>
            </div>

            <div className="space-y-3">
              <h3 className="text-xl sm:text-2xl font-display font-extrabold leading-tight text-white">
                {proj.title}
              </h3>

              <p className="max-w-2xl text-sm leading-relaxed text-slate-400">
                {proj.description}
              </p>
            </div>

            <div className="space-y-2">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-slate-500">
                Dipelajari & Diaplikasikan
              </span>

              <ul className="space-y-2">
                {proj.features.map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-slate-300"
                  >
                    <span className="mt-[2px] shrink-0 text-emerald-400 font-bold">
                      ✓
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
              {proj.tech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/5 bg-slate-900 px-3 py-1.5 text-[10px] font-mono text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {proj.links && proj.links.length > 0 && (
              <div className="flex flex-wrap gap-2 border-t border-white/5 pt-4">
                {proj.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-500/10 px-4 py-2 text-xs font-mono font-bold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:text-white"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  </div>
</section>

            {/* DETAILED EDUCATION */}
            <section id="education-section" className="bg-cyber-card/30 border border-white/5 rounded-3xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                <div className="md:col-span-4 space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 uppercase tracking-widest">
                    <GraduationCap className="h-4 w-4" />
                    Pendidikan
                  </div>
                  <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white">
                    Universitas Advent Indonesia S1
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Sedang menempuh jenjang sarjana program studi Informatika dengan fokus rekayasa sistem terdistribusi & pemrograman web.
                  </p>
                </div>

                <div className="md:col-span-8 bg-slate-950/60 p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/5 pb-3">
                    <div>
                      <h4 className="text-base font-bold text-white font-display">
                        {education.degree}
                      </h4>
                      <p className="text-xs text-cyan-400 font-mono">{education.major}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2.5 py-1 rounded-full">
                        IPK: {education.gpa}
                      </span>
                      <p className="text-[10px] text-slate-500 font-mono mt-1">{education.period}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider block">MATA KULIAH RELEVAN</span>
                    <div className="flex flex-wrap gap-2">
                      {education.coursework.map(course => (
                        <span 
                          key={course}
                          className="text-xs bg-slate-900 border border-white/5 font-mono text-slate-300 px-3 py-1.5 rounded-lg"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </motion.main>
        ) : activeTab === "game" ? (
          <ChessGameView onBackToPortfolio={() => setActiveTab("portfolio")} />
        ) : (
          /* EMBEDDED IMMACULATE CORPORATE CV PRINT DESIGN */
          <motion.main
            key="print-view"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex-grow max-w-4xl mx-auto px-3 sm:px-4 py-6 sm:py-10 w-full max-w-full overflow-x-hidden"
          >
            {/* Top Toolbar panel */}
            <div className="mb-6 bg-slate-900/80 border border-white/5 p-3 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-full overflow-hidden">
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5 font-display">
                  <Printer className="h-4 w-4 text-emerald-400" />
                  Mode Layout Pembuka Resume & Cetak
                </h3>
                <p className="text-xs text-slate-400">
                  Halaman ini dirancang khusus menyerupai lembar fisik CV resmi. Kamu bisa mencetak langsung atau mengunduh file CV dalam format PDF.
                </p>
              </div>
              <div className="grid grid-cols-1 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap items-stretch sm:items-center gap-3 w-full sm:w-auto self-start sm:self-auto">
                <a
                  id="btn-download-cv-pdf"
                  href="/assets/cv-andre-lumbantoruan.pdf"
                  download="CV-Andre-Lumbantoruan.pdf"
                  className="bg-emerald-500 hover:bg-emerald-400 text-cyber-dark font-display font-black text-xs px-4 sm:px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 min-w-0"
                >
                  <Download className="h-4 w-4" />
                  Download CV PDF
                </a>
                <button 
                  id="btn-trigger-print"
                  onClick={() => window.print()}
                  className="bg-cyan-500 hover:bg-cyan-400 text-cyber-dark font-display font-black text-xs px-4 sm:px-5 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 min-w-0"
                >
                  <Printer className="h-4 w-4" />
                  Cetak CV
                </button>
              </div>
            </div>

            {/* IMMACULATE PHYSICALLY STYLE RENDERED CV */}
            <div id="physical-cv" className="bg-white text-slate-950 p-4 sm:p-8 md:p-10 rounded-none shadow-none border-none flex flex-col justify-between w-full max-w-full overflow-hidden print:p-0 print:border-none print:shadow-none print:bg-white print:text-black">
              
              {/* Header Box CV - Improved Layout */}
              <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-8 border-b-2 border-slate-300 pb-6 sm:pb-8 mb-6 sm:mb-8">
                {/* Photo - Larger and More Professional */}
                <div className="h-32 w-28 sm:h-40 sm:w-32 bg-slate-100 border border-slate-400 flex-shrink-0 overflow-hidden rounded-sm shadow-md">
                  <img 
                    src={biography.profilePhoto} 
                    alt={biography.name}
                    className="w-full h-full object-cover object-[center_18%] scale-105"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
                
                <div className="space-y-3 flex-grow min-w-0 w-full">
                  <div>
                    <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 font-display tracking-normal leading-tight break-words">
                      {biography.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold tracking-wide text-slate-700 uppercase mt-1 leading-relaxed">
                      {biography.title}
                    </p>
                  </div>

                  {/* Contact Info - Clean Layout */}
                  <div className="space-y-1 text-[11px] sm:text-xs font-mono text-slate-800 break-all sm:break-normal">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-slate-600" />
                      {biography.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-600" />
                      {biography.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-slate-600" />
                      {biography.email}
                    </div>
                  </div>
                  <div className="text-[11px] text-slate-700 font-medium flex flex-col gap-1 border-t border-slate-300 pt-2">
                    <a href={biography.github} target="_blank" className="hover:text-blue-700 break-all">GitHub: {biography.github}</a>
                    <a href={biography.portfolio} target="_blank" className="hover:text-blue-700 break-all">Portfolio: {biography.portfolio}</a>
                  </div>
                </div>
              </div>

              {/* Ringkasan Summary */}
              <div className="py-6 border-b border-slate-300 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-slate-900 pl-3">
                  Ringkasan Resume
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-900 leading-relaxed text-left sm:text-justify ml-0 sm:ml-3">
                  {biography.summary}
                </p>
              </div>

              {/* Pengalaman Kerja */}
              <div className="py-6 border-b border-slate-300 space-y-5">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-slate-900 pl-3">
                  Pengalaman Kerja
                </h4>

                {experiences.map(exp => (
                  <div key={exp.company} className="space-y-1.5 ml-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="text-xs font-bold text-slate-900">
                        {exp.role}
                      </div>
                      <div className="text-xs text-slate-700 font-mono">{exp.period}</div>
                    </div>
                    <div className="text-xs text-slate-800 font-medium">{exp.company}</div>
                    <p className="text-[10px] text-slate-700 italic">{exp.location}</p>
                    <ul className="list-disc pl-5 space-y-0.5 text-slate-900 text-xs">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx} className="leading-relaxed list-item">{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Keahlian & Tech Stack */}
              <div className="py-6 border-b border-slate-300 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-slate-900 pl-3 mb-3">
                    Keahlian Teknis
                  </h4>
                  <div className="space-y-2.5 text-xs ml-3">
                    {skills.slice(0, 3).map(sk => (
                      <div key={sk.category} className="space-y-1">
                        <span className="text-[10px] text-slate-700 font-bold uppercase block">{sk.category}</span>
                        <p className="text-slate-900 leading-normal text-[11px]">{sk.items.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-slate-900 pl-3 mb-3">
                    Tools & Soft Skills
                  </h4>
                  <div className="space-y-2.5 text-xs ml-3">
                    {skills.slice(3).map(sk => (
                      <div key={sk.category} className="space-y-1">
                        <span className="text-[10px] text-slate-700 font-bold uppercase block">{sk.category}</span>
                        <p className="text-slate-900 leading-normal text-[11px]">{sk.items.join(", ")}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Education & Certification Dual Row */}
              <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Education */}
                <div className="space-y-2 ml-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-slate-900 -ml-3 pl-3">
                    Pendidikan
                  </h4>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">{education.degree}</p>
                    <p className="text-slate-800">{education.major}</p>
                    <p className="text-slate-700">{education.institution}</p>
                    <p className="text-slate-700 font-mono text-[10px] pt-1">{education.period} • IPK: {education.gpa}</p>
                  </div>
                </div>

                {/* Certification */}
                <div className="space-y-2 ml-3">
                  <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-slate-900 -ml-3 pl-3">
                    Sertifikasi
                  </h4>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-900">{certificate.title}</p>
                    <p className="text-slate-700">{certificate.issuer}</p>
                    <p className="text-slate-700 font-mono text-[10px]">Lulus: {certificate.issueDate}</p>
                    <p className="text-slate-600 font-mono text-[10px]">ID: {certificate.credentialId}</p>
                  </div>
                </div>
              </div>

              {/* Bottom footer stamp */}
              <div className="text-center pt-6 mt-6 border-t border-slate-300 text-[10px] text-slate-600 font-mono">
                CV - Andre Lumbantoruan - {new Date().getFullYear()}
              </div>

            </div>
          </motion.main>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="mt-auto border-t border-white/5 bg-slate-950 py-8 w-full max-w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-slate-400 text-xs w-full max-w-full overflow-hidden">
          <div>
            <p className="font-semibold text-white">&copy; {new Date().getFullYear()} {biography.name}. All Rights Reservasi.</p>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">S1 Informatika, Universitas Advent Indonesia</p>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-6 font-mono max-w-full min-w-0">
            <a href={`mailto:${biography.email}`} className="hover:text-cyan-400 select-all transition-colors break-all max-w-full">{biography.email}</a>
            <a href={biography.github} target="_blank" referrerPolicy="no-referrer" className="hover:text-cyan-400 transition-colors">GitHub</a>
            <a href="https://verify.certiport.com" target="_blank" className="hover:text-cyan-400 transition-colors">Pearson Verify</a>
          </div>
        </div>
      </footer>

      {/* FLOATING ANDRE-INTERACTIVE CHAT BOT */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        
        {/* Chat Toggle Button */}
        <button
          id="btn-chatbot-bubble"
          onClick={() => setChatOpen(!chatOpen)}
          className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer ${
            chatOpen 
              ? "bg-slate-900 border border-white/10 text-cyan-400 hover:text-cyan-300 rotate-90" 
              : "bg-gradient-to-tr from-cyan-400 to-emerald-400 text-cyber-dark hover:scale-110"
          }`}
        >
          {chatOpen ? <X className="h-6 w-6" /> : <Terminal className="h-6 w-6" />}
        </button>

        {/* Chat window panel */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              id="chatbot-window"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-[calc(100vw-2rem)] sm:w-[400px] h-[min(520px,calc(100vh-7rem))] bg-slate-950 border border-cyan-500/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
            >
              {/* Top chat header info */}
              <div className="bg-slate-900 p-4 border-b border-cyan-900/40 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <div>
                    <h4 className="text-xs font-bold text-white font-mono">ANDRE INTERACTIVE ASSISTANT</h4>
                    <span className="text-[10px] text-slate-500 font-mono">Sistem Tanya-Jawab Karir</span>
                  </div>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-slate-400 hover:text-white">
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Messages viewport */}
              <div className="flex-grow p-4 overflow-y-auto space-y-4">
                {messages.map((m, idx) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col max-w-[85%] ${m.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}
                  >
                    <div 
                      className={`p-3 rounded-2xl text-xs leading-relaxed ${
                        m.sender === "user" 
                          ? "bg-cyan-500 text-cyber-dark font-medium rounded-tr-none" 
                          : "bg-slate-900 text-slate-300 rounded-tl-none border border-white/5"
                      }`}
                    >
                      {/* Standard rendering formatting to handle custom **bolding** marker elements from data */}
                      <p className="whitespace-pre-line">
                        {m.text.split("**").map((chunk, i) => i % 2 !== 0 ? <strong key={i} className="text-white font-extrabold">{chunk}</strong> : chunk)}
                      </p>
                    </div>
                    <span className="text-[9px] text-slate-550 font-mono mt-1 px-1">{m.time}</span>
                  </div>
                ))}
                
                <div ref={chatEndRef}></div>
              </div>

              {/* Chat fast prompts selections */}
              <div className="p-2 bg-slate-900/60 border-t border-white/5 flex flex-wrap gap-1 items-center max-h-32 overflow-y-auto">
                {chatPresets.map(preset => (
                  <button
                    key={preset.label}
                    onClick={() => handleSendMessage(preset.query)}
                    className="text-[9px] font-mono bg-slate-900 hover:bg-cyan-500/10 text-cyan-400 border border-cyan-500/15 rounded-md px-2 py-1 transition-colors block text-left"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Bottom messaging control form inputs */}
              <form 
                id="chatbot-form"
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                className="p-3 bg-slate-900 border-t border-white/5 flex gap-2 shrink-0"
              >
                <input
                  id="chatbot-input"
                  type="text"
                  placeholder="Ketik pertanyaan tentang Andre..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-grow min-w-0 bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-cyan-400 text-white font-mono"
                />
                <button
                  id="chatbot-submit"
                  type="submit"
                  className="bg-cyan-500 text-cyber-dark p-2 rounded-xl hover:bg-cyan-400 transition-colors"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

// Inline component to render beautiful mini code bars for tech stack
function CodeLine({ index }: { index: number }) {
  return (
    <span className="text-[10px] font-mono font-bold text-cyan-400">
      {index === 0 && "JS"}
      {index === 1 && "5"}
      {index === 2 && "Py"}
      {index === 3 && "C++"}
    </span>
  );
}
