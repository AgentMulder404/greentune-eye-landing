import Reveal from "./components/Reveal";
import CountUp from "./components/CountUp";
import DashboardPreview from "./components/DashboardPreview";

/* ---------------------------------------------------------------- nav --- */
function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-[#07090c]/70 border-b border-white/5">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="grid place-items-center h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 text-[#07090c] text-sm font-black">
            N
          </span>
          <span>NemulAI <span className="text-white/40 font-normal">Labs</span></span>
        </a>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
          <a href="#greentune" className="hover:text-emerald-300 transition-colors">GreenTune</a>
          <a href="#eye" className="hover:text-amber-300 transition-colors">Aluminati Eye</a>
          <a href="#platform" className="hover:text-white transition-colors">Platform</a>
        </div>
        <a
          href="https://www.nemulai.com"
          className="text-sm rounded-full px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
        >
          nemulai.com →
        </a>
      </nav>
    </header>
  );
}

/* --------------------------------------------------------------- hero --- */
function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-28 overflow-hidden">
      {/* aurora */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-a absolute -top-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="aurora-b absolute -top-24 right-0 h-[26rem] w-[26rem] rounded-full bg-amber-500/15 blur-[120px]" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 h-[24rem] w-[40rem] rounded-full bg-cyan-500/10 blur-[140px]" />
      </div>
      <div className="absolute inset-0 -z-10 grid-fade" />

      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-white/70">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Two hackathon agents · real hardware · real market data
          </span>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="mt-7 text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            Intelligence for{" "}
            <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              every GPU
            </span>
            <br className="hidden md:block" /> you run.
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="mx-auto mt-7 max-w-2xl text-lg text-white/60 leading-relaxed">
            <span className="text-emerald-300 font-medium">GreenTune</span> measures the energy cost of
            every fine-tuning run on AMD MI300X.{" "}
            <span className="text-amber-300 font-medium">Aluminati Eye</span> scrapes live GPU cloud
            pricing across six providers to find the cheapest place to run. Two autonomous agents,
            one mission: make GPU compute observable, efficient, and intelligent.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#greentune"
              className="rounded-full px-6 py-3 font-medium bg-gradient-to-r from-emerald-400 to-teal-400 text-[#07090c] hover:opacity-90 transition-opacity"
            >
              Explore GreenTune
            </a>
            <a
              href="#eye"
              className="rounded-full px-6 py-3 font-medium bg-gradient-to-r from-amber-400 to-orange-400 text-[#07090c] hover:opacity-90 transition-opacity"
            >
              Explore Aluminati Eye
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- stat strip --- */
const STATS = [
  { to: 30, suffix: "%", label: "energy waste exposed on MI300X", accent: "text-emerald-300" },
  { to: 0.355, decimals: 3, suffix: " J/tok", label: "best measured efficiency", accent: "text-teal-300" },
  { to: 6, label: "GPU clouds scanned live", accent: "text-amber-300" },
  { to: 19, label: "GPU models tracked", accent: "text-cyan-300" },
];

function StatStrip() {
  return (
    <section className="border-y border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 80}>
            <div className="text-center md:text-left">
              <div className={`text-3xl md:text-4xl font-bold ${s.accent}`}>
                <CountUp to={s.to} decimals={s.decimals ?? 0} suffix={s.suffix ?? ""} />
              </div>
              <div className="mt-1 text-sm text-white/50">{s.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------- section heading --- */
function Tag({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
      style={{ borderColor: `${color}33`, color, backgroundColor: `${color}12` }}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- greentune --- */
const GT_FEATURES = [
  {
    title: "Joules-per-token, first class",
    body: "Power is sampled via amdsmi every 0.5s and integrated trapezoidally. J/token sits alongside loss and throughput — one line of code via the HuggingFace Trainer callback.",
  },
  {
    title: "Lobster Trap governance",
    body: "Carbon budget, energy cap, efficiency floor, and cost guard run before training launches. Violating configs never start — the agent suggests a compliant alternative.",
  },
  {
    title: "Gemini-powered autonomy",
    body: "Talk to the agent in natural language. It analyzes historical energy data, recommends optimal configs, projects CO₂ and cost, then launches and monitors the run.",
  },
  {
    title: "Backend agnostic telemetry",
    body: "The same collector auto-detects NVIDIA (NVML) or AMD (amdsmi / rocm-smi). Identical GPUMetrics on A100, H100, and MI300X — no code changes.",
  },
];

const GT_ROWS = [
  ["Effective batch size", "8", "8", "same"],
  ["Training duration", "138.5s", "178.9s", "+29%"],
  ["Total energy", "87,300 J", "113,834 J", "+30%"],
  ["J / token", "0.355", "0.463", "+30%"],
  ["CO₂ emissions", "9.46 g", "12.33 g", "+30%"],
];

function GreenTune() {
  return (
    <section id="greentune" className="relative py-28 scroll-mt-16">
      <div className="pointer-events-none absolute top-0 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-[130px] -z-10" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Tag color="#34d399">AMD Instinct MI300X · Gemini 2.5 · lablab.ai hackathon</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
            GreenTune — <span className="text-emerald-300">energy intelligence</span> for fine-tuning
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/60 leading-relaxed">
            Every team fine-tuning LLMs tracks loss curves and throughput — but nobody measures the
            energy cost per token. GreenTune is an autonomous agent that turns energy
            <em> measurement</em> into energy <em>optimization</em>, with a governance layer built for
            EU AI Act and SEC climate disclosure.
          </p>
        </Reveal>

        {/* product preview */}
        <Reveal delay={80}>
          <div className="mt-10">
            <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-medium text-emerald-200/80">The product — live training dashboard</span>
              <a
                href="https://www.nemulai.com/admin/fine-tuning"
                className="text-xs text-white/40 hover:text-emerald-300 transition-colors font-mono"
              >
                nemulai.com/admin/fine-tuning →
              </a>
            </div>
            <DashboardPreview />
            <p className="mt-3 text-xs text-white/35">
              Real metrics from a baseline Qwen2.5-7B QLoRA run on AMD MI300X. The live dashboard streams power,
              loss, and per-token energy over SSE while training runs.
            </p>
          </div>
        </Reveal>

        {/* key finding */}
        <Reveal delay={120}>
          <div className="mt-12 rounded-2xl border border-emerald-400/20 bg-gradient-to-b from-emerald-500/[0.07] to-transparent p-6 md:p-8">
            <div className="flex items-center gap-2 text-emerald-300 text-sm font-semibold uppercase tracking-wide">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Key finding
            </div>
            <h3 className="mt-2 text-2xl font-semibold">
              Smaller batch sizes do <span className="text-emerald-300">not</span> reduce power draw.
            </h3>
            <p className="mt-2 text-white/55 max-w-3xl">
              Identical QLoRA runs (Qwen2.5-7B, 500 Hermes traces, LoRA rank 16, NF4). The MI300X
              saturates at ~750W regardless of batch size — so a smaller batch means the same power
              for more time: <span className="text-white">30% more energy wasted.</span> Invisible
              without per-token measurement.
            </p>

            <div className="mt-6 overflow-x-auto scroll-thin">
              <table className="w-full text-sm border-collapse min-w-[440px]">
                <thead>
                  <tr className="text-white/40 text-left">
                    <th className="py-2 pr-4 font-medium">Metric</th>
                    <th className="py-2 px-4 font-medium">Baseline (bs=2, ga=4)</th>
                    <th className="py-2 px-4 font-medium">Small batch (bs=1, ga=8)</th>
                    <th className="py-2 pl-4 font-medium text-right">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {GT_ROWS.map((r) => (
                    <tr key={r[0]} className="border-t border-white/5">
                      <td className="py-2.5 pr-4 text-white/70">{r[0]}</td>
                      <td className="py-2.5 px-4 font-mono text-emerald-200">{r[1]}</td>
                      <td className="py-2.5 px-4 font-mono text-white/70">{r[2]}</td>
                      <td className={`py-2.5 pl-4 font-mono text-right ${r[3].startsWith("+") ? "text-amber-300" : "text-white/40"}`}>
                        {r[3]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* features */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {GT_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-emerald-400/30 hover:bg-emerald-500/[0.04] transition-colors">
                <h4 className="text-lg font-semibold text-emerald-100">{f.title}</h4>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* agent transcript */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-white/8 bg-[#0b0f14] overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-amber-400/70" />
              <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              <span className="ml-3 text-xs text-white/40 font-mono">greentune_agent.py — interactive</span>
            </div>
            <pre className="p-5 text-[13px] leading-relaxed font-mono text-white/75 overflow-x-auto scroll-thin">
{`greentune> Optimize Qwen-7B for lowest J/token under 50g CO2

  Recommended config (from historical runs):
    batch_size=2, grad_accum=4 (effective=8)
    LoRA rank 16, lr=2e-4

  Energy projection:
    Duration 138s · Energy 87,300 J · CO2 9.46g · Cost $0.0024
    `}<span className="text-emerald-300">All policies passed. ✓</span>{`

  Launch training? [y/N]`}
            </pre>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------------- eye --- */
const EYE_FEATURES = [
  {
    title: "Live pricing, 6 providers",
    body: "RunPod, Vast.ai, Lambda, CoreWeave, FluidStack, TensorDock scraped simultaneously. Claude parses raw HTML into structured rates for 19 GPU models.",
  },
  {
    title: "Arbitrage detection",
    body: "Cross-provider price spreads over 5% are flagged automatically, with annualized savings estimates per GPU.",
  },
  {
    title: "Provider risk scoring",
    body: "Uptime, hiring growth, funding health, and community sentiment fuse into a composite reliability score — one route exercising all five Bright Data products.",
  },
  {
    title: "Autonomous acquisition",
    body: "A 10-phase pipeline scores prospects, enriches via LinkedIn, maps competitors, drafts PDF reports and email drips, and persists everything — one button, fully autonomous.",
  },
];

const BD_PRODUCTS = ["Web Unlocker", "SERP API", "Web Scraper API", "Scraping Browser", "MCP Server"];

function Eye() {
  return (
    <section id="eye" className="relative py-28 scroll-mt-16 border-t border-white/5">
      <div className="pointer-events-none absolute top-20 right-0 h-96 w-96 rounded-full bg-amber-500/10 blur-[130px] -z-10" />
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <Tag color="#fbbf24">Bright Data · Claude Sonnet · Web Data UNLOCKED hackathon</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
            Aluminati Eye — the GPU cloud <span className="text-amber-300">pricing oracle</span>
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-white/60 leading-relaxed">
            Aluminati Eye scrapes real-time GPU cloud pricing from six providers, detects arbitrage,
            analyzes market sentiment, scores provider reliability, and generates ranked
            cost-optimization recommendations — all powered by Bright Data and Claude.
          </p>
        </Reveal>

        {/* bright data products */}
        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-2.5">
            {BD_PRODUCTS.map((p) => (
              <span
                key={p}
                className="rounded-full border border-amber-400/25 bg-amber-500/[0.06] px-4 py-1.5 text-sm text-amber-100"
              >
                {p}
              </span>
            ))}
            <span className="rounded-full px-4 py-1.5 text-sm text-white/40">all 5 products, in one app</span>
          </div>
        </Reveal>

        {/* features */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          {EYE_FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <div className="group h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-amber-400/30 hover:bg-amber-500/[0.04] transition-colors">
                <h4 className="text-lg font-semibold text-amber-100">{f.title}</h4>
                <p className="mt-2 text-white/55 text-sm leading-relaxed">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* pipeline strip */}
        <Reveal delay={120}>
          <div className="mt-10 rounded-2xl border border-white/8 bg-white/[0.02] p-6 md:p-8">
            <div className="text-sm text-white/40 font-medium uppercase tracking-wide">
              Acquire pipeline · 10 autonomous phases
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-y-3 text-sm">
              {[
                "Score", "LinkedIn", "Competitors", "Savings", "PDF reports",
                "Email drips", "Social", "Reddit + HN", "Queue", "Complete",
              ].map((p, i, arr) => (
                <span key={p} className="flex items-center">
                  <span className="rounded-lg bg-amber-500/10 border border-amber-400/20 px-3 py-1.5 text-amber-100 whitespace-nowrap">
                    {i + 1}. {p}
                  </span>
                  {i < arr.length - 1 && <span className="mx-1.5 text-white/25">→</span>}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ platform --- */
function Platform() {
  return (
    <section id="platform" className="relative py-28 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <Tag color="#22d3ee">One platform</Tag>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight">
            Measure it. Then run it for less.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-white/60 leading-relaxed">
            GreenTune tells you the true energy and cost of a training run. Aluminati Eye tells you
            the cheapest, most reliable place to execute it. Together they close the loop on GPU
            cost intelligence — the core of the NemulAI platform.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { n: "01", t: "Measure", d: "Per-token energy, CO₂, and cost on real AMD + NVIDIA hardware.", c: "text-emerald-300" },
              { n: "02", t: "Optimize", d: "Governance policies and an agent that recommends compliant, efficient configs.", c: "text-teal-300" },
              { n: "03", t: "Source", d: "Live arbitrage across six clouds to run the workload at the lowest rate.", c: "text-amber-300" },
            ].map((s) => (
              <div key={s.n} className="rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <div className={`font-mono text-sm ${s.c}`}>{s.n}</div>
                <div className="mt-2 text-xl font-semibold">{s.t}</div>
                <div className="mt-2 text-sm text-white/55 leading-relaxed">{s.d}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-14 flex flex-wrap justify-center gap-3">
            <a
              href="https://www.nemulai.com"
              className="rounded-full px-7 py-3.5 font-medium bg-white text-[#07090c] hover:bg-white/90 transition-colors"
            >
              Visit NemulAI →
            </a>
            <a
              href="https://github.com/AgentMulder404"
              className="rounded-full px-7 py-3.5 font-medium border border-white/15 bg-white/5 hover:bg-white/10 transition-colors"
            >
              View the code
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- footer --- */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <div className="flex items-center gap-2.5">
          <span className="grid place-items-center h-6 w-6 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 text-[#07090c] text-xs font-black">
            N
          </span>
          <span>© 2026 NemulAI · GPU cost intelligence that learns</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#greentune" className="hover:text-emerald-300 transition-colors">GreenTune</a>
          <a href="#eye" className="hover:text-amber-300 transition-colors">Aluminati Eye</a>
          <a href="https://www.nemulai.com" className="hover:text-white transition-colors">nemulai.com</a>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------- page --- */
export default function Home() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <StatStrip />
      <GreenTune />
      <Eye />
      <Platform />
      <Footer />
    </main>
  );
}
