
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Workflow,
  MapPin,
  Flag,
  FileSearch,
  Check,
  Wifi,
  Gamepad2,
  Mail,
  Loader2,
  X,
  MessageSquare,
  Globe,
  Terminal,
  Activity,
  Cpu,
  Database,
  Layers,
  Search,
  Zap,
  Lock,
  Box,
  User,
  ExternalLink,
  Code
} from 'lucide-react';
import { SERVICES, GOV_FORMS, getIcon, Logo } from './constants';
import AIChat from './components/AIChat';
import FormAssistant from './components/FormAssistant';
import WifiTopupAssistant from './components/WifiTopupAssistant';
import GameTopupAssistant from './components/GameTopupAssistant';

const HUDOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[100] border-[20px] border-transparent">
    <div className="absolute top-0 left-0 w-32 h-32 border-t-[1px] border-l-[1px] border-white/10 opacity-30" />
    <div className="absolute top-0 right-0 w-32 h-32 border-t-[1px] border-r-[1px] border-white/10 opacity-30" />
    <div className="absolute bottom-0 left-0 w-32 h-32 border-b-[1px] border-l-[1px] border-white/10 opacity-30" />
    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-[1px] border-r-[1px] border-white/10 opacity-30" />
    
    <div className="absolute top-1/2 -left-2 w-1.5 h-64 bg-white/5 -translate-y-1/2 blur-[2px]" />
    <div className="absolute top-1/2 -right-2 w-1.5 h-64 bg-white/5 -translate-y-1/2 blur-[2px]" />
  </div>
);

const FloatingDataPoint = ({ delay, top, left, label, value }: { delay: number, top: string, left: string, label: string, value: string }) => (
  <div 
    className="absolute hidden 2xl:flex flex-col gap-1 glass-card p-3 rounded-lg border-blue-500/20 animate-float pointer-events-none"
    style={{ top, left, animationDelay: `${delay}s` }}
  >
    <span className="text-[7px] font-black uppercase text-blue-400 tracking-widest">{label}</span>
    <span className="text-[10px] font-bold text-white font-mono">{value}</span>
  </div>
);

const SystemStatus = () => (
  <div className="fixed top-28 left-10 z-[40] hidden xl:flex flex-col gap-5">
    <div className="glass-card rounded-2xl p-4 flex items-center gap-4 border-l-4 border-l-emerald-500 group transition-all hover:bg-white/5">
      <div className="relative">
        <Activity className="w-5 h-5 text-emerald-500" />
        <div className="absolute inset-0 bg-emerald-500 blur-lg opacity-20" />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase text-slate-500 tracking-[0.2em]">Live Status</span>
        <span className="text-[11px] font-bold text-white tracking-widest">ENCRYPTED CORE</span>
      </div>
    </div>
    <div className="glass-card rounded-2xl p-4 flex items-center gap-4 border-l-4 border-l-blue-500 group transition-all hover:bg-white/5">
      <div className="relative">
        <Cpu className="w-5 h-5 text-blue-500" />
        <div className="absolute inset-0 bg-blue-500 blur-lg opacity-20" />
      </div>
      <div className="flex flex-col">
        <span className="text-[8px] font-black uppercase text-slate-500 tracking-[0.2em]">Node Uplink</span>
        <span className="text-[11px] font-bold text-white tracking-widest">KTM_DC_102</span>
      </div>
    </div>
  </div>
);

const ConsultationModal = ({ onClose }: { onClose: () => void }) => {
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-lg glass-card rounded-[3rem] p-12 shadow-2xl animate-in zoom-in duration-300 border-white/10">
        <button onClick={onClose} className="absolute top-10 right-10 text-slate-500 hover:text-white transition-all hover:rotate-90"><X /></button>
        
        {isSent ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-blue-500/10 text-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-10 border border-blue-500/20 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="font-heading text-4xl font-black mb-4 tracking-tighter uppercase">PROTOCOL SYNCED</h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-10">Strategic handshake complete. Our domestic engineers are analyzing your requirements node.</p>
            <button onClick={onClose} className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] hover:bg-slate-200 transition-all">Terminate Uplink</button>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Terminal className="w-6 h-6 text-blue-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">System.Consult</span>
                <h3 className="font-heading text-2xl font-bold tracking-tighter uppercase">Protocol Initiation</h3>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-black text-slate-600 tracking-[0.3em]">Subject Entity</label>
                <div className="relative">
                   <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500"><Box className="w-4 h-4" /></div>
                   <input required className="w-full bg-white/5 border border-white/10 rounded-2xl pl-14 pr-6 py-4.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-800" placeholder="Organization / Full Name" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-black text-slate-600 tracking-[0.3em]">Project Vector</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4.5 text-sm focus:border-blue-500 outline-none appearance-none cursor-pointer">
                  <option className="bg-black">Full-Stack Web Orchestration</option>
                  <option className="bg-black">National E-Governance Uplink</option>
                  <option className="bg-black">Fintech Integration Protocol</option>
                  <option className="bg-black">Enterprise Automation Node</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] uppercase font-black text-slate-600 tracking-[0.3em]">Comm-Link Channel</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4.5 text-sm focus:border-blue-500 outline-none transition-all placeholder:text-slate-800" placeholder="Secure Phone / Matrix Email" />
              </div>
              <button 
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/30 active:scale-95 mt-6"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Activity className="w-4 h-4" /> Initialize Secure Sync</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedForm, setSelectedForm] = useState<typeof GOV_FORMS[0] | null>(null);
  const [isWifiModalOpen, setIsWifiModalOpen] = useState(false);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled((window as any).scrollY > 20);
    (window as any).addEventListener('scroll', handleScroll);
    return () => (window as any).removeEventListener('scroll', handleScroll);
  }, []);

  const handleServiceAction = (serviceId: string) => {
    if (serviceId === 'wifi-topup') setIsWifiModalOpen(true);
    else if (serviceId === 'game-topup') setIsGameModalOpen(true);
    else setIsConsultOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#03040a] text-white font-sans selection:bg-blue-500/40 overflow-x-hidden">
      <HUDOverlay />
      <SystemStatus />
      
      {/* Cinematic Backgrounds */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0" />
      <div className="orb top-[-20%] left-[-10%] opacity-30" />
      <div className="orb bottom-[-20%] right-[-10%] opacity-30 !bg-purple-600" />
      <div className="orb top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 !bg-white" />

      {/* Navigation: The Floating Node */}
      <nav className={`fixed w-full z-[110] transition-all duration-700 ${scrolled ? 'top-4 px-4' : 'top-0'}`}>
        <div className={`max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between transition-all duration-500 ${scrolled ? 'glass-card py-4 rounded-[2rem] border-white/20' : 'bg-transparent py-8 border-transparent'}`}>
          <div className="flex items-center gap-3 md:gap-4 cursor-pointer group shrink-0" onClick={() => (window as any).scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="relative shrink-0">
              <Logo className="w-9 h-9 md:w-11 md:h-11 text-blue-500 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-base md:text-lg lg:text-xl tracking-tighter uppercase leading-tight whitespace-nowrap">
                SAJILO <span className="text-blue-500">PROJECT HUB</span>
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[7px] md:text-[8px] text-emerald-500 font-black uppercase tracking-[0.3em] opacity-80">Sync_Active</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center gap-8 xl:gap-12 ml-4">
            {['Services', 'Gov-Forms', 'Methodology'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-[9px] xl:text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.3em] hover:tracking-[0.4em] relative group whitespace-nowrap">
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-blue-500 group-hover:w-full transition-all" />
              </a>
            ))}
            <button 
              onClick={() => setIsConsultOpen(true)}
              className="relative group overflow-hidden bg-white text-black px-6 xl:px-8 py-3 rounded-xl text-[9px] xl:text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:pr-10 shadow-[0_0_20px_rgba(255,255,255,0.15)] shrink-0"
            >
              <span className="relative z-10 flex items-center gap-2">INITIALIZE <ChevronRight className="w-3 h-3" /></span>
              <div className="absolute inset-0 bg-blue-500 translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
            </button>
          </div>

          <div className="lg:hidden p-2 glass-card rounded-xl">
            <Layers className="w-5 h-5 text-slate-400" />
          </div>
        </div>
      </nav>

      {/* Hero: Holographic Command Center */}
      <header className="relative pt-80 pb-64 px-10 overflow-hidden">
        {/* Decorative HUD Elements */}
        <FloatingDataPoint top="25%" left="5%" delay={0} label="Core_Processing" value="98.2 Teraflops" />
        <FloatingDataPoint top="40%" left="80%" delay={2} label="Network_Security" value="AES-256 Quantum" />
        <FloatingDataPoint top="70%" left="15%" delay={1} label="Sovereign_Data" value="Distributed Node" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-10">
          <div className="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-16 animate-in fade-in slide-in-from-top-12 duration-1000 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <ShieldCheck className="w-4 h-4 text-blue-500" /> Nepal's Digital Sovereign Node v4.0
          </div>
          
          <h1 className="font-heading text-6xl sm:text-7xl md:text-8xl lg:text-[11rem] font-black tracking-tighter mb-14 leading-[0.85] animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 glow-text perspective-1000">
            DIGITAL <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-white to-blue-500 animate-gradient-x uppercase">SOVEREIGN.</span>
          </h1>
          
          <p className="text-lg md:text-2xl lg:text-3xl text-slate-500 max-w-4xl mb-20 leading-relaxed font-light animate-in fade-in duration-1000 delay-500 tracking-tight">
            Streamlining national operations with high-performance orchestration. Bridging the gap between legacy governance and the future digital economy.
          </p>

          <div className="flex flex-wrap justify-center gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-700">
            <button 
              onClick={() => document.getElementById('gov-forms')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.5em] transition-all hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.2)]"
            >
              LAUNCH INTERFACE
              <div className="absolute -inset-2 border-[1px] border-white/10 rounded-[2.5rem] -z-10 group-hover:scale-105 transition-transform" />
            </button>
            <button 
              onClick={() => setIsConsultOpen(true)}
              className="glass-card border-white/10 px-12 md:px-16 py-5 md:py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.5em] hover:bg-white/10 transition-all flex items-center gap-4 hover:border-blue-500/50"
            >
              ACCESS SPECS <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-48 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl animate-in fade-in zoom-in duration-1000 delay-1000">
            {[
              { icon: <Wifi />, label: "NET_SYNAPSE", detail: "ISP Core Uplink", action: () => setIsWifiModalOpen(true), color: "text-emerald-500" },
              { icon: <Gamepad2 />, label: "NEO_GAME", detail: "Direct Re-Currency", action: () => setIsGameModalOpen(true), color: "text-purple-500" },
              { icon: <Globe />, label: "GOV_VORTEX", detail: "E-Admin Node", action: () => document.getElementById('gov-forms')?.scrollIntoView({ behavior: 'smooth' }), color: "text-blue-500" },
              { icon: <Search />, label: "VALIDATOR", detail: "KYC/AML Check", action: () => {}, color: "text-white" }
            ].map((node, i) => (
              <button 
                key={i} 
                onClick={node.action}
                className="glass-card rounded-[3rem] p-10 flex flex-col items-center text-center gap-6 border-white/5 hover:border-white/20 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:translate-y-[-12px] transition-transform" />
                
                <div className={`w-16 h-16 rounded-3xl bg-white/5 flex items-center justify-center ${node.color} group-hover:scale-110 transition-all border border-white/10 group-hover:bg-white/10`}>
                  {node.icon}
                </div>
                <div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-white mb-2">{node.label}</h4>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{node.detail}</p>
                </div>
                <div className="w-10 h-[1px] bg-white/10 group-hover:w-full transition-all" />
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Gov Forms: System Matrix */}
      <section id="gov-forms" className="py-64 px-10 relative bg-[#010105]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-16">
            <div className="max-w-3xl">
              <div className="flex items-center gap-5 text-blue-500 mb-10">
                <div className="w-12 h-[1px] bg-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-[0.5em]">System Uplink 02</span>
              </div>
              <h2 className="font-heading text-5xl md:text-9xl font-black mb-10 tracking-tighter uppercase leading-none">ADMIN <br /> MATRIX.</h2>
              <p className="text-slate-500 text-xl leading-relaxed max-w-2xl font-light">Direct neural-ready validation for all major national administration document protocols. Eliminating bureaucratic latency.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {GOV_FORMS.map((form) => (
              <div key={form.id} className="glass-card group p-12 rounded-[4rem] border-white/5 hover:border-blue-500/40 transition-all flex flex-col h-full relative overflow-hidden">
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-white/10 rounded-full group-hover:scale-150 transition-transform opacity-20" />
                
                <div className="w-16 h-16 rounded-[2rem] mb-12 flex items-center justify-center bg-blue-500/10 text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all">
                  {getIcon(form.icon, "w-8 h-8")}
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold mb-6 tracking-tighter uppercase leading-none">{form.title}</h3>
                <p className="text-slate-600 text-sm sm:text-base mb-12 flex-grow leading-relaxed font-light">{form.description}</p>
                
                <div className="space-y-4 mb-16 bg-black/40 p-8 rounded-[2.5rem] border border-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-700 uppercase font-black tracking-[0.3em]">Validation Stack</span>
                    <Lock className="w-3 h-3 text-slate-800" />
                  </div>
                  {form.docs.slice(0, 3).map((doc, i) => (
                    <div key={i} className="flex items-center gap-4 text-xs text-slate-400 font-bold uppercase tracking-tight">
                      <div className="w-2 h-2 rounded-full border border-blue-500/30 group-hover:bg-blue-500/50 transition-all" /> {doc}
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setSelectedForm(form)}
                  className="w-full bg-white text-black py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
                >
                  START PROTOCOL
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services: Capability Deck */}
      <section id="services" className="py-64 px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-40">
             <div className="flex justify-center mb-8">
               <div className="px-6 py-2 rounded-full border border-white/10 bg-white/5 text-[9px] font-black uppercase tracking-[0.5em] text-slate-500">Core_Systems</div>
             </div>
            <h2 className="font-heading text-5xl md:text-[10rem] font-black mb-12 tracking-tighter uppercase leading-none">CAPABILITIES</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-xl font-light tracking-wide">Architecting the resilient digital hardware and software of the new domestic sovereign cloud.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {SERVICES.map((service) => (
              <div key={service.id} className="glass-card group p-14 rounded-[4.5rem] border-white/5 hover:border-white/20 transition-all text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Layers className="w-16 h-16 text-white" />
                </div>
                
                <div className="w-20 h-20 rounded-[2.5rem] mb-12 flex items-center justify-center bg-white/5 text-slate-600 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all border border-white/10 group-hover:scale-110">
                  {getIcon(service.icon, "w-10 h-10")}
                </div>
                <h3 className="font-heading text-3xl sm:text-4xl font-bold mb-8 tracking-tighter uppercase leading-none">{service.title}</h3>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed mb-16 font-light">{service.description}</p>
                <button 
                  onClick={() => handleServiceAction(service.id)}
                  className="flex items-center gap-4 text-[11px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.4em] group-hover:gap-6"
                >
                  {(service.id === 'wifi-topup' || service.id === 'game-topup') ? 'ACCESS MODULE' : 'SYSTEM SPECS'} <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer: Node Terminus */}
      <footer className="bg-[#010103] py-48 px-6 sm:px-10 border-t border-white/5 relative overflow-hidden">
        {/* Glow Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24 mb-32 relative z-10">
            {/* Brand Column */}
            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-4 group">
                <div className="relative shrink-0">
                  <Logo className="w-10 h-10 text-blue-500 group-hover:rotate-[180deg] transition-all duration-700" />
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20" />
                </div>
                <span className="font-heading font-black text-xl md:text-2xl uppercase tracking-tighter whitespace-nowrap">
                  SAJILO <span className="text-blue-500">PROJECT HUB</span>
                </span>
              </div>
              
              <p className="text-slate-500 text-sm leading-relaxed font-light">
                Architecting high-performance digital infrastructure for national sovereignity and domestic enterprise scaling.
              </p>

              {/* Status & Credits Signature */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10 w-fit">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-400">System_Core_Stable</span>
                </div>
                
                {/* Designer Signature - Professional & Styled */}
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-blue-500/5 border border-blue-500/10 w-fit hover:border-blue-500/30 transition-all cursor-default group/sig">
                   <div className="p-1 rounded-md bg-blue-500/10 text-blue-400 group-hover/sig:scale-110 transition-transform">
                     <Code className="w-3 h-3" />
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[7px] font-black uppercase tracking-[0.2em] text-slate-500">Lead Systems Engineer</span>
                     <span className="text-[10px] font-bold text-white tracking-wide">Nipesh Basnet</span>
                   </div>
                </div>
              </div>
            </div>

            {/* Modules Column */}
            <div className="flex flex-col">
              <h5 className="font-black text-blue-500 mb-10 uppercase text-[10px] tracking-[0.4em]">Node Modules</h5>
              <ul className="space-y-6">
                {[
                  { label: "Web_Orchestration", icon: <Terminal className="w-3.5 h-3.5" /> },
                  { label: "Gov_Protocol_Uplink", icon: <Globe className="w-3.5 h-3.5" /> },
                  { label: "FinTech_Gateways", icon: <Zap className="w-3.5 h-3.5" /> },
                  { label: "ISP_Automation", icon: <Wifi className="w-3.5 h-3.5" /> }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider hover:text-white transition-colors cursor-pointer group">
                    <span className="opacity-20 group-hover:opacity-100 group-hover:text-blue-500 transition-all">{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* Secure Ops Column */}
            <div className="flex flex-col">
              <h5 className="font-black text-blue-500 mb-10 uppercase text-[10px] tracking-[0.4em]">Secure Terminus</h5>
              <p className="text-slate-500 text-[10px] mb-8 uppercase font-bold tracking-[0.2em] leading-loose">
                Kathmandu Central Command<br />
                secure-ops@sajilohub.xyz<br />
                +977-9707340249
              </p>
              <div className="flex gap-4">
                <button className="glass-card w-11 h-11 rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-all border-white/5 group">
                  <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
                <button className="glass-card w-11 h-11 rounded-xl flex items-center justify-center hover:bg-white hover:text-black transition-all border-white/5 group">
                  <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>

            {/* Health Column */}
            <div className="flex flex-col">
              <h5 className="font-black text-blue-500 mb-10 uppercase text-[10px] tracking-[0.4em]">Network Health</h5>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Node_Uptime</span>
                  <span className="text-[10px] font-bold text-emerald-400">99.98%</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Security_Level</span>
                  <span className="text-[10px] font-bold text-blue-400">MIL-SPEC</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                  <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Regional_Sync</span>
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Verified</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Copyright Area */}
          <div className="pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-8 text-slate-700">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
               <p className="text-[9px] uppercase tracking-[0.5em] font-black opacity-30 text-center lg:text-left">
                 © 2025 SAJILO PROJECT HUB | NATIONAL SECURITY TIER ENGINEERING
               </p>
               <div className="h-4 w-[1px] bg-white/5 hidden lg:block" />
               <div className="flex gap-8 text-[8px] font-black uppercase tracking-[0.3em]">
                 <span className="text-slate-800">BUILD: v4.2.0-STABLE</span>
                 <span className="text-slate-800">LOC: 27.7172° N, 85.3240° E</span>
               </div>
            </div>
            
            <div className="flex gap-10 text-[9px] font-black uppercase tracking-[0.4em]">
              <a href="#" className="hover:text-blue-500 transition-colors opacity-40 hover:opacity-100">SECURITY_MANIFESTO</a>
              <a href="#" className="hover:text-blue-500 transition-colors opacity-40 hover:opacity-100">SYSTEM_LOGS</a>
              <a href="#" className="hover:text-blue-500 transition-colors opacity-40 hover:opacity-100">PRIVACY_CORE</a>
            </div>
          </div>
        </div>
      </footer>

      <AIChat />
      
      {selectedForm && (
        <FormAssistant 
          form={selectedForm} 
          onClose={() => setSelectedForm(null)} 
        />
      )}
      
      {isWifiModalOpen && (
        <WifiTopupAssistant onClose={() => setIsWifiModalOpen(false)} />
      )}
      
      {isGameModalOpen && (
        <GameTopupAssistant onClose={() => setIsGameModalOpen(false)} />
      )}

      {isConsultOpen && (
        <ConsultationModal onClose={() => setIsConsultOpen(false)} />
      )}
    </div>
  );
};

export default App;
