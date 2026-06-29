"use client";

import { useEffect, useRef, useState } from "react";

/* Real power-sample shape from a baseline run: idle → ramp → ~750W plateau.
   Values in watts; the MI300X saturates near its 750W TDP. */
const POWER: number[] = [
  205, 244, 372, 540, 668, 735, 748, 742, 690, 655, 638, 646, 661, 643, 628,
  636, 650, 657, 641, 631, 627, 637, 652, 645, 633, 629, 639, 648, 656, 642,
  630, 626, 635, 649, 644, 638, 646, 653, 640, 631, 749, 651, 637, 633,
];
/* Loss decay across logging steps (10.8 → ~0). */
const LOSS: number[] = [10.82, 6.9, 3.8, 1.6, 0.62, 0.19, 0.06, 0.031, 0.018, 0.012, 0.0096, 0.0];

const W = 720;
const H = 210;
const P_MAX = 790;
const P_MIN = 150;

function path(values: number[], vMax: number, vMin: number) {
  const n = values.length;
  return values
    .map((v, i) => {
      const x = (i / (n - 1)) * W;
      const y = H - ((v - vMin) / (vMax - vMin)) * H;
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
}

const TABS = ["Overview", "Agent", "Run Monitor", "Leaderboard", "Policies", "Playground", "ROI Calculator"];

const POLICIES = [
  { name: "Carbon budget", limit: "≤ 50 g", val: "9.46 g" },
  { name: "Energy cap", limit: "≤ 1 kWh", val: "0.024 kWh" },
  { name: "Efficiency floor", limit: "≤ 0.8 J/tok", val: "0.355 J/tok" },
  { name: "Cost guard", limit: "≤ $1.00", val: "$0.0024" },
];

export default function DashboardPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (setLive(true), io.unobserve(e.target))),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const powerPath = path(POWER, P_MAX, P_MIN);
  const lossPath = path(LOSS, 11, -0.4);

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#0a0e13] overflow-hidden shadow-2xl shadow-emerald-500/5">
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0d1117]">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex-1 max-w-md rounded-md bg-black/40 border border-white/5 px-3 py-1 text-[11px] text-white/40 font-mono truncate">
          nemulai.com/admin/fine-tuning
        </div>
      </div>

      {/* tab bar */}
      <div className="flex items-center gap-1 px-3 pt-3 overflow-x-auto scroll-thin border-b border-white/5">
        {TABS.map((t) => {
          const active = t === "Run Monitor";
          return (
            <span
              key={t}
              className={`whitespace-nowrap rounded-t-lg px-3 py-2 text-xs font-medium ${
                active ? "bg-emerald-500/10 text-emerald-300 border-b-2 border-emerald-400" : "text-white/45"
              }`}
            >
              {t}
            </span>
          );
        })}
      </div>

      <div className="p-4 md:p-5">
        {/* run header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="font-medium text-white text-sm">Baseline (bs=2, ga=4)</span>
            <span className="text-xs text-white/40 font-mono">Qwen2.5-7B · 4-bit NF4 · LoRA r16</span>
          </div>
          <span className="text-xs text-emerald-300 font-mono">step 59 / 59 · done ✓</span>
        </div>

        {/* metric tiles */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { k: "J / token", v: "0.355", sub: "efficiency", hot: true },
            { k: "Total energy", v: "87,300 J", sub: "0.024 kWh" },
            { k: "CO₂", v: "9.46 g", sub: "390 g/kWh" },
            { k: "Avg power", v: "630.5 W", sub: "peak 752 W" },
          ].map((m) => (
            <div
              key={m.k}
              className={`rounded-xl border p-3 ${
                m.hot ? "border-emerald-400/30 bg-emerald-500/[0.06]" : "border-white/8 bg-white/[0.02]"
              }`}
            >
              <div className="text-[11px] text-white/45">{m.k}</div>
              <div className={`mt-0.5 text-lg font-semibold ${m.hot ? "text-emerald-300" : "text-white"}`}>{m.v}</div>
              <div className="text-[10px] text-white/35">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* power curve */}
        <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.015] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-white/70">GPU power draw — MI300X</span>
            <span className="text-[10px] text-white/35 font-mono">W · 0.5s samples</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[140px]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="pfill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* TDP reference line (750W) */}
            <line
              x1="0" x2={W}
              y1={H - ((750 - P_MIN) / (P_MAX - P_MIN)) * H}
              y2={H - ((750 - P_MIN) / (P_MAX - P_MIN)) * H}
              stroke="#f59e0b" strokeOpacity="0.4" strokeDasharray="4 4" strokeWidth="1"
            />
            <text x="6" y={H - ((750 - P_MIN) / (P_MAX - P_MIN)) * H - 5} fill="#f59e0b" fillOpacity="0.7" fontSize="11" fontFamily="monospace">
              750W TDP
            </text>
            {/* area + line */}
            <path d={`${powerPath} L${W},${H} L0,${H} Z`} fill="url(#pfill)" opacity={live ? 1 : 0} style={{ transition: "opacity 1.2s ease 0.4s" }} />
            <path
              d={powerPath}
              fill="none"
              stroke="#34d399"
              strokeWidth="2"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={live ? 0 : 1}
              style={{ transition: "stroke-dashoffset 1.8s cubic-bezier(0.65,0,0.35,1)" }}
            />
          </svg>
        </div>

        {/* loss curve + policies */}
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/8 bg-white/[0.015] p-4">
            <div className="text-xs font-medium text-white/70 mb-2">Training loss</div>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[90px]" preserveAspectRatio="none">
              <path
                d={lossPath}
                fill="none"
                stroke="#22d3ee"
                strokeWidth="2"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={live ? 0 : 1}
                style={{ transition: "stroke-dashoffset 1.6s ease 0.3s" }}
              />
            </svg>
            <div className="text-[10px] text-white/35 font-mono mt-1">10.82 → 0.0 · final 1.054</div>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/[0.015] p-4">
            <div className="text-xs font-medium text-white/70 mb-2">Lobster Trap — energy governance</div>
            <div className="space-y-1.5">
              {POLICIES.map((p) => (
                <div key={p.name} className="flex items-center justify-between text-[11px]">
                  <span className="text-white/55">{p.name}</span>
                  <span className="flex items-center gap-2 font-mono">
                    <span className="text-white/40">{p.val} / {p.limit}</span>
                    <span className="text-emerald-300">✓</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
