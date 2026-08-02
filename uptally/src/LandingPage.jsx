import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  ShieldAlert,
  MessageSquareText,
  ListChecks,
  Zap,
  Check,
  X,
  ChevronDown,
  ArrowRight,
  MousePointerClick,
  ScanSearch,
  ClipboardCheck,
  CircleDot,
  Sun,
  Moon,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Global tokens                                                          */
/* ---------------------------------------------------------------------- */

const Tokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');

    html { scroll-behavior: smooth; }
    html, body { max-width: 100%; overflow-x: hidden; }

    .jr-root {
      --bg: #010301;
      --bg-soft: #071108;
      --surface: rgba(19, 34, 21, .62);
      --surface-2: rgba(42, 83, 48, .52);
      --border: rgba(121, 154, 109, .32);
      --border-soft: rgba(121, 154, 109, .18);
      --text: #fbfefc;
      --text-dim: #adb2aa;
      --text-faint: #718174;
      --accent: #72ed7b;
      --accent-2: #a4ff9d;
      --flag: #d4a15c;
      --good: #72ed7b;
      font-family: 'Inter', sans-serif;
      font-weight: 600;
      background: var(--bg);
      color: var(--text);
      overflow-x: hidden;
    }
    .jr-root.light {
      --bg: #e8eee7;
      --bg-soft: #dfe8df;
      --surface: #f3f7f1;
      --surface-2: #d1dfd1;
      --border: #b6c8b7;
      --border-soft: #cbd8cc;
      --text: #17231a;
      --text-dim: #536457;
      --text-faint: #718174;
      --accent: #3d713d;
      --accent-2: #326735;
      --flag: #9a6428;
      --good: #3d713d;
    }
    .jr-display { font-family: 'Poppins', sans-serif; }
    .jr-mono { font-family: 'Poppins', sans-serif; }

    .jr-grain {
      background-image: linear-gradient(rgba(155,207,104,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(155,207,104,0.025) 1px, transparent 1px);
      background-size: 64px 64px;
    }
    .jr-card {
      background: var(--surface);
      border: 1px solid var(--border);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 24px 80px -50px rgba(44,172,57,.8);
    }
    .jr-card-soft {
      background: rgba(7, 17, 8, .68);
      border: 1px solid var(--border-soft);
      backdrop-filter: blur(14px);
    }
    .jr-btn-primary {
      color: var(--text);
      background: rgba(4, 12, 5, .68);
      border: 1px solid var(--accent);
      box-shadow: 0 0 34px -15px rgba(44,172,57,.9), inset 0 1px 0 rgba(255,255,255,.1);
    }
    .jr-btn-primary:hover { filter: brightness(1.07); }
    .jr-btn-ghost {
      background: rgba(4, 12, 5, .38);
      border: 1px solid var(--border);
    }
    .jr-btn-ghost:hover { background: rgba(44,172,57,0.10); border-color: var(--accent); }
    .jr-root:not(.light) .jr-btn-ghost {
      color: #fbfefc;
      background: rgba(1, 3, 1, .82);
      border-color: rgba(164, 255, 157, .72);
    }
    .jr-root.light .jr-btn-ghost {
      color: #17311a;
      background: rgba(243, 247, 241, .96);
      border-color: #277b36;
    }

    .jr-text-dim { color: var(--text-dim); }
    .jr-text-faint { color: var(--text-faint); }
    .jr-accent { color: var(--accent-2); }
    .jr-border { border-color: var(--border); }

    .jr-glow {
      background: radial-gradient(50% 50% at 50% 50%, rgba(44,172,57,0.28) 0%, rgba(44,172,57,0) 70%);
    }
    .jr-glow-flag {
      background: radial-gradient(50% 50% at 50% 50%, rgba(255,138,92,0.18) 0%, rgba(255,138,92,0) 70%);
    }
    .jr-hairline {
      background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
      height: 1px;
    }
    .jr-nav-blur {
      background: color-mix(in srgb, var(--bg) 84%, transparent);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    ::selection { background: rgba(44,172,57,0.35); color: #fff; }
    .jr-section-label { border-left: 2px solid var(--accent); padding-left: 12px; }
    .jr-number { color: var(--accent); font-variant-numeric: tabular-nums; }
    .jr-theme-toggle { border: 1px solid var(--border); background: var(--surface); color: var(--text-dim); }
    .jr-theme-toggle:hover { color: var(--text); border-color: var(--accent); }
    .jr-browser-chrome { background: var(--bg-soft); }
    .jr-browser-url { background: var(--surface); }
    .jr-browser-body { background: var(--bg); }
    .jr-browser-insights { background: var(--surface); }
    .jr-skeleton { background: var(--surface-2); }
    .jr-root.light .jr-glow { opacity: .18; }
    .jr-root.light .jr-btn-primary { color: #f3f7f1; }
    .jr-root.light .jr-card { box-shadow: 0 18px 40px -30px rgba(31, 73, 38, .35); }
    .jr-root.light .jr-grain { background-image: linear-gradient(rgba(61,113,61,.055) 1px, transparent 1px), linear-gradient(90deg, rgba(61,113,61,.055) 1px, transparent 1px); }
    .jr-reference-hero { background: radial-gradient(ellipse 52% 48% at 50% 20%, rgba(19,88,24,.38), transparent 70%); }
    .jr-orbit { border: 1px solid rgba(155,207,104,.16); border-radius: 999px; transform: rotate(-12deg); }
    .jr-orbit::after { content: ''; position: absolute; inset: 10%; border: 1px solid rgba(155,207,104,.12); border-radius: inherit; }
    .jr-root.light .jr-reference-hero { background: radial-gradient(ellipse 52% 48% at 50% 20%, rgba(61,113,61,.16), transparent 70%); }
    .jr-root.light .jr-btn-primary { color: #17311b; background: rgba(243,247,241,.7); }
    .jr-btn-primary svg { color: #08210b; background: var(--accent); border-radius: 999px; padding: 4px; width: 24px; height: 24px; }
    .jr-btn-ghost svg { color: var(--accent); }
    .jr-nav-shell { background: rgba(10, 25, 12, .82); border: 1px solid rgba(61,113,61,.45); box-shadow: 0 18px 50px -30px rgba(44,172,57,.6); }
    .jr-root.light .jr-nav-shell { background: rgba(243,247,241,.86); }
    .jr-root:not(.light) .jr-nav-shell { background: rgba(1, 3, 1, .92); border-color: rgba(164, 255, 157, .42); }
    .jr-root:not(.light) .jr-nav-shell a { color: #fbfefc; }
    .jr-root:not(.light) .jr-nav-shell a:hover { color: #72ed7b; }
    .jr-root.light .jr-nav-shell { border-color: rgba(39, 123, 54, .45); }
    .jr-root.light .jr-nav-shell a { color: #277b36; }
    .jr-root.light .jr-nav-shell a:hover { color: #17311a; }
    .jr-root:not(.light) .jr-nav-shell {
      background: #fbfefc;
      border-color: #fbfefc;
      color: #010301;
      box-shadow: 0 18px 50px -28px rgba(114, 237, 123, .8);
    }
    .jr-root:not(.light) .jr-nav-shell a,
    .jr-root:not(.light) .jr-nav-shell .jr-display { color: #010301; }
    .jr-root:not(.light) .jr-nav-shell a:hover { color: #277b36; }
    .jr-root:not(.light) .jr-nav-shell .jr-theme-toggle { color: #010301; border-color: rgba(1,3,1,.28); background: rgba(1,3,1,.06); }
    .jr-root:not(.light) .jr-nav-shell .jr-btn-primary {
      color: #fbfefc;
      background: #010301;
      border-color: #277b36;
    }
    .jr-root.light .jr-nav-shell {
      background: #277b36;
      border-color: #72ed7b;
      color: #fbfefc;
      box-shadow: 0 18px 50px -28px rgba(39, 123, 54, .8);
    }
    .jr-root.light .jr-nav-shell a,
    .jr-root.light .jr-nav-shell .jr-display { color: #fbfefc; }
    .jr-root.light .jr-nav-shell a:hover { color: #d7ffd6; }
    .jr-root.light .jr-nav-shell .jr-theme-toggle { color: #fbfefc; border-color: rgba(255,255,255,.55); background: rgba(1,3,1,.12); }
    .jr-root.light .jr-nav-shell .jr-btn-primary {
      color: #17311a;
      background: #fbfefc;
      border-color: #fbfefc;
    }
    .jr-hero-audience { background: #fbfefc; border-color: #fbfefc; color: #010301; }
    .jr-root.light .jr-hero-audience { background: #0e2b12; border-color: #2cac39; color: #d7ffd6; }
    .jr-hero-rings { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
    .jr-hero-ring { position: absolute; border: 1px solid rgba(44,172,57,.9); border-radius: 50%; background: radial-gradient(ellipse at 50% 50%, rgba(44,172,57,.16), transparent 62%); box-shadow: inset 0 0 26px rgba(44,172,57,.35), 0 0 28px rgba(44,172,57,.28); filter: drop-shadow(0 0 14px rgba(44,172,57,.45)); }
    .jr-hero-ring.one { width: 46vw; height: 26vw; left: -8vw; top: 25%; transform: rotate(48deg); }
    .jr-hero-ring.two { width: 44vw; height: 24vw; right: -6vw; top: 2%; transform: rotate(-47deg); }
    .jr-hero-ring.three { width: 33vw; height: 19vw; left: 34%; top: 14%; transform: rotate(34deg); opacity: .72; }
    .jr-hero-ring.four { width: 27vw; height: 17vw; left: 20%; bottom: -4%; transform: rotate(23deg); opacity: .55; }
    .jr-hero-ring::after { content: ''; position: absolute; inset: 5%; border: 1px solid rgba(44,172,57,.35); border-radius: inherit; }

    @media (prefers-reduced-motion: reduce) {
      * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
    }
  `}</style>
);

/* ---------------------------------------------------------------------- */
/*  Shared bits                                                            */
/* ---------------------------------------------------------------------- */

const Eyebrow = ({ children }) => (
  <div className="jr-mono jr-accent text-[11px] tracking-[0.18em] uppercase inline-flex items-center gap-2 mb-5">
    <CircleDot size={12} strokeWidth={2.5} />
    {children}
  </div>
);

const PrimaryButton = ({ children, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`jr-btn-primary jr-display text-[var(--bg)] text-[15px] font-medium px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);

const GhostButton = ({ children, className = "", onClick }) => (
  <button
    onClick={onClick}
    className={`jr-btn-ghost text-[var(--text)] text-[15px] font-medium px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${className}`}
  >
    {children}
  </button>
);

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Reveal = ({ children, className = "", i = 0 }) => (
  <motion.div
    className={className}
    variants={fadeUp}
    custom={i}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
  >
    {children}
  </motion.div>
);

/* ---------------------------------------------------------------------- */
/*  Browser mockup — the signature element                                 */
/* ---------------------------------------------------------------------- */

const ScoreRing = ({ value = 82 }) => {
  const r = 34;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div className="relative w-[92px] h-[92px] shrink-0">
      <svg width="92" height="92" viewBox="0 0 92 92" className="-rotate-90">
        <circle cx="46" cy="46" r={r} stroke="#303a32" strokeWidth="7" fill="none" />
        <motion.circle
          cx="46"
          cy="46"
          r={r}
          stroke="var(--accent)"
          strokeWidth="7"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="jr-display text-xl font-semibold">{value}</span>
        <span className="jr-mono text-[9px] jr-text-faint tracking-wide">MATCH</span>
      </div>
    </div>
  );
};

const BrowserMockup = () => {
  const ref = useRef(null);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
      style={{ perspective: 1200 }}
      className="relative w-full max-w-[980px] mx-auto"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="rounded-2xl overflow-hidden jr-card shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
      >
        {/* chrome bar */}
        <div className="jr-browser-chrome flex items-center gap-3 px-4 py-3 border-b jr-border">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3d48]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3d48]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3d48]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="jr-browser-url jr-mono text-[11px] jr-text-faint border jr-border rounded-md px-3 py-1 flex items-center gap-1.5 max-w-[360px] w-full justify-center">
              <span className="opacity-60">upwork.com/jobs/senior-react-developer</span>
            </div>
          </div>
          <div className="w-14" />
        </div>

        {/* body */}
        <div className="jr-browser-body grid md:grid-cols-[1.35fr_1fr]">
          {/* job post column */}
          <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r jr-border">
            <div className="jr-mono text-[10px] jr-text-faint tracking-widest mb-3">JOB POST</div>
            <h4 className="jr-display text-lg font-semibold mb-2 leading-snug">
              Senior React Developer for SaaS Dashboard
            </h4>
            <div className="flex flex-wrap gap-2 mb-5">
              {["Fixed price", "$3,000 - $5,000", "Expert"].map((t) => (
                <span key={t} className="text-[11px] jr-text-dim border jr-border rounded-full px-2.5 py-1">
                  {t}
                </span>
              ))}
            </div>
            <div className="space-y-2.5">
              {[100, 96, 88, 60].map((w, idx) => (
                <div key={idx} className="jr-skeleton h-2.5 rounded-full" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-6 pt-5 border-t jr-border-soft flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#344136]" />
              <div>
                <div className="text-[12px] font-medium">Payment verified</div>
                <div className="text-[11px] jr-text-faint">4.9 rating &middot; 22 jobs posted</div>
              </div>
            </div>
          </div>

          {/* insights panel */}
          <div className="jr-browser-insights p-6 md:p-8">
            <div className="jr-mono text-[10px] jr-text-faint tracking-widest mb-4 flex items-center gap-1.5">
              <Zap size={11} className="jr-accent" /> AI INSIGHTS
            </div>
            <div className="flex items-center gap-4 mb-5">
              <ScoreRing value={82} />
              <div>
                <div className="text-[13px] font-medium mb-1">Strong match</div>
                <div className="text-[12px] jr-text-dim leading-relaxed">
                  Your React and TypeScript experience lines up closely with what this client needs.
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-5">
              {[
                { label: "Client history looks solid", tone: "good" },
                { label: "Scope is clearly defined", tone: "good" },
                { label: "Budget slightly below market", tone: "flag" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2 text-[12.5px]">
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: row.tone === "good" ? "var(--good)" : "var(--flag)" }}
                  />
                  <span className="jr-text-dim">{row.label}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl border jr-border bg-[#1b201c] px-4 py-3">
              <div className="text-[11px] jr-mono jr-text-faint tracking-wide mb-1">RECOMMENDATION</div>
              <div className="text-[13px] font-medium text-[var(--good)]">Worth your time</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ambient glow behind mockup */}
      <div className="jr-glow absolute -inset-24 -z-10 blur-3xl opacity-70" />
    </motion.div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Navigation                                                             */
/* ---------------------------------------------------------------------- */

const Nav = ({ theme, onToggleTheme }) => {
  const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="jr-nav-shell max-w-6xl mx-auto px-5 h-[68px] rounded-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-11 h-11 rounded-xl bg-white border border-white/80 overflow-hidden flex items-center justify-center">
            <img src="/upTally_logo_removebg.png" alt="UpTally" className="w-full h-full object-contain" />
          </div>
          <span className="jr-display font-semibold text-[15px] tracking-tight">UpTally</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-[13.5px] jr-text-dim hover:text-[var(--text)] transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            aria-pressed={theme === "light"}
            className="jr-theme-toggle rounded-full w-9 h-9 inline-flex items-center justify-center transition-colors"
          >
            {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <PrimaryButton onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })} className="!px-4 !py-2.5 text-[13.5px]">
            Download Now
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Hero                                                                   */
/* ---------------------------------------------------------------------- */

const Hero = () => (
  <section className="jr-reference-hero relative pt-32 lg:pt-36 pb-20 px-6 overflow-hidden">
    <div className="jr-hero-rings">
      <div className="jr-hero-ring one" />
      <div className="jr-hero-ring two" />
      <div className="jr-hero-ring three" />
      <div className="jr-hero-ring four" />
    </div>
    <div className="max-w-7xl mx-auto relative text-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <div className="jr-hero-audience inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[12px] mb-7">
          <span className="w-5 h-5 rounded-full bg-[#70ed7c] text-[#08210b] inline-flex items-center justify-center font-bold">↗</span>
          Built for Upwork freelancers
        </div>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="jr-display max-w-6xl mx-auto text-[2.9rem] leading-[1.06] sm:text-6xl lg:text-[6.2rem] lg:leading-[.98] font-semibold tracking-[-0.07em] mb-7"
      >
        Stop spending hours deciding <span className="jr-accent">which jobs</span> to apply for.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="jr-text-dim text-[16px] sm:text-[17px] leading-relaxed max-w-xl mx-auto mb-9"
      >
        Our Chrome extension analyses Upwork job posts in seconds, highlights what matters, and helps you decide whether a job is worth your time.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3"
      >
        <PrimaryButton onClick={() => document.getElementById("download")?.scrollIntoView({ behavior: "smooth" })} className="w-full sm:w-auto">
          Download Extension <ArrowRight size={16} />
        </PrimaryButton>
        <GhostButton
          className="w-full sm:w-auto"
          onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
        >
          See How It Works
        </GhostButton>
      </motion.div>

    </div>
  </section>
);

const SignalStrip = () => (
  <section className="px-6 pb-24 lg:pb-32">
    <div className="max-w-7xl mx-auto border-y jr-border grid sm:grid-cols-3">
      {[
        ["01", "ONE CLICK", "No copying. No extra tabs."],
        ["02", "INSTANT MATCH", "See how well a job fits before spending connects."],
        ["03", "ZERO GUESSWORK", "Know what deserves your time."],
      ].map(([number, label, body]) => (
        <div key={number} className="py-5 px-5 first:pl-0 sm:border-r last:border-r-0 jr-border">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="jr-mono jr-number text-[10px]">{number}</span>
            <span className="jr-mono text-[10px] tracking-[0.16em]">{label}</span>
          </div>
          <p className="jr-text-dim text-[13px]">{body}</p>
        </div>
      ))}
    </div>
  </section>
);

const ProductProof = () => (
  <section className="px-6 pb-24 lg:pb-32 overflow-hidden">
    <div className="max-w-6xl mx-auto relative">
      <div className="absolute -inset-16 jr-glow blur-3xl opacity-50 pointer-events-none" />
      <BrowserMockup />
    </div>
  </section>
);

/* ---------------------------------------------------------------------- */
/*  Problem                                                                */
/* ---------------------------------------------------------------------- */

const Problem = () => {
  const questions = [
    "Is this client serious?",
    "Does this match my skills?",
    "Are there any hidden red flags?",
    "Is this worth spending time on?",
  ];
  return (
    <section className="px-6 py-24 lg:py-32 border-t jr-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-24">
        <Reveal>
          <div className="jr-section-label jr-mono text-[11px] tracking-[0.18em] uppercase jr-accent mb-6">The bottleneck</div>
          <h2 className="jr-display text-3xl sm:text-5xl font-semibold tracking-tight mb-6 leading-[1.03]">
            Freelancers don&apos;t just spend time applying.
            <br /> <span className="jr-text-dim">They spend time deciding.</span>
          </h2>
        </Reveal>
        <div>
        <Reveal i={1}>
          <p className="jr-text-dim max-w-xl mb-10 leading-relaxed">
            Every day, freelancers scroll through dozens of job posts trying to answer
            the same questions.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0 mb-10 border-t jr-border">
          {questions.map((q, i) => (
            <Reveal i={i} key={q}>
              <div className="border-b jr-border py-5 text-[14.5px] jr-text-dim flex gap-4">
                <span className="jr-mono jr-number text-[10px] pt-1">0{i + 1}</span><span>&ldquo;{q}&rdquo;</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal i={2}>
          <p className="jr-text-faint text-[14.5px] max-w-lg">
            Reading every job manually takes time, and it often means missing better
            opportunities while you&apos;re still deciding on this one.
          </p>
        </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------- */
/*  How it works                                                           */
/* ---------------------------------------------------------------------- */

const HowItWorks = () => {
  const steps = [
    {
      icon: MousePointerClick,
      title: "Open any Upwork job",
      body: "Browse Upwork the way you already do. No new workflow to learn.",
    },
    {
      icon: ScanSearch,
      title: "The extension analyses it",
      body: "It reads the post and pulls out the details that actually matter.",
    },
    {
      icon: ClipboardCheck,
      title: "Review and decide",
      body: "See the insights, weigh the trade offs, and move on faster.",
    },
  ];

  return (
    <section id="how" className="px-6 py-24 border-t jr-border">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[.55fr_1.45fr] gap-14 lg:gap-24">
        <Reveal className="mb-12">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="jr-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.04]">
            Three steps, a few seconds each.
          </h2>
        </Reveal>

        <div className="relative grid gap-0 border-t jr-border">
          {steps.map((s, i) => (
            <Reveal i={i} key={s.title} className="relative">
              <div className="grid sm:grid-cols-[72px_1fr_1fr] items-start gap-5 sm:gap-8 py-7 border-b jr-border">
                <div className="jr-mono jr-number text-sm pt-1">0{i + 1}</div>
                <div className="flex items-center gap-4">
                <div className="jr-card w-10 h-10 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[var(--bg)]">
                  <s.icon size={18} className="jr-accent" strokeWidth={2} />
                </div>
                <h3 className="jr-display font-semibold text-[17px]">{s.title}</h3>
                </div>
                <div>
                  <p className="jr-text-dim text-[14px] leading-relaxed sm:max-w-[220px] sm:mx-auto">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------- */
/*  Features                                                               */
/* ---------------------------------------------------------------------- */

const Features = () => {
  const features = [
    {
      icon: Target,
      title: "Skill Match Analysis",
      body: "See how closely a job lines up with the skills you actually list on your profile.",
    },
    {
      icon: ShieldAlert,
      title: "Red Flag Detection",
      body: "Vague scopes, unrealistic budgets, and other warning signs get called out before you apply.",
    },
    {
      icon: MessageSquareText,
      title: "Proposal Insights",
      body: "Get a sense of what to lead with, based on what the client seems to actually care about.",
    },
    {
      icon: ListChecks,
      title: "Key Requirements",
      body: "The must-haves are pulled out of the post, so you don't have to hunt for them yourself.",
    },
    {
      icon: Zap,
      title: "One-Click Analysis",
      body: "One click on any open job post. No copying, no pasting, no extra tabs.",
    },
  ];

  return (
    <section id="features" className="px-6 py-24 lg:py-32 border-t jr-border">
      <div className="max-w-7xl mx-auto">
        <Reveal className="mb-14 max-w-2xl">
          <Eyebrow>Features</Eyebrow>
          <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Everything you need to decide faster.
          </h2>
          <p className="jr-text-dim leading-relaxed">
            Not more information. The right information, surfaced where you're already
            looking.
          </p>
        </Reveal>

        <div className="border-t jr-border">
          {features.map((f, i) => (
            <Reveal i={i} key={f.title}>
              <motion.div
                whileHover={{ x: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="grid md:grid-cols-[72px_1fr_1.15fr_48px] gap-5 md:gap-8 items-center py-6 border-b jr-border group"
              >
                <div className="jr-mono jr-number text-sm">0{i + 1}</div>
                <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-2)] border jr-border flex items-center justify-center shrink-0">
                  <f.icon size={17} className="jr-accent" strokeWidth={2} />
                </div>
                <h3 className="jr-display font-semibold text-[15.5px]">{f.title}</h3>
                </div>
                <p className="jr-text-dim text-[14px] leading-relaxed">{f.body}</p>
                <ArrowRight size={17} className="jr-text-faint group-hover:text-[var(--accent)] transition-colors" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------- */
/*  Comparison                                                             */
/* ---------------------------------------------------------------------- */

const Comparison = () => {
  const without = [
    "Read every job manually",
    "Compare requirements yourself",
    "Look for hidden red flags",
    "Spend several minutes deciding",
  ];
  const withExt = [
    "Instant analysis",
    "Important information highlighted",
    "Clear recommendations",
    "Faster decision making",
  ];

  return (
    <section className="px-6 py-24 border-t jr-border">
      <div className="max-w-4xl mx-auto">
        <Reveal className="text-center mb-14">
          <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight">
            The difference is the time you get back.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          <Reveal>
            <div className="rounded-2xl border border-dashed jr-border p-7 h-full">
              <div className="jr-mono text-[11px] jr-text-faint tracking-widest mb-5">
                WITHOUT THE EXTENSION
              </div>
              <div className="space-y-3.5">
                {without.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <X size={15} className="jr-text-faint shrink-0" strokeWidth={2} />
                    <span className="jr-text-dim text-[14.5px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal i={1}>
            <div className="rounded-2xl jr-card p-7 h-full relative overflow-hidden">
              <div className="jr-glow absolute -top-16 -right-16 w-48 h-48 blur-3xl opacity-40 pointer-events-none" />
              <div className="jr-mono text-[11px] jr-accent tracking-widest mb-5 relative">
                WITH THE EXTENSION
              </div>
              <div className="space-y-3.5 relative">
                {withExt.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check size={15} className="text-[var(--good)] shrink-0" strokeWidth={2.4} />
                    <span className="text-[14.5px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------- */
/*  Who it's for                                                           */
/* ---------------------------------------------------------------------- */

const WhoFor = () => (
  <section className="px-6 py-24 border-t jr-border">
    <div className="max-w-3xl mx-auto text-center">
      <Reveal>
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight mb-6 leading-tight">
          Built for freelancers who value their time.
        </h2>
      </Reveal>
      <Reveal i={1}>
        <p className="jr-text-dim text-[16px] leading-relaxed mb-4">
          If you regularly browse Upwork, compare multiple job posts, and spend too
          much time deciding what to apply for, this extension is built for you.
        </p>
        <p className="jr-text-dim text-[16px] leading-relaxed">
          Instead of reading every job from top to bottom, get the information that
          matters most and make decisions with confidence.
        </p>
      </Reveal>
    </div>
  </section>
);

/* ---------------------------------------------------------------------- */
/*  FAQ                                                                    */
/* ---------------------------------------------------------------------- */

const FAQItem = ({ q, a, open, onClick }) => (
  <div className="border-b jr-border">
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between py-6 text-left gap-4"
    >
      <span className="jr-display font-medium text-[16px]">{q}</span>
      <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
        <ChevronDown size={18} className="jr-text-dim shrink-0" />
      </motion.span>
    </button>
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="jr-text-dim text-[14.5px] leading-relaxed pb-6 pr-8">{a}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const items = [
    {
      q: "Is it available now?",
      a: "Yes! You can download the extension directly from this page and install it in your browser following the instructions above.",
    },
    {
      q: "Do I need to install anything?",
      a: "Just the Chrome extension. There's no separate desktop app or account setup required to start using it.",
    },
    {
      q: "Is it free?",
      a: "Yes, it is completely free to use right now. Pricing for premium features may be announced in the future.",
    },
  ];

  return (
    <section id="faq" className="px-6 py-24 border-t jr-border">
      <div className="max-w-2xl mx-auto">
        <Reveal className="mb-10">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Questions, answered.
          </h2>
        </Reveal>
        <Reveal i={1}>
          <div>
            {items.map((item, i) => (
              <FAQItem
                key={item.q}
                q={item.q}
                a={item.a}
                open={openIndex === i}
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ---------------------------------------------------------------------- */
/*  Final CTA                                                              */
/* ---------------------------------------------------------------------- */

const DownloadSection = () => (
  <section id="download" className="px-6 py-24 border-t jr-border">
    <Reveal>
      <div className="max-w-4xl mx-auto text-center relative rounded-3xl jr-card px-8 py-12 md:py-16 overflow-hidden">
        <div className="jr-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] blur-3xl opacity-50 pointer-events-none" />
        <div className="relative">
          <h2 className="jr-display text-3xl sm:text-[2.5rem] font-semibold tracking-tight mb-4 leading-tight">
            Ready to stop wasting time?
          </h2>
          <p className="jr-text-dim text-[16px] mb-9 max-w-xl mx-auto leading-relaxed">
            Download the extension directly and load it into your browser to start finding better Upwork jobs today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a href="/downloads/UpTally.zip" download className="w-full sm:w-auto">
              <PrimaryButton className="w-full">
                Download Extension (.zip) <ArrowRight size={16} />
              </PrimaryButton>
            </a>
          </div>

          <div className="text-left max-w-2xl mx-auto pt-10 border-t jr-border">
             <Eyebrow>How to install</Eyebrow>
             <h3 className="jr-display text-2xl font-semibold mb-8">Load the extension in 4 simple steps</h3>
             <div className="grid sm:grid-cols-2 gap-8">
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center font-bold shrink-0">1</div>
                 <div>
                   <h4 className="jr-display font-semibold mb-1 text-[15.5px]">Extract the ZIP</h4>
                   <p className="jr-text-dim text-[14px]">Extract the downloaded <code className="jr-mono bg-[var(--surface-2)] px-1.5 py-0.5 rounded text-[12px]">UpTally.zip</code> file to a folder on your computer.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center font-bold shrink-0">2</div>
                 <div>
                   <h4 className="jr-display font-semibold mb-1 text-[15.5px]">Open Extensions</h4>
                   <p className="jr-text-dim text-[14px]">In Chrome, navigate to <code className="jr-mono bg-[var(--surface-2)] px-1.5 py-0.5 rounded text-[12px]">chrome://extensions</code> in your address bar.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center font-bold shrink-0">3</div>
                 <div>
                   <h4 className="jr-display font-semibold mb-1 text-[15.5px]">Developer mode</h4>
                   <p className="jr-text-dim text-[14px]">Toggle the <strong>Developer mode</strong> switch in the top right corner of the page.</p>
                 </div>
               </div>
               <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-[var(--surface-2)] text-[var(--accent)] flex items-center justify-center font-bold shrink-0">4</div>
                 <div>
                   <h4 className="jr-display font-semibold mb-1 text-[15.5px]">Load unpacked</h4>
                   <p className="jr-text-dim text-[14px]">Click <strong>Load unpacked</strong> and select the folder you extracted in step 1.</p>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

/* ---------------------------------------------------------------------- */
/*  Footer                                                                 */
/* ---------------------------------------------------------------------- */

const Footer = () => (
  <footer className="px-6 py-10 border-t jr-border">
    <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-lg bg-white border border-white/80 overflow-hidden flex items-center justify-center">
          <img src="/upTally_logo_removebg.png" alt="UpTally" className="w-full h-full object-contain" />
        </div>
        <span className="jr-display font-semibold text-[14px]">UpTally</span>
      </div>

      <div className="flex items-center gap-6 text-[13px] jr-text-dim">
        <a href="#" className="hover:text-[var(--text)] transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-[var(--text)] transition-colors">Terms</a>
        <a href="#" className="hover:text-[var(--text)] transition-colors">Contact</a>
      </div>

      <a href="mailto:hello@uptally.app" className="jr-mono text-[13px] jr-text-faint hover:text-[var(--text)] transition-colors">
        hello@uptally.app
      </a>
    </div>
  </footer>
);

/* ---------------------------------------------------------------------- */
/*  Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function LandingPage() {
  const [theme, setTheme] = useState(() => localStorage.getItem("uptally-theme") || "dark");
  useEffect(() => {
    localStorage.setItem("uptally-theme", theme);
  }, [theme]);

  return (
    <div className={`jr-root jr-grain min-h-screen antialiased ${theme}`}>
      <Tokens />
      <Nav theme={theme} onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")} />
      <Hero />
      <SignalStrip />
      <ProductProof />
      <Problem />
      <HowItWorks />
      <Features />
      <Comparison />
      <WhoFor />
      <FAQ />
      <DownloadSection />
      <Footer />
    </div>
  );
}
