import { useState, useEffect, useRef } from "react";

// ============================================================
// ✏️  ZONA EDITABLE — cambia fotos, videos y enlaces aquí
// ============================================================
const CONFIG = {
  logo: "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664055-5cd67670/png_logo_adolescentes_show.png",

  // Foto de fondo del hero (la más grande)
  heroBg: "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664051-1080c528/grupal_3.png",

  // Fotos de la galería (puedes agregar o quitar)
  gallery: [
    "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664053-dcb97640/grupal_1.png",
    "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664060-283efecf/grupal_2.png",
    "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664081-2306d357/grupal_4.png",
    "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664053-a6664ecf/arte_de_regalo_2.jpg",
    "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664085-bf72d19b/arte_de_regalo_1.jpg",
  ],

  // Foto de la sección "Sobre Nosotros"
  aboutPhoto: "https://cdn.agentui.ai/cmm7ztk972i4xs41l016lrpp0/1772879664081-2306d357/grupal_4.png",

  // Videos de YouTube (solo el ID del video)
  videos: [
    { id: "VJ3HBPSVgnw", title: "Adolescentes Show - En Vivo" },
    { id: "qSkkBnmAbEY", title: "Adolescentes Show - Mix Cumbia" },
  ],

  // Redes sociales y contacto
  whatsapp: "https://wa.me/59171014850",
  whatsappText: "Hola!%20Quiero%20reservar%20al%20Grupo%20Adolescentes%20Show%20🎶",
  tiktok: "https://www.tiktok.com/@adolescentesshow",
  instagram: "https://www.instagram.com/adolescentes_show",
  facebook: "https://www.facebook.com/share/1DTnTdnM8X",
  spotify: "https://open.spotify.com/artist/4GO5BCr8a4vFcFK6lCZ7rb",
  youtube: "https://www.youtube.com/@adolescentesshow",
};
// ============================================================

export default function Home() {
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryFade, setGalleryFade] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: "", date: "", time: "", venue: "", type: "", notes: "" });
  const [sending, setSending] = useState(false);
  const [counters, setCounters] = useState({ years: 0, shows: 0, passion: 0 });
  const statsRef = useRef(null);
  const statsAnimated = useRef(false);

  // Navbar scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance gallery
  useEffect(() => {
    const t = setInterval(() => {
      if (!document.hidden) changeGallery((galleryIndex + 1) % CONFIG.gallery.length);
    }, 4000);
    return () => clearInterval(t);
  }, [galleryIndex]);

  // Counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !statsAnimated.current) {
          statsAnimated.current = true;
          animateCount("years", 10);
          animateCount("shows", 500);
          animateCount("passion", 100);
        }
      },
      { threshold: 0.5 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function animateCount(key, target) {
    let start = 0;
    const step = target / 80;
    const interval = setInterval(() => {
      start = Math.min(start + step, target);
      setCounters((prev) => ({ ...prev, [key]: Math.round(start) }));
      if (start >= target) clearInterval(interval);
    }, 20);
  }

  function changeGallery(idx) {
    setGalleryFade(false);
    setTimeout(() => {
      setGalleryIndex(idx);
      setGalleryFade(true);
    }, 200);
  }

  function sendBooking() {
    setSending(true);
    setTimeout(() => {
      const msg = `🎶 *RESERVA - Adolescentes Show*%0A%0A👤 *Nombre:* ${form.name || "No especificado"}%0A📅 *Fecha:* ${form.date || "No especificado"}%0A🕐 *Hora:* ${form.time || "No especificado"}%0A📍 *Lugar:* ${form.venue || "No especificado"}%0A🎉 *Tipo de evento:* ${form.type || "No especificado"}%0A📝 *Notas:* ${form.notes || "Ninguna"}`;
      window.open(`https://wa.me/59171014850?text=${msg}`, "_blank");
      setSending(false);
    }, 800);
  }

  const navLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#reservar", label: "Reservar" },
    { href: "#musica", label: "Música" },
    { href: "#galeria", label: "Galería" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <div style={{ background: "#000", color: "#fff", fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700;900&display=swap');
        :root { --cyan:#00D4E8; --yellow:#FFB800; --pink:#FF2D78; }
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; }
        .gradient-text { background: linear-gradient(135deg,#00D4E8,#FFB800,#FF2D78); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .bebas { font-family:'Bebas Neue',cursive; letter-spacing:0.03em; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulse-ring { 0%{transform:translate(-50%,-50%) scale(1);opacity:.6} 100%{transform:translate(-50%,-50%) scale(2.5);opacity:0} }
        @keyframes wave { 0%,100%{transform:scaleY(.4)} 50%{transform:scaleY(1)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes bounce-arrow { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 20px rgba(0,212,232,.3)} 50%{box-shadow:0 0 50px rgba(0,212,232,.7)} }
        @keyframes gradient-bg { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .float-anim { animation: float 6s ease-in-out infinite; }
        .pulse-ring { position:absolute;top:50%;left:50%;width:100%;height:100%;border:2px solid rgba(0,212,232,.3);border-radius:50%;animation:pulse-ring 2.5s ease-out infinite; }
        .pulse-ring:nth-child(2){animation-delay:.8s} .pulse-ring:nth-child(3){animation-delay:1.6s}
        .bar { width:3px;background:#00D4E8;border-radius:2px;animation:wave 1s ease-in-out infinite; }
        .bar:nth-child(2){animation-delay:.1s;height:14px} .bar:nth-child(3){animation-delay:.2s;height:18px} .bar:nth-child(4){animation-delay:.3s;height:10px} .bar:nth-child(5){animation-delay:.4s;height:16px}
        .ticker-inner { display:flex;width:max-content;animation:marquee 20s linear infinite;white-space:nowrap; }
        .bounce-arrow { position:absolute;bottom:2rem;left:50%;animation:bounce-arrow 1.5s ease-in-out infinite; }
        .wa-float { position:fixed;bottom:1.5rem;right:1.5rem;z-index:50;width:3.5rem;height:3.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#25D366,#128C7E);box-shadow:0 4px 20px rgba(37,211,102,.5);transition:transform .3s cubic-bezier(.34,1.56,.64,1); }
        .wa-float:hover{transform:scale(1.2)}
        .wa-float::before{content:'';position:absolute;inset:-4px;border-radius:50%;border:2px solid rgba(37,211,102,.4);animation:glow-pulse 2s ease infinite;}
        .service-card { position:relative;text-align:center;padding:1.25rem 1rem;border-radius:1rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);cursor:pointer;transition:all .3s cubic-bezier(.34,1.56,.64,1);overflow:hidden; }
        .service-card:hover{transform:translateY(-8px) scale(1.04);border-color:rgba(0,212,232,.4);}
        .service-card .emoji{display:block;font-size:2rem;margin-bottom:.5rem;transition:transform .3s;}
        .service-card:hover .emoji{transform:scale(1.3) rotate(10deg);}
        .test-card{background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:1.25rem;padding:1.5rem;transition:all .4s ease;position:relative;overflow:hidden;}
        .test-card::after{content:'"';position:absolute;top:-10px;right:20px;font-size:8rem;color:rgba(255,184,0,.08);font-family:'Bebas Neue',cursive;line-height:1;pointer-events:none;}
        .test-card:hover{border-color:rgba(255,184,0,.3);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.4);}
        .social-card{display:flex;flex-direction:column;align-items:center;gap:.75rem;padding:1.25rem;border-radius:1.25rem;border:1px solid;transition:all .3s cubic-bezier(.34,1.56,.64,1);}
        .social-card:hover{transform:translateY(-8px) scale(1.05);}
        .form-input{width:100%;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:.75rem;padding:.75rem 1rem;color:#fff;font-size:.875rem;transition:all .3s;outline:none;}
        .form-input:focus{border-color:#00D4E8;background:rgba(0,212,232,.05);box-shadow:0 0 0 3px rgba(0,212,232,.1);}
        .form-input::placeholder{color:#4b5563;}
        input[type="date"],select{color-scheme:dark;}
        select{appearance:none;}
        .animated-bg{background:linear-gradient(270deg,rgba(0,212,232,.08),rgba(255,184,0,.05),rgba(255,45,120,.08),rgba(0,212,232,.05));background-size:400% 400%;animation:gradient-bg 8s ease infinite;}
        .nav-link{position:relative;padding:.375rem .75rem;font-size:.875rem;color:#9ca3af;font-weight:500;border-radius:.5rem;transition:color .2s;text-decoration:none;}
        .nav-link:hover{color:#fff;}
        .badge{display:inline-flex;align-items:center;gap:.5rem;padding:.375rem 1rem;border-radius:9999px;font-size:.8rem;font-weight:600;margin-bottom:1rem;}
        .photo-hover{transition:transform .4s ease,box-shadow .4s ease;}
        .photo-hover:hover{transform:scale(1.02);box-shadow:0 30px 60px rgba(0,0,0,.6);}
        .gallery-fade{transition:opacity .2s ease,transform .2s ease;}
      `}</style>

      {/* ===== NAVBAR ===== */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.8)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.8)" : "none",
        transition: "all .3s ease"
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <a href="#inicio" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}>
            <img src={CONFIG.logo} alt="Logo" style={{ height: 44, width: 44, borderRadius: "50%", objectFit: "cover" }} />
            <span className="gradient-text" style={{ fontWeight: 900, fontSize: ".9rem", letterSpacing: ".05em", display: window.innerWidth < 640 ? "none" : "block" }}>Adolescentes Show</span>
          </a>
          {/* Desktop nav */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="desktop-nav">
            {navLinks.map(l => <a key={l.href} href={l.href} className="nav-link">{l.label}</a>)}
            <a href={`${CONFIG.whatsapp}?text=${CONFIG.whatsappText}`} target="_blank" rel="noreferrer"
              style={{ marginLeft: 12, display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 9999, fontSize: ".875rem", fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 20px rgba(37,211,102,.4)", textDecoration: "none" }}>
              <WaIcon /> Reservar
            </a>
          </div>
          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
        {/* Mobile menu */}
        {menuOpen && (
          <div style={{ background: "rgba(0,0,0,0.97)", borderTop: "1px solid rgba(255,255,255,0.05)", padding: "1rem" }}>
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
                style={{ display: "block", padding: "12px 16px", fontSize: ".875rem", color: "#d1d5db", textDecoration: "none", borderRadius: 8, marginBottom: 2 }}>
                {l.label}
              </a>
            ))}
            <a href={`${CONFIG.whatsapp}?text=${CONFIG.whatsappText}`} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 12, padding: "12px 16px", borderRadius: 12, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg,#25D366,#128C7E)", textDecoration: "none" }}>
              <WaIcon /> Reservar por WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* ===== HERO ===== */}
      <section id="inicio" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 64, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <img src={CONFIG.heroBg} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.4 }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 50%,#000 100%)" }} />
          <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, background: "radial-gradient(circle,rgba(0,212,232,.12) 0%,transparent 70%)", borderRadius: "50%", animation: "float 8s ease-in-out infinite" }} />
          <div style={{ position: "absolute", bottom: "25%", right: "10%", width: 350, height: 350, background: "radial-gradient(circle,rgba(255,45,120,.1) 0%,transparent 70%)", borderRadius: "50%", animation: "float 10s ease-in-out infinite reverse" }} />
        </div>
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "5rem 1rem", maxWidth: 900, margin: "0 auto" }}>
          {/* Logo with pulse rings */}
          <div className="float-anim" style={{ position: "relative", display: "inline-block", marginBottom: "2rem" }}>
            <div className="pulse-ring" /><div className="pulse-ring" /><div className="pulse-ring" />
            <img src={CONFIG.logo} alt="Logo Adolescentes Show" style={{ position: "relative", width: 180, height: 180, borderRadius: "50%", objectFit: "cover", filter: "drop-shadow(0 0 50px rgba(0,212,232,.5))" }} />
          </div>
          {/* Music bars */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.25rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 20px", borderRadius: 9999, background: "rgba(0,212,232,.1)", border: "1px solid rgba(0,212,232,.2)" }}>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 20 }}>
                {[8,14,18,10,16].map((h,i) => <div key={i} className="bar" style={{ height: h }} />)}
              </div>
              <span style={{ fontSize: ".75rem", color: "rgba(0,212,232,.8)", fontWeight: 600, letterSpacing: ".1em" }}>EN VIVO PARA TU EVENTO</span>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 3, height: 20 }}>
                {[16,10,18,14,8].map((h,i) => <div key={i} className="bar" style={{ height: h }} />)}
              </div>
            </div>
          </div>
          <h1 className="bebas" style={{ fontSize: "clamp(3rem,10vw,6rem)", marginBottom: "1rem", lineHeight: 1.05 }}>
            <span style={{ display: "block", color: "rgba(255,255,255,.9)" }}>Grupo Musical</span>
            <span className="gradient-text" style={{ display: "block", fontSize: "1.1em" }}>Adolescentes Show</span>
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#d1d5db", marginBottom: ".75rem" }}>Santa Cruz de la Sierra, Bolivia 🇧🇴</p>
          <p style={{ color: "#6b7280", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.7 }}>La mejor música en vivo para tus eventos. Cumbia, salsa, baladas y más. ¡Hacemos que tu fiesta sea <em style={{ color: "#FFB800" }}>inolvidable</em>!</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center", marginBottom: "3rem" }}>
            <a href="#reservar" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 9999, fontWeight: 700, color: "#000", background: "linear-gradient(135deg,#00D4E8,#0099aa)", textDecoration: "none", fontSize: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
              Reservar Fecha
            </a>
            <a href={CONFIG.whatsapp} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "14px 32px", borderRadius: 9999, fontWeight: 700, color: "#fff", border: "2px solid #22c55e", textDecoration: "none", fontSize: "1rem" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
              WhatsApp
            </a>
          </div>
          {/* Social icons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <SocialIcon href={CONFIG.tiktok} label="TikTok" hoverColor="#fff"><TikTokSvg /></SocialIcon>
            <SocialIcon href={CONFIG.instagram} label="Instagram" hoverColor="#f472b6"><InstaSvg /></SocialIcon>
            <SocialIcon href={CONFIG.facebook} label="Facebook" hoverColor="#60a5fa"><FbSvg /></SocialIcon>
            <SocialIcon href={CONFIG.spotify} label="Spotify" hoverColor="#4ade80"><SpotifySvg /></SocialIcon>
            <SocialIcon href={CONFIG.youtube} label="YouTube" hoverColor="#f87171"><YtSvg /></SocialIcon>
          </div>
        </div>
        <div className="bounce-arrow">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(0,212,232,.6)" strokeWidth="2"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </section>

      {/* ===== TICKER ===== */}
      <div style={{ overflow: "hidden", background: "rgba(0,212,232,.05)", borderTop: "1px solid rgba(0,212,232,.2)", borderBottom: "1px solid rgba(0,212,232,.2)", padding: "12px 0" }}>
        <div className="ticker-inner">
          {["🎶 Cumbia","💃 Salsa","🎸 Merengue","🎤 Baladas","🥁 Reggaetón","🎺 Música Variada","🎹 En Vivo","🇧🇴 Santa Cruz, Bolivia",
            "🎶 Cumbia","💃 Salsa","🎸 Merengue","🎤 Baladas","🥁 Reggaetón","🎺 Música Variada","🎹 En Vivo","🇧🇴 Santa Cruz, Bolivia"].map((t,i) => (
            <span key={i} style={{ padding: "0 1.5rem", fontSize: ".8rem", letterSpacing: ".15em", fontWeight: 700, color: "rgba(0,212,232,.7)", textTransform: "uppercase" }}>
              {t} <span style={{ color: "#FFB800", padding: "0 .5rem" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== SERVICES ===== */}
      <section style={{ padding: "5rem 1rem", background: "linear-gradient(to bottom,#000,#0a0a0f)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 16 }}>
            {[["🎂","Cumpleaños"],["💍","Bodas"],["👑","Quinceañeras"],["🎉","Fiestas"],["🏢","Corporativos"],["🎊","Aniversarios"]].map(([e,l]) => (
              <div key={l} className="service-card">
                <span className="emoji">{e}</span>
                <span style={{ color: "#9ca3af", fontSize: ".875rem", fontWeight: 500 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BOOKING FORM ===== */}
      <section id="reservar" style={{ padding: "5rem 1rem", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ border: "1px solid rgba(0,212,232,.3)", background: "rgba(0,212,232,.1)", color: "#00D4E8" }}>📅 Reserva tu fecha</span>
            <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>Reservar <span style={{ color: "#00D4E8" }}>Ahora</span></h2>
            <p style={{ color: "#6b7280" }}>Completa el formulario y te enviaremos directo a WhatsApp para confirmar</p>
          </div>
          <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "1.5rem", padding: "2rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ color: "#9ca3af", fontSize: ".875rem", display: "block", marginBottom: 6, fontWeight: 500 }}>Tu nombre</label>
                <input className="form-input" placeholder="¿Cómo te llamas?" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ color: "#9ca3af", fontSize: ".875rem", display: "block", marginBottom: 6, fontWeight: 500 }}>📅 Fecha</label>
                  <input type="date" className="form-input" value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
                </div>
                <div>
                  <label style={{ color: "#9ca3af", fontSize: ".875rem", display: "block", marginBottom: 6, fontWeight: 500 }}>🕐 Hora</label>
                  <select className="form-input" value={form.time} onChange={e => setForm({...form, time: e.target.value})}>
                    <option value="">Seleccionar</option>
                    {Array.from({length:24},(_,i)=>`${String(i).padStart(2,"0")}:00`).map(t=><option key={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: ".875rem", display: "block", marginBottom: 6, fontWeight: 500 }}>📍 Lugar del evento</label>
                <input className="form-input" placeholder="Dirección o nombre del salón" value={form.venue} onChange={e => setForm({...form, venue: e.target.value})} />
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: ".875rem", display: "block", marginBottom: 6, fontWeight: 500 }}>🎉 Tipo de evento</label>
                <select className="form-input" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                  <option value="">¿Qué estás celebrando?</option>
                  {["Cumpleaños","Boda","Quinceañera","Aniversario","Fiesta Privada","Evento Corporativo","Graduación","Otro"].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: "#9ca3af", fontSize: ".875rem", display: "block", marginBottom: 6, fontWeight: 500 }}>📝 Notas adicionales</label>
                <textarea className="form-input" placeholder="Canciones especiales, requerimientos, cantidad de invitados..." rows={3} style={{ resize: "none" }} value={form.notes} onChange={e => setForm({...form, notes: e.target.value})} />
              </div>
              <button onClick={sendBooking} disabled={sending}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px", borderRadius: 12, fontWeight: 700, color: "#fff", fontSize: "1rem", border: "none", cursor: "pointer", background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 24px rgba(37,211,102,.4)", transition: "transform .2s" }}>
                <WaIcon /> {sending ? "Enviando..." : "Enviar Reserva por WhatsApp →"}
              </button>
              <p style={{ textAlign: "center", color: "#4b5563", fontSize: ".75rem" }}>Al presionar se abrirá WhatsApp con tu información de reserva</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section ref={statsRef} style={{ padding: "4rem 1rem", background: "linear-gradient(135deg,rgba(0,212,232,.06),rgba(255,184,0,.04),rgba(255,45,120,.06))", borderTop: "1px solid rgba(0,212,232,.15)", borderBottom: "1px solid rgba(0,212,232,.15)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, textAlign: "center" }}>
            {[["years","10+","Años de experiencia"],["shows","500+","Shows realizados"],["passion","100%","Pasión"]].map(([k,suffix,label]) => (
              <div key={k}>
                <div className="gradient-text bebas" style={{ fontSize: "2.5rem", lineHeight: 1 }}>{counters[k]}{suffix.replace(/\d+/,"")}</div>
                <p style={{ color: "#6b7280", fontSize: ".875rem", marginTop: 4 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SPOTIFY ===== */}
      <section id="musica" style={{ padding: "5rem 1rem", background: "#000" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ border: "1px solid rgba(29,185,84,.3)", background: "rgba(29,185,84,.1)", color: "#1DB954" }}>🎵 Nuestra Música</span>
            <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>Escúchanos en <span style={{ color: "#1DB954" }}>Spotify</span></h2>
            <p style={{ color: "#6b7280" }}>Dale play y descubre nuestro repertorio 🎶</p>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: "2.5rem" }}>
            <iframe src="https://open.spotify.com/embed/artist/4GO5BCr8a4vFcFK6lCZ7rb?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" style={{ borderRadius: 16, display: "block" }} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {[
              { href: CONFIG.spotify, color: "#4ade80", bg: "rgba(29,185,84,.1)", border: "rgba(29,185,84,.3)", icon: <SpotifySvg />, label: "Spotify" },
              { href: CONFIG.youtube, color: "#f87171", bg: "rgba(239,68,68,.1)", border: "rgba(239,68,68,.3)", icon: <YtSvg />, label: "YouTube" },
              { href: CONFIG.tiktok, color: "#fff", bg: "rgba(255,255,255,.05)", border: "rgba(255,255,255,.15)", icon: <TikTokSvg />, label: "TikTok" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 9999, border: `1px solid ${s.border}`, background: s.bg, color: s.color, textDecoration: "none", fontWeight: 600, fontSize: ".875rem", transition: "transform .2s" }}>
                {s.icon} {s.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VIDEOS ===== */}
      <section style={{ padding: "5rem 1rem", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ border: "1px solid rgba(239,68,68,.3)", background: "rgba(239,68,68,.1)", color: "#f87171" }}>▶ Videos</span>
            <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>Mira nuestros <span style={{ color: "#FF2D78" }}>Videos</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 24 }}>
            {CONFIG.videos.map(v => (
              <div key={v.id} style={{ borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.1)", transition: "transform .3s" }}>
                <div style={{ aspectRatio: "16/9" }}>
                  <iframe src={`https://www.youtube.com/embed/${v.id}`} style={{ width: "100%", height: "100%", display: "block" }} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy" />
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ color: "#fff", fontWeight: 500, fontSize: ".875rem" }}>{v.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <a href={CONFIG.youtube} target="_blank" rel="noreferrer" style={{ color: "#f87171", textDecoration: "none", fontWeight: 500, fontSize: ".875rem" }}>Ver más videos en YouTube →</a>
          </div>
        </div>
      </section>

      {/* ===== GALLERY ===== */}
      <section id="galeria" style={{ padding: "5rem 1rem", background: "#000" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ border: "1px solid rgba(255,184,0,.3)", background: "rgba(255,184,0,.1)", color: "#FFB800" }}>📸 Galería</span>
            <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>Nuestros <span style={{ color: "#FFB800" }}>Momentos</span></h2>
          </div>
          {/* Main image */}
          <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", aspectRatio: "16/9", background: "#111", marginBottom: 12 }}>
            <img src={CONFIG.gallery[galleryIndex]} alt="Galería" className="gallery-fade"
              style={{ width: "100%", height: "100%", objectFit: "cover", opacity: galleryFade ? 1 : 0, transform: galleryFade ? "scale(1)" : "scale(1.02)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 50%)", pointerEvents: "none" }} />
            <button onClick={() => changeGallery(galleryIndex === 0 ? CONFIG.gallery.length - 1 : galleryIndex - 1)}
              style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <button onClick={() => changeGallery((galleryIndex + 1) % CONFIG.gallery.length)}
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,.6)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
            {/* Dots */}
            <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
              {CONFIG.gallery.map((_,i) => (
                <button key={i} onClick={() => changeGallery(i)}
                  style={{ borderRadius: 9999, border: "none", cursor: "pointer", transition: "all .3s", background: i === galleryIndex ? "#00D4E8" : "rgba(255,255,255,.4)", width: i === galleryIndex ? 24 : 10, height: 10 }} />
              ))}
            </div>
          </div>
          {/* Thumbnails */}
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8 }}>
            {CONFIG.gallery.map((src,i) => (
              <button key={i} onClick={() => changeGallery(i)}
                style={{ flexShrink: 0, width: 80, height: 80, borderRadius: 12, overflow: "hidden", border: `2px solid ${i === galleryIndex ? "#00D4E8" : "transparent"}`, opacity: i === galleryIndex ? 1 : 0.5, cursor: "pointer", transition: "all .3s", padding: 0 }}>
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="nosotros" style={{ padding: "5rem 1rem", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <span className="badge" style={{ border: "1px solid rgba(236,72,153,.3)", background: "rgba(236,72,153,.1)", color: "#f472b6" }}>👥 Sobre Nosotros</span>
            <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: "1.5rem", lineHeight: 1.1 }}>
              Más de <span style={{ color: "#00D4E8" }}>10 años</span> haciendo <span style={{ color: "#FF2D78" }}>bailar</span> a Bolivia
            </h2>
            <p style={{ color: "#9ca3af", marginBottom: "1rem", lineHeight: 1.8 }}>Somos <strong style={{ color: "#fff" }}>Adolescentes Show</strong>, un grupo musical originario de Santa Cruz de la Sierra, Bolivia. Con más de una década de experiencia, nos hemos convertido en uno de los grupos más solicitados para todo tipo de eventos sociales.</p>
            <p style={{ color: "#9ca3af", marginBottom: "2rem", lineHeight: 1.8 }}>Nuestro repertorio incluye cumbia, salsa, merengue, reggaetón, baladas y música variada. Nos adaptamos al estilo de tu evento para que tus invitados vivan una experiencia musical única e inolvidable.</p>
            <a href="#reservar" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: 9999, fontWeight: 700, color: "#000", background: "linear-gradient(135deg,#00D4E8,#0099aa)", textDecoration: "none", fontSize: ".875rem" }}>
              Reservar ahora →
            </a>
          </div>
          <div>
            <img src={CONFIG.aboutPhoto} alt="Adolescentes Show" className="photo-hover" style={{ borderRadius: 24, width: "100%", boxShadow: "0 30px 60px rgba(0,0,0,.6)", border: "1px solid rgba(0,212,232,.15)" }} />
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section id="testimonios" style={{ padding: "5rem 1rem", background: "#000" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="badge" style={{ border: "1px solid rgba(255,184,0,.3)", background: "rgba(255,184,0,.1)", color: "#FFB800" }}>❤️ Testimonios</span>
            <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>Lo que dicen nuestros <span style={{ color: "#FFB800" }}>clientes</span></h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
            {[
              { name: "María González", event: "Boda", text: "¡Increíble! Hicieron de nuestra boda una noche mágica. Todos nuestros invitados bailaron hasta el amanecer. ¡Los recomiendo al 100%!" },
              { name: "Carlos Mendoza", event: "Cumpleaños 50", text: "Contratamos a Adolescentes Show para los 50 años de mi papá y fue la mejor decisión. Profesionalismo total y música de primera." },
              { name: "Ana Torrico", event: "Quinceañera", text: "La quinceañera de mi hija fue perfecta gracias a su música. Son muy puntuales y se adaptan a todo tipo de público. ¡Gracias!" },
              { name: "Roberto Salinas", event: "Evento Corporativo", text: "Excelente grupo para nuestro evento empresarial. Muy profesionales y con un repertorio amplio. Definitivamente los volveremos a contratar." },
            ].map(t => (
              <div key={t.name} className="test-card">
                <div style={{ color: "#FFB800", marginBottom: ".75rem" }}>★★★★★</div>
                <p style={{ color: "#d1d5db", fontSize: ".875rem", marginBottom: "1rem", fontStyle: "italic", lineHeight: 1.7 }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00D4E8,#FF2D78)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: ".875rem" }}>{t.name[0]}</div>
                  <div><p style={{ color: "#fff", fontWeight: 500, fontSize: ".875rem" }}>{t.name}</p><p style={{ color: "#4b5563", fontSize: ".75rem" }}>{t.event}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOCIAL MEDIA SECTION ===== */}
      <section style={{ padding: "5rem 1rem", background: "#0a0a0f" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span className="badge" style={{ border: "1px solid rgba(0,212,232,.3)", background: "rgba(0,212,232,.1)", color: "#00D4E8" }}>❤️ Síguenos</span>
          <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: ".75rem" }}>¡Síguenos en nuestras <span className="gradient-text">Redes Sociales</span>!</h2>
          <p style={{ color: "#6b7280", marginBottom: "2.5rem" }}>No te pierdas nuestras publicaciones, videos en vivo y novedades. ¡Únete a nuestra comunidad!</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 16 }}>
            {[
              { href: CONFIG.tiktok, icon: <TikTokSvg size={28} />, label: "TikTok", handle: "@adolescentesshow", border: "rgba(255,255,255,.2)", bg: "rgba(255,255,255,.03)" },
              { href: CONFIG.instagram, icon: <InstaSvg size={28} color="#f472b6" />, label: "Instagram", handle: "@adolescentes_show", border: "rgba(236,72,153,.3)", bg: "rgba(255,255,255,.03)" },
              { href: CONFIG.facebook, icon: <FbSvg size={28} color="#60a5fa" />, label: "Facebook", handle: "Adolescentes Show", border: "rgba(96,165,250,.3)", bg: "rgba(255,255,255,.03)" },
              { href: CONFIG.spotify, icon: <SpotifySvg size={28} color="#4ade80" />, label: "Spotify", handle: "Adolescentes Show", border: "rgba(74,222,128,.3)", bg: "rgba(255,255,255,.03)" },
              { href: CONFIG.youtube, icon: <YtSvg size={28} color="#f87171" />, label: "YouTube", handle: "@adolescentesshow", border: "rgba(248,113,113,.3)", bg: "rgba(255,255,255,.03)" },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-card"
                style={{ background: s.bg, borderColor: s.border, textDecoration: "none" }}>
                {s.icon}
                <span style={{ color: "#fff", fontWeight: 700, fontSize: ".875rem" }}>{s.label}</span>
                <span style={{ color: "#6b7280", fontSize: ".75rem" }}>{s.handle}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTACT CTA ===== */}
      <section id="contacto" style={{ padding: "5rem 1rem", background: "#000" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <div className="animated-bg" style={{ position: "relative", borderRadius: 24, overflow: "hidden", padding: "4rem 2rem", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(255,255,255,.08)", borderRadius: 24, pointerEvents: "none" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(0,212,232,.5),transparent)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(255,45,120,.5),transparent)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <img src={CONFIG.logo} alt="Logo" className="float-anim" style={{ width: 80, height: 80, margin: "0 auto 1.5rem", display: "block", borderRadius: "50%", objectFit: "cover" }} />
              <h2 className="bebas" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>¿Listo para tu <span style={{ color: "#00D4E8" }}>evento</span>?</h2>
              <p style={{ color: "#9ca3af", marginBottom: "2rem", maxWidth: 480, margin: "0 auto 2rem" }}>Contáctanos por WhatsApp para cotizar, reservar y coordinar todos los detalles de tu fiesta.</p>
              <a href={`${CONFIG.whatsapp}?text=${CONFIG.whatsappText}`} target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", borderRadius: 9999, fontWeight: 700, color: "#fff", fontSize: "1.1rem", background: "linear-gradient(135deg,#25D366,#128C7E)", boxShadow: "0 4px 24px rgba(37,211,102,.4)", textDecoration: "none", marginBottom: "2rem" }}>
                <WaIcon size={22} /> WhatsApp: +591 71014850
              </a>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#6b7280", fontSize: ".875rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Santa Cruz de la Sierra, Bolivia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: "2.5rem 1rem", borderTop: "1px solid rgba(255,255,255,.05)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <img src={CONFIG.logo} alt="Logo" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }} />
              <span style={{ color: "#6b7280", fontSize: ".875rem" }}>Adolescentes Show · Santa Cruz, Bolivia</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {[
                { href: CONFIG.tiktok, icon: <TikTokSvg />, hover: "#fff" },
                { href: CONFIG.instagram, icon: <InstaSvg />, hover: "#f472b6" },
                { href: CONFIG.facebook, icon: <FbSvg />, hover: "#60a5fa" },
                { href: CONFIG.spotify, icon: <SpotifySvg />, hover: "#4ade80" },
                { href: CONFIG.youtube, icon: <YtSvg />, hover: "#f87171" },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" style={{ color: "#6b7280", textDecoration: "none", transition: "transform .2s,color .2s" }}>{s.icon}</a>
              ))}
            </div>
          </div>
          <p style={{ textAlign: "center", color: "#374151", fontSize: ".75rem", marginTop: "1.5rem" }}>© 2025 Grupo Musical Adolescentes Show · Todos los derechos reservados</p>
        </div>
      </footer>

      {/* ===== FLOATING WHATSAPP ===== */}
      <a href={`${CONFIG.whatsapp}?text=${CONFIG.whatsappText}`} target="_blank" rel="noreferrer" className="wa-float" title="Reservar por WhatsApp">
        <WaIcon size={28} />
      </a>
    </div>
  );
}

// ---- SVG helpers ----
function WaIcon({ size = 20 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>;
}
function SocialIcon({ href, label, hoverColor, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, color: "#6b7280", textDecoration: "none", transition: "all .2s" }}
      onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.transform = "scale(1.25) translateY(-4px)"; }}
      onMouseLeave={e => { e.currentTarget.style.color = "#6b7280"; e.currentTarget.style.transform = "scale(1) translateY(0)"; }}>
      {children}
      <span style={{ fontSize: ".7rem" }}>{label}</span>
    </a>
  );
}
function TikTokSvg({ size = 22, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.75a8.18 8.18 0 004.76 1.52V6.84a4.84 4.84 0 01-1-.15z"/></svg>;
}
function InstaSvg({ size = 22, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
}
function FbSvg({ size = 22, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function SpotifySvg({ size = 22, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={color}><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>;
}
function YtSvg({ size = 22, color = "currentColor" }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>;
}