import { useState, useEffect, useRef } from "react";

// ── DATA ──────────────────────────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    title: "Brew & Co.",
    subtitle: "Coffee Shop Landing Page",
    desc: "A modern, conversion-focused landing page for a specialty coffee brand. Features smooth animations, interactive menu filtering, and a fully responsive layout.",
    tags: ["React", "Tailwind", "Animation"],
    live: "https://brew-co-landing.vercel.app",
    github: "https://github.com/Rahul-hzb/brew-co-landing",
    color: "#c8a96e",
    bg: "rgba(200,169,110,0.06)",
    emoji: "☕",
  },
  {
    id: 2,
    title: "TaskFlow",
    subtitle: "Task Manager App",
    desc: "A clean, minimal task manager with add, complete, and delete features. Includes filter tabs, progress tracking, and persistent localStorage support.",
    tags: ["React", "JavaScript", "LocalStorage"],
    live: "https://task-manager-app.vercel.app",
    github: "https://github.com/Rahul-hzb/task-manager-app",
    color: "#2dd4bf",
    bg: "rgba(45,212,191,0.06)",
    emoji: "✅",
  },
  {
    id: 3,
    title: "SkyCheck",
    subtitle: "Live Weather App",
    desc: "A real-time weather app powered by OpenWeatherMap API. Search any city, see live data including temperature, humidity, wind, and a 5-day forecast.",
    tags: ["React", "API", "JavaScript"],
    live: "https://weather-app.vercel.app",
    github: "https://github.com/Rahul-hzb/weather-app",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.06)",
    emoji: "🌤️",
  },
];

const SKILLS = [
  { name: "HTML5", icon: "🌐", level: 90 },
  { name: "CSS3", icon: "🎨", level: 85 },
  { name: "Tailwind CSS", icon: "💨", level: 80 },
  { name: "JavaScript", icon: "⚡", level: 78 },
  { name: "React", icon: "⚛️", level: 75 },
  { name: "Git & GitHub", icon: "🔧", level: 70 },
];

const NAV_ITEMS = ["About", "Skills", "Projects", "Contact"];

// ── HOOKS ─────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function useTypewriter(words, speed = 100) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1800);
        } else {
          setCharIdx(c => c + 1);
        }
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(w => (w + 1) % words.length);
          setCharIdx(0);
        } else {
          setCharIdx(c => c - 1);
        }
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed]);

  return display;
}

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function DeveloperIllustration() {
  return (
    <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e3a5f" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <radialGradient id="skinGrad" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fbbf80" />
          <stop offset="100%" stopColor="#f59e4a" />
        </radialGradient>
        <radialGradient id="shirtGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </radialGradient>
        <radialGradient id="laptopGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="softShadow">
          <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Background circle */}
      <circle cx="200" cy="200" r="185" fill="url(#bgGrad)" />
      <circle cx="200" cy="200" r="185" fill="none" stroke="#3b82f6" strokeWidth="1" strokeOpacity="0.3" />

      {/* Floating particles */}
      <circle cx="60" cy="80" r="3" fill="#3b82f6" opacity="0.6"><animate attributeName="cy" values="80;70;80" dur="3s" repeatCount="indefinite"/></circle>
      <circle cx="340" cy="100" r="2" fill="#60a5fa" opacity="0.5"><animate attributeName="cy" values="100;90;100" dur="4s" repeatCount="indefinite"/></circle>
      <circle cx="80" cy="300" r="2.5" fill="#3b82f6" opacity="0.4"><animate attributeName="cy" values="300;290;300" dur="3.5s" repeatCount="indefinite"/></circle>
      <circle cx="320" cy="320" r="3" fill="#60a5fa" opacity="0.5"><animate attributeName="cy" values="320;310;320" dur="2.5s" repeatCount="indefinite"/></circle>

      {/* Code brackets floating */}
      <text x="40" y="160" fontSize="18" fill="#3b82f6" opacity="0.4" fontFamily="monospace"><animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite"/>&lt;/&gt;</text>
      <text x="330" y="200" fontSize="14" fill="#60a5fa" opacity="0.4" fontFamily="monospace"><animate attributeName="opacity" values="0.4;0.7;0.4" dur="3s" repeatCount="indefinite"/>{ }</text>
      <text x="50" y="250" fontSize="12" fill="#3b82f6" opacity="0.3" fontFamily="monospace">npm</text>

      {/* Body / shirt */}
      <ellipse cx="200" cy="310" rx="75" ry="55" fill="url(#shirtGrad)" filter="url(#softShadow)" />

      {/* Collar */}
      <path d="M 180 268 Q 200 280 220 268" fill="none" stroke="#1d4ed8" strokeWidth="3" />

      {/* Arms */}
      <ellipse cx="135" cy="300" rx="22" ry="40" fill="url(#shirtGrad)" transform="rotate(-15 135 300)" />
      <ellipse cx="265" cy="300" rx="22" ry="40" fill="url(#shirtGrad)" transform="rotate(15 265 300)" />

      {/* Hands */}
      <ellipse cx="122" cy="332" rx="14" ry="11" fill="url(#skinGrad)" transform="rotate(-10 122 332)" />
      <ellipse cx="278" cy="332" rx="14" ry="11" fill="url(#skinGrad)" transform="rotate(10 278 332)" />

      {/* Neck */}
      <rect x="188" y="248" width="24" height="24" rx="8" fill="url(#skinGrad)" />

      {/* Head */}
      <ellipse cx="200" cy="200" rx="52" ry="58" fill="url(#skinGrad)" filter="url(#softShadow)" />

      {/* Hair */}
      <ellipse cx="200" cy="155" rx="52" ry="22" fill="#1a0a00" />
      <ellipse cx="155" cy="175" rx="14" ry="30" fill="#1a0a00" />
      <ellipse cx="245" cy="175" rx="14" ry="30" fill="#1a0a00" />
      <rect x="153" y="152" width="94" height="20" rx="10" fill="#1a0a00" />

      {/* Eyes */}
      <ellipse cx="182" cy="205" rx="10" ry="11" fill="white" />
      <ellipse cx="218" cy="205" rx="10" ry="11" fill="white" />
      <ellipse cx="184" cy="207" rx="6" ry="7" fill="#1e293b" />
      <ellipse cx="220" cy="207" rx="6" ry="7" fill="#1e293b" />
      <circle cx="186" cy="205" r="2" fill="white" />
      <circle cx="222" cy="205" r="2" fill="white" />

      {/* Eyebrows */}
      <path d="M 173 193 Q 182 188 191 192" fill="none" stroke="#1a0a00" strokeWidth="3" strokeLinecap="round" />
      <path d="M 209 192 Q 218 188 227 193" fill="none" stroke="#1a0a00" strokeWidth="3" strokeLinecap="round" />

      {/* Nose */}
      <path d="M 200 212 Q 195 222 200 225 Q 205 222 200 212" fill="#f59e4a" opacity="0.6" />

      {/* Smile */}
      <path d="M 186 235 Q 200 246 214 235" fill="none" stroke="#c2713a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Laptop */}
      <g filter="url(#softShadow)">
        <rect x="118" y="338" width="164" height="108" rx="8" fill="url(#laptopGrad)" />
        <rect x="124" y="344" width="152" height="90" rx="4" fill="#0f172a" />
        {/* Screen content */}
        <rect x="130" y="350" width="80" height="6" rx="3" fill="#3b82f6" opacity="0.8"><animate attributeName="width" values="80;95;80" dur="2s" repeatCount="indefinite"/></rect>
        <rect x="130" y="362" width="60" height="4" rx="2" fill="#60a5fa" opacity="0.5" />
        <rect x="130" y="372" width="100" height="4" rx="2" fill="#334155" opacity="0.8" />
        <rect x="130" y="382" width="45" height="4" rx="2" fill="#10b981" opacity="0.7" />
        <rect x="130" y="392" width="75" height="4" rx="2" fill="#334155" opacity="0.6" />
        <rect x="130" y="402" width="55" height="4" rx="2" fill="#f59e0b" opacity="0.6" />
        {/* Cursor blink */}
        <rect x="190" y="362" width="2" height="10" rx="1" fill="#60a5fa"><animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/></rect>
        {/* Laptop base */}
        <rect x="108" y="444" width="184" height="10" rx="5" fill="#1e293b" />
        <rect x="160" y="450" width="80" height="4" rx="2" fill="#0f172a" />
      </g>

      {/* Glow under laptop */}
      <ellipse cx="200" cy="458" rx="80" ry="8" fill="#3b82f6" opacity="0.15" filter="url(#glow)" />
    </svg>
  );
}

function ProjectCard({ project, index }) {
  const [ref, visible] = useInView(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? project.bg : "#ffffff",
        border: `1.5px solid ${hovered ? project.color : "#e5e7eb"}`,
        borderRadius: 20,
        padding: "2rem",
        cursor: "pointer",
        transition: "all 0.4s ease",
        transform: visible
          ? hovered ? "translateY(-10px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(50px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.15}s`,
        boxShadow: hovered ? `0 20px 60px ${project.color}30` : "0 2px 20px rgba(0,0,0,0.06)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow blob */}
      <div style={{
        position: "absolute", top: -40, right: -40, width: 120, height: 120,
        borderRadius: "50%", background: project.color,
        opacity: hovered ? 0.12 : 0, transition: "opacity 0.4s ease",
        filter: "blur(30px)",
      }} />

      {/* Emoji icon */}
      <div style={{
        fontSize: 40, marginBottom: 16,
        transform: hovered ? "scale(1.2) rotate(5deg)" : "scale(1)",
        transition: "transform 0.3s ease", display: "inline-block",
      }}>
        {project.emoji}
      </div>

      {/* Title */}
      <h3 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: "#0f172a" }}>
        {project.title}
      </h3>
      <div style={{ fontSize: 13, color: project.color, fontWeight: 600, marginBottom: 12, letterSpacing: "0.05em" }}>
        {project.subtitle}
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, margin: "0 0 20px" }}>
        {project.desc}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
        {project.tags.map(tag => (
          <span key={tag} style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
            padding: "4px 12px", borderRadius: 99,
            background: `${project.color}15`, color: project.color,
            border: `1px solid ${project.color}30`,
          }}>{tag}</span>
        ))}
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10 }}>
        <a href={project.live} target="_blank" rel="noopener noreferrer" style={{
          flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10,
          background: project.color, color: "#fff", fontSize: 13, fontWeight: 600,
          textDecoration: "none", transition: "opacity 0.2s",
          letterSpacing: "0.05em",
        }}
          onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
          onMouseOut={e => e.currentTarget.style.opacity = "1"}
        >
          Live Demo ↗
        </a>
        <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
          flex: 1, textAlign: "center", padding: "10px 0", borderRadius: 10,
          background: "transparent", color: "#64748b", fontSize: 13, fontWeight: 600,
          textDecoration: "none", border: "1.5px solid #e5e7eb", transition: "all 0.2s",
          letterSpacing: "0.05em",
        }}
          onMouseOver={e => { e.currentTarget.style.borderColor = "#94a3b8"; e.currentTarget.style.color = "#1e293b"; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.color = "#64748b"; }}
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}

// ── MAIN PORTFOLIO ────────────────────────────────────────────────────────────
export default function Portfolio() {
  const scrollY = useScrollY();
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const typed = useTypewriter(["Frontend Developer", "React Developer", "UI Builder", "Freelancer"]);

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function copyEmail() {
    navigator.clipboard.writeText("prasadrahul0612@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const navScrolled = scrollY > 60;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div style={{ fontFamily: "'Poppins', sans-serif", overflowX: "hidden" }}>

        {/* ── NAVBAR ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "0 2rem", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: navScrolled ? "rgba(10,12,20,0.92)" : "transparent",
          backdropFilter: navScrolled ? "blur(16px)" : "none",
          borderBottom: navScrolled ? "0.5px solid rgba(255,255,255,0.08)" : "none",
          boxShadow: navScrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
          transition: "all 0.4s ease",
        }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>
            Rahul<span style={{ color: "#3b82f6" }}>.</span>
          </div>

          {/* Desktop nav */}
          <div className="desktop-nav-links" style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_ITEMS.map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                style={{
                  background: "none", border: "none", color: "#94a3b8", fontSize: 14,
                  fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                  transition: "color 0.2s", letterSpacing: "0.02em",
                }}
                onMouseOver={e => e.target.style.color = "#fff"}
                onMouseOut={e => e.target.style.color = "#94a3b8"}
              >{item}</button>
            ))}
            <button onClick={() => scrollTo("contact")} style={{
              background: "#3b82f6", border: "none", color: "#fff", padding: "9px 22px",
              borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
              fontFamily: "inherit", transition: "all 0.2s", letterSpacing: "0.02em",
            }}
              onMouseOver={e => { e.target.style.background = "#2563eb"; e.target.style.transform = "scale(1.04)"; }}
              onMouseOut={e => { e.target.style.background = "#3b82f6"; e.target.style.transform = "scale(1)"; }}
            >
              Hire Me
            </button>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section style={{
          minHeight: "100vh", background: "#0a0c14",
          display: "flex", alignItems: "center",
          padding: "6rem 2rem 4rem",
          position: "relative", overflow: "hidden",
        }}>
          {/* Animated background blobs */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <div style={{
              position: "absolute", top: "10%", left: "5%", width: 400, height: 400,
              borderRadius: "50%", background: "rgba(59,130,246,0.08)", filter: "blur(80px)",
              animation: "blob1 8s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", bottom: "10%", right: "5%", width: 350, height: 350,
              borderRadius: "50%", background: "rgba(99,102,241,0.06)", filter: "blur(80px)",
              animation: "blob2 10s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", top: "50%", left: "50%", width: 300, height: 300,
              borderRadius: "50%", background: "rgba(59,130,246,0.04)", filter: "blur(60px)",
              animation: "blob3 12s ease-in-out infinite",
            }} />
            {/* Grid */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(59,130,246,0.08) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          </div>

          <div className="hero-grid" style={{
            maxWidth: 1200, margin: "0 auto", width: "100%",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 64, alignItems: "center", position: "relative", zIndex: 1,
          }}>
            {/* Left — text */}
            <div style={{ animation: "heroLeft 1s ease both" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)",
                borderRadius: 99, padding: "6px 16px", marginBottom: 24,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }} />
                <span style={{ fontSize: 12, color: "#60a5fa", fontWeight: 500, letterSpacing: "0.08em" }}>Available for freelance work</span>
              </div>

              <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, color: "#fff", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.03em" }}>
                Hi, I'm<br />
                <span style={{ color: "#3b82f6" }}>Rahul Prasad</span>
              </h1>

              <div style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", color: "#94a3b8", fontWeight: 400, marginBottom: 16, minHeight: 40 }}>
                I'm a <span style={{ color: "#60a5fa", fontWeight: 600 }}>{typed}</span>
                <span style={{ color: "#3b82f6", animation: "blink 1s infinite" }}>|</span>
              </div>

              <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 40, maxWidth: 480 }}>
                I build clean, mobile-friendly websites for small businesses that want to grow online. Fast, responsive, and built with modern technology.
              </p>

              <div className="hero-buttons" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("projects")} style={{
                  background: "#3b82f6", border: "none", color: "#fff",
                  padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600,
                  cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
                  boxShadow: "0 0 30px rgba(59,130,246,0.3)",
                }}
                  onMouseOver={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 0 40px rgba(59,130,246,0.5)"; }}
                  onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 30px rgba(59,130,246,0.3)"; }}
                >
                  View My Work →
                </button>
                <button onClick={() => scrollTo("contact")} style={{
                  background: "transparent", border: "1.5px solid rgba(255,255,255,0.15)",
                  color: "#94a3b8", padding: "14px 32px", borderRadius: 12, fontSize: 15,
                  fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
                }}
                  onMouseOver={e => { e.target.style.borderColor = "rgba(255,255,255,0.4)"; e.target.style.color = "#fff"; }}
                  onMouseOut={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; e.target.style.color = "#94a3b8"; }}
                >
                  Contact Me
                </button>
              </div>

              {/* Social links */}
              <div className="hero-social" style={{ display: "flex", gap: 16, marginTop: 40, alignItems: "center" }}>
                <a href="https://github.com/Rahul-hzb" target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 8, color: "#64748b",
                  textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s",
                }}
                  onMouseOver={e => e.currentTarget.style.color = "#fff"}
                  onMouseOut={e => e.currentTarget.style.color = "#64748b"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                  GitHub
                </a>
                <span style={{ color: "#1e293b" }}>·</span>
                <a href="mailto:prasadrahul0612@gmail.com" style={{
                  display: "flex", alignItems: "center", gap: 8, color: "#64748b",
                  textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s",
                }}
                  onMouseOver={e => e.currentTarget.style.color = "#fff"}
                  onMouseOut={e => e.currentTarget.style.color = "#64748b"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  Email
                </a>
              </div>
            </div>

            {/* Right — illustration */}
            <div className="hero-illustration" style={{ animation: "heroRight 1s ease 0.3s both", display: "flex", justifyContent: "center" }}>
              <div style={{
                width: "min(420px, 90vw)", height: "min(420px, 90vw)",
                position: "relative",
              }}>
                {/* Glow ring */}
                <div style={{
                  position: "absolute", inset: -20, borderRadius: "50%",
                  background: "conic-gradient(from 0deg, #3b82f6, #6366f1, #3b82f6)",
                  opacity: 0.15, filter: "blur(20px)",
                  animation: "spin 8s linear infinite",
                }} />
                <div style={{
                  position: "relative", width: "100%", height: "100%",
                  borderRadius: "50%", overflow: "hidden",
                  border: "2px solid rgba(59,130,246,0.3)",
                  boxShadow: "0 0 60px rgba(59,130,246,0.2)",
                }}>
                  <DeveloperIllustration />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
            animation: "bounce 2s infinite",
          }}>
            <span style={{ fontSize: 11, color: "#334155", letterSpacing: "0.15em", textTransform: "uppercase" }}>scroll</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#334155" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" style={{ background: "#0d1117", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 12, fontWeight: 600 }}>Who I Am</div>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                  About <span style={{ color: "#3b82f6" }}>Me</span>
                </h2>
              </div>
            </FadeUp>

            <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }}>
              <FadeUp delay={0.1}>
                <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9, marginBottom: 20 }}>
                  I'm a <strong style={{ color: "#fff" }}>frontend developer</strong> who loves turning ideas into beautiful, fast websites. I work with small businesses to help them build a strong online presence.
                </p>
                <p style={{ fontSize: 16, color: "#94a3b8", lineHeight: 1.9, marginBottom: 32 }}>
                  I focus on <strong style={{ color: "#fff" }}>clean design</strong>, smooth user experience, and code that works perfectly on every device — from phones to desktops.
                </p>
                <div style={{ display: "flex", gap: 32 }}>
                  {[["3+", "Projects Built"], ["100%", "Client Focus"], ["Fast", "Delivery"]].map(([num, label]) => (
                    <div key={label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 26, fontWeight: 800, color: "#3b82f6" }}>{num}</div>
                      <div style={{ fontSize: 11, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.2}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  {[
                    { icon: "🎯", title: "Goal-Focused", desc: "Every line of code serves a purpose" },
                    { icon: "📱", title: "Mobile First", desc: "Looks perfect on every screen size" },
                    { icon: "⚡", title: "Fast Delivery", desc: "Quick turnaround without cutting corners" },
                    { icon: "💬", title: "Clear Comms", desc: "Always responsive and transparent" },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} style={{
                      background: "#161b27", border: "0.5px solid rgba(255,255,255,0.06)",
                      borderRadius: 16, padding: "1.25rem", transition: "border-color 0.2s",
                    }}
                      onMouseOver={e => e.currentTarget.style.borderColor = "rgba(59,130,246,0.3)"}
                      onMouseOut={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"}
                    >
                      <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0", marginBottom: 4 }}>{title}</div>
                      <div style={{ fontSize: 12, color: "#475569", lineHeight: 1.5 }}>{desc}</div>
                    </div>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ background: "#080c14", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 12, fontWeight: 600 }}>What I Know</div>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                  My <span style={{ color: "#3b82f6" }}>Skills</span>
                </h2>
              </div>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
              {SKILLS.map((skill, i) => (
                <FadeUp key={skill.name} delay={i * 0.1}>
                  <div style={{
                    background: "#111827", border: "0.5px solid rgba(255,255,255,0.06)",
                    borderRadius: 16, padding: "1.5rem", transition: "all 0.3s",
                  }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ fontSize: 24 }}>{skill.icon}</span>
                        <span style={{ fontSize: 15, fontWeight: 600, color: "#e2e8f0" }}>{skill.name}</span>
                      </div>
                      <span style={{ fontSize: 13, color: "#3b82f6", fontWeight: 600 }}>{skill.level}%</span>
                    </div>
                    {/* Progress bar */}
                    <div style={{ height: 4, background: "#1e293b", borderRadius: 99, overflow: "hidden" }}>
                      <div style={{
                        height: "100%", borderRadius: 99,
                        background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                        width: `${skill.level}%`,
                        transition: "width 1.5s ease",
                        boxShadow: "0 0 10px rgba(59,130,246,0.5)",
                      }} />
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ background: "#0a0f1a", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <FadeUp>
              <div style={{ textAlign: "center", marginBottom: "4rem" }}>
                <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 12, fontWeight: 600 }}>What I've Built</div>
                <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                  My <span style={{ color: "#3b82f6" }}>Projects</span>
                </h2>
                <p style={{ fontSize: 16, color: "#64748b", maxWidth: 500, margin: "0 auto" }}>
                  Real projects built from scratch — each one demonstrating a different skill set.
                </p>
              </div>
            </FadeUp>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
              {PROJECTS.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ background: "#0a0c14", padding: "6rem 2rem" }}>
          <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
            <FadeUp>
              <div style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: "#3b82f6", marginBottom: 12, fontWeight: 600 }}>Get In Touch</div>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.02em" }}>
                Let's Work <span style={{ color: "#3b82f6" }}>Together</span>
              </h2>
              <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.8, marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
                Have a project in mind? I'd love to help you build something great. Reach out and let's talk.
              </p>

              {/* Contact cards */}
              <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
                <div style={{
                  background: "#111827", border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "1.5rem", cursor: "pointer", transition: "all 0.3s",
                }}
                  onClick={copyEmail}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>✉️</div>
                  <div style={{ fontSize: 12, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Email</div>
                  <div style={{ fontSize: 13, color: "#60a5fa", fontWeight: 500 }}>
                    {copied ? "✓ Copied!" : "prasadrahul0612@gmail.com"}
                  </div>
                </div>
                <a href="https://github.com/Rahul-hzb" target="_blank" rel="noopener noreferrer" style={{
                  background: "#111827", border: "0.5px solid rgba(255,255,255,0.08)",
                  borderRadius: 16, padding: "1.5rem", textDecoration: "none", transition: "all 0.3s", display: "block",
                }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(59,130,246,0.4)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>🐙</div>
                  <div style={{ fontSize: 12, color: "#475569", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>GitHub</div>
                  <div style={{ fontSize: 13, color: "#60a5fa", fontWeight: 500 }}>Rahul-hzb</div>
                </a>
              </div>

              <button onClick={() => window.location.href = "mailto:prasadrahul0612@gmail.com"} style={{
                background: "#3b82f6", border: "none", color: "#fff",
                padding: "16px 48px", borderRadius: 14, fontSize: 16, fontWeight: 600,
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s",
                boxShadow: "0 0 40px rgba(59,130,246,0.3)", letterSpacing: "0.02em",
              }}
                onMouseOver={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = "0 0 60px rgba(59,130,246,0.5)"; }}
                onMouseOut={e => { e.target.style.transform = "translateY(0)"; e.target.style.boxShadow = "0 0 40px rgba(59,130,246,0.3)"; }}
              >
                Send Me an Email →
              </button>
            </FadeUp>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          background: "#060810", borderTop: "0.5px solid rgba(255,255,255,0.05)",
          padding: "2rem", textAlign: "center",
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", marginBottom: 8 }}>
            Rahul<span style={{ color: "#3b82f6" }}>.</span>
          </div>
          <div style={{ fontSize: 12, color: "#1e293b", letterSpacing: "0.1em" }}>
            © 2025 Rahul Prasad · Built with React · Designed with ❤️
          </div>
        </footer>

      </div>

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes heroLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes heroRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes bounce { 0%,100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(8px); } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes blob1 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(30px,20px) scale(1.1); } }
        @keyframes blob2 { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-20px,30px) scale(0.9); } }
        @keyframes blob3 { 0%,100% { transform: translate(-50%,-50%) scale(1); } 50% { transform: translate(-50%,-50%) scale(1.2); } }
        html { scroll-behavior: smooth; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; text-align: center !important; }
          .hero-buttons { justify-content: center !important; }
          .hero-social { justify-content: center !important; }
          .hero-illustration { order: -1; }
          .hero-illustration > div { width: min(240px, 75vw) !important; height: min(240px, 75vw) !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .desktop-nav-links { display: none !important; }
          .hire-btn { display: none !important; }
        }
        #projects { background: #0a0f1a !important; }
        #projects h2 { color: #fff !important; }
        #projects p { color: #94a3b8 !important; }
      `}</style>
    </>
  );
}
