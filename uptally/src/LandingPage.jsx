import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
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
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Global tokens                                                          */
/* ---------------------------------------------------------------------- */

const Tokens = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    .jr-root {
      --bg: #0a0b10;
      --bg-soft: #0d0f16;
      --surface: #14161f;
      --surface-2: #191c26;
      --border: #262a36;
      --border-soft: #1c1f29;
      --text: #f2f3f6;
      --text-dim: #9aa0b1;
      --text-faint: #5c6274;
      --accent: #7c5cfc;
      --accent-2: #a48bff;
      --flag: #ff8a5c;
      --good: #3ddc9a;
      font-family: 'Inter', sans-serif;
      background: var(--bg);
      color: var(--text);
    }
    .jr-display { font-family: 'Bricolage Grotesque', sans-serif; }
    .jr-mono { font-family: 'JetBrains Mono', monospace; }

    .jr-grain {
      background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.035) 1px, transparent 0);
      background-size: 26px 26px;
    }
    .jr-card {
      background: var(--surface);
      border: 1px solid var(--border);
    }
    .jr-card-soft {
      background: var(--bg-soft);
      border: 1px solid var(--border-soft);
    }
    .jr-btn-primary {
      background: linear-gradient(180deg, #8a6bff 0%, #7148f0 100%);
      box-shadow: 0 1px 0 rgba(255,255,255,0.18) inset, 0 8px 24px -8px rgba(124,92,252,0.65);
    }
    .jr-btn-primary:hover { filter: brightness(1.07); }
    .jr-btn-ghost {
      background: rgba(255,255,255,0.02);
      border: 1px solid var(--border);
    }
    .jr-btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: #33384a; }

    .jr-text-dim { color: var(--text-dim); }
    .jr-text-faint { color: var(--text-faint); }
    .jr-accent { color: var(--accent-2); }
    .jr-border { border-color: var(--border); }

    .jr-glow {
      background: radial-gradient(50% 50% at 50% 50%, rgba(124,92,252,0.28) 0%, rgba(124,92,252,0) 70%);
    }
    .jr-glow-flag {
      background: radial-gradient(50% 50% at 50% 50%, rgba(255,138,92,0.18) 0%, rgba(255,138,92,0) 70%);
    }
    .jr-hairline {
      background: linear-gradient(90deg, transparent, var(--border) 20%, var(--border) 80%, transparent);
      height: 1px;
    }
    .jr-nav-blur {
      background: rgba(10,11,16,0.72);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    ::selection { background: rgba(124,92,252,0.35); color: #fff; }

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
    className={`jr-btn-primary jr-display text-white text-[15px] font-medium px-6 py-3.5 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${className}`}
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
        <circle cx="46" cy="46" r={r} stroke="#232634" strokeWidth="7" fill="none" />
        <motion.circle
          cx="46"
          cy="46"
          r={r}
          stroke="#3ddc9a"
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
        <div className="flex items-center gap-3 px-4 py-3 border-b jr-border bg-[#101218]">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3d48]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3d48]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#3a3d48]" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="jr-mono text-[11px] jr-text-faint bg-[#181b24] border jr-border rounded-md px-3 py-1 flex items-center gap-1.5 max-w-[360px] w-full justify-center">
              <span className="opacity-60">upwork.com/jobs/senior-react-developer</span>
            </div>
          </div>
          <div className="w-14" />
        </div>

        {/* body */}
        <div className="grid md:grid-cols-[1.35fr_1fr] bg-[#0d0f16]">
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
                <div key={idx} className="h-2.5 rounded-full bg-[#1a1d27]" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="mt-6 pt-5 border-t jr-border-soft flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#232634]" />
              <div>
                <div className="text-[12px] font-medium">Payment verified</div>
                <div className="text-[11px] jr-text-faint">4.9 rating &middot; 22 jobs posted</div>
              </div>
            </div>
          </div>

          {/* insights panel */}
          <div className="p-6 md:p-8 bg-[#0f1119]">
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

            <div className="rounded-xl border jr-border bg-[#14161f] px-4 py-3">
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

const Nav = ({ onJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "jr-nav-blur border-b jr-border" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg jr-btn-primary flex items-center justify-center">
            <ScanSearch size={15} className="text-white" strokeWidth={2.4} />
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

        <PrimaryButton onClick={onJoin} className="!px-4 !py-2.5 text-[13.5px]">
          Join Waitlist
        </PrimaryButton>
      </div>
    </div>
  );
};

/* ---------------------------------------------------------------------- */
/*  Hero                                                                   */
/* ---------------------------------------------------------------------- */

const Hero = ({ onJoin }) => (
  <section className="relative pt-20 pb-28 px-6 overflow-hidden">
    <div className="absolute top-[-140px] left-1/2 -translate-x-1/2 w-[700px] h-[500px] jr-glow blur-3xl opacity-50 pointer-events-none" />
    <div className="max-w-4xl mx-auto text-center relative">
      <motion.div variants={fadeUp} initial="hidden" animate="show">
        <Eyebrow>Built for Upwork freelancers</Eyebrow>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={1}
        className="jr-display text-[2.6rem] leading-[1.08] sm:text-6xl sm:leading-[1.06] font-semibold tracking-tight mb-6"
      >
        Stop spending hours deciding{" "}
        <span className="jr-accent">which Upwork jobs</span> to apply for.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
        className="jr-text-dim text-[17px] sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
      >
        Our Chrome extension analyses Upwork job posts in seconds, highlights what
        matters, and helps you decide whether a job is worth your time.
      </motion.p>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={3}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20"
      >
        <PrimaryButton onClick={onJoin} className="w-full sm:w-auto">
          Join the Waitlist <ArrowRight size={16} />
        </PrimaryButton>
        <GhostButton
          className="w-full sm:w-auto"
          onClick={() => document.getElementById("how")?.scrollIntoView({ behavior: "smooth" })}
        >
          See How It Works
        </GhostButton>
      </motion.div>
    </div>

    <BrowserMockup />
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
    <section className="px-6 py-24 border-t jr-border">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight text-center mb-6 leading-tight">
            Freelancers don&apos;t just spend time applying.
            <br className="hidden sm:block" /> They spend time deciding.
          </h2>
        </Reveal>
        <Reveal i={1}>
          <p className="jr-text-dim text-center max-w-xl mx-auto mb-14 leading-relaxed">
            Every day, freelancers scroll through dozens of job posts trying to answer
            the same questions.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-3 mb-12">
          {questions.map((q, i) => (
            <Reveal i={i} key={q}>
              <div className="jr-card-soft rounded-xl px-5 py-4 text-[14.5px] jr-text-dim">
                &ldquo;{q}&rdquo;
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal i={2}>
          <p className="text-center jr-text-faint text-[14.5px] max-w-lg mx-auto">
            Reading every job manually takes time, and it often means missing better
            opportunities while you&apos;re still deciding on this one.
          </p>
        </Reveal>
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
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight">
            Three steps, a few seconds each.
          </h2>
        </Reveal>

        <div className="relative grid sm:grid-cols-3 gap-8">
          <div className="hidden sm:block absolute top-6 left-[16.5%] right-[16.5%] jr-hairline" />
          {steps.map((s, i) => (
            <Reveal i={i} key={s.title} className="relative">
              <div className="flex sm:flex-col items-start sm:items-center gap-4 sm:text-center">
                <div className="jr-card w-12 h-12 rounded-full flex items-center justify-center shrink-0 relative z-10 bg-[#0a0b10]">
                  <s.icon size={18} className="jr-accent" strokeWidth={2} />
                </div>
                <div>
                  <div className="jr-mono text-[11px] jr-text-faint tracking-widest mb-1">
                    STEP {i + 1}
                  </div>
                  <h3 className="jr-display font-semibold text-[16px] mb-1.5">{s.title}</h3>
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
    <section id="features" className="px-6 py-24 border-t jr-border">
      <div className="max-w-5xl mx-auto">
        <Reveal className="mb-14 max-w-xl">
          <Eyebrow>Features</Eyebrow>
          <h2 className="jr-display text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            Everything you need to decide faster.
          </h2>
          <p className="jr-text-dim leading-relaxed">
            Not more information. The right information, surfaced where you're already
            looking.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <Reveal i={i} key={f.title}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="jr-card rounded-2xl p-6 h-full"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1b1e29] border jr-border flex items-center justify-center mb-5">
                  <f.icon size={17} className="jr-accent" strokeWidth={2} />
                </div>
                <h3 className="jr-display font-semibold text-[15.5px] mb-2">{f.title}</h3>
                <p className="jr-text-dim text-[14px] leading-relaxed">{f.body}</p>
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
      a: "Not yet. We're in the final stretch of building it and opening it up to waitlist members first, in small batches, before a public release.",
    },
    {
      q: "Do I need to install anything?",
      a: "Just the Chrome extension once it launches. There's no separate app or account setup required to start using it.",
    },
    {
      q: "Is it free?",
      a: "Everyone who joins the waitlist gets free access during early access. Pricing for the full version will be announced closer to launch.",
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

const FinalCTA = ({ onJoin }) => (
  <section className="px-6 py-24 border-t jr-border">
    <Reveal>
      <div className="max-w-3xl mx-auto text-center relative rounded-3xl jr-card px-8 py-16 overflow-hidden">
        <div className="jr-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] blur-3xl opacity-50 pointer-events-none" />
        <div className="relative">
          <h2 className="jr-display text-3xl sm:text-[2.5rem] font-semibold tracking-tight mb-4 leading-tight">
            Stop wasting time reading every job manually.
          </h2>
          <p className="jr-text-dim text-[16px] mb-9 max-w-md mx-auto leading-relaxed">
            Join the waitlist today and be among the first freelancers to try the
            extension before launch.
          </p>
          <PrimaryButton onClick={onJoin}>
            Join the Waitlist <ArrowRight size={16} />
          </PrimaryButton>
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
        <div className="w-6 h-6 rounded-md jr-btn-primary flex items-center justify-center">
          <ScanSearch size={13} className="text-white" strokeWidth={2.4} />
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
/*  Waitlist modal                                                         */
/* ---------------------------------------------------------------------- */

const WaitlistModal = ({ open, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
      setEmail("");
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative jr-card rounded-2xl p-8 w-full max-w-sm"
          >
            {!submitted ? (
              <>
                <h3 className="jr-display text-xl font-semibold mb-2">Join the waitlist</h3>
                <p className="jr-text-dim text-[14px] mb-6 leading-relaxed">
                  Drop your email and we'll let you know the moment early access opens.
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                >
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-[#0d0f16] border jr-border rounded-xl px-4 py-3 text-[14px] mb-3 outline-none focus:border-[var(--accent)] transition-colors"
                  />
                  <PrimaryButton className="w-full">Join the Waitlist</PrimaryButton>
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-11 h-11 rounded-full bg-[#1b2a24] border border-[#2a3d33] flex items-center justify-center mx-auto mb-4">
                  <Check size={18} className="text-[var(--good)]" />
                </div>
                <h3 className="jr-display text-lg font-semibold mb-1.5">You're on the list</h3>
                <p className="jr-text-dim text-[14px]">We'll email you as soon as it's ready.</p>
              </div>
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 jr-text-faint hover:text-[var(--text)] transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ---------------------------------------------------------------------- */
/*  Page                                                                   */
/* ---------------------------------------------------------------------- */

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="jr-root jr-grain min-h-screen antialiased">
      <Tokens />
      <Nav onJoin={openModal} />
      <Hero onJoin={openModal} />
      <Problem />
      <HowItWorks />
      <Features />
      <Comparison />
      <WhoFor />
      <FAQ />
      <FinalCTA onJoin={openModal} />
      <Footer />
      <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
