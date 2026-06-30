"use client";

import { useEffect, useRef, useState } from "react";

/* H100 SXM live rates: $3.99 baseline × real provider multipliers. */
const PRICES = [
  { provider: "TensorDock", price: 2.99, color: "#a855f7", cheapest: true },
  { provider: "FluidStack", price: 3.19, color: "#06b6d4" },
  { provider: "Vast.ai", price: 3.39, color: "#10b981" },
  { provider: "RunPod", price: 3.99, color: "#f59e0b" },
  { provider: "Lambda", price: 4.59, color: "#6366f1" },
  { provider: "CoreWeave", price: 4.79, color: "#ef4444" },
];
const MAX_BAR = 5.2;

const RISK = [
  { provider: "RunPod", score: 91, color: "#f59e0b" },
  { provider: "Lambda", score: 88, color: "#6366f1" },
  { provider: "CoreWeave", score: 85, color: "#ef4444" },
  { provider: "Vast.ai", score: 79, color: "#10b981" },
  { provider: "FluidStack", score: 74, color: "#06b6d4" },
  { provider: "TensorDock", score: 70, color: "#a855f7" },
];

const BD = [
  { name: "Web Unlocker", calls: 18 },
  { name: "SERP API", calls: 12 },
  { name: "Web Scraper API", calls: 6 },
  { name: "Scraping Browser", calls: 4 },
  { name: "MCP Server", calls: 9 },
];

const TABS = ["Live Pricing", "Arbitrage", "Intel", "Recommender", "Risk", "Dossier", "Trace", "Acquire"];

export default function EyePreview() {
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

  return (
    <div ref={ref} className="rounded-2xl border border-white/10 bg-[#0a0e13] overflow-hidden shadow-2xl shadow-amber-500/5">
      {/* browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-[#0d1117]">
        <span className="h-3 w-3 rounded-full bg-red-400/70" />
        <span className="h-3 w-3 rounded-full bg-amber-400/70" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
        <div className="ml-3 flex-1 max-w-md rounded-md bg-black/40 border border-white/5 px-3 py-1 text-[11px] text-white/40 font-mono truncate">
          nemulai.com/eye
        </div>
      </div>

      {/* tab bar */}
      <div className="flex items-center gap-1 px-3 pt-3 overflow-x-auto scroll-thin border-b border-white/5">
        {TABS.map((t) => {
          const active = t === "Live Pricing";
          return (
            <span
              key={t}
              className={`whitespace-nowrap rounded-t-lg px-3 py-2 text-xs font-medium ${
                active ? "bg-amber-500/10 text-amber-300 border-b-2 border-amber-400" : "text-white/45"
              }`}
            >
              {t}
            </span>
          );
        })}
      </div>

      <div className="p-4 md:p-5">
        {/* scan header */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-400" />
            </span>
            <span className="font-medium text-white text-sm">Scanned 6 providers</span>
            <span className="text-xs text-white/40 font-mono">19 GPU models · 2.3s · via Bright Data</span>
          </div>
          <span className="rounded-md bg-amber-500/10 border border-amber-400/25 px-2.5 py-1 text-xs text-amber-200 font-mono">
            H100 SXM
          </span>
        </div>

        {/* price bars */}
        <div className="mt-4 rounded-xl border border-white/8 bg-white/[0.015] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-white/70">Live $/hr — H100 SXM</span>
            <span className="text-[10px] text-white/35 font-mono">cheapest first</span>
          </div>
          <div className="space-y-2">
            {PRICES.map((p, i) => (
              <div key={p.provider} className="flex items-center gap-3">
                <span className="w-20 text-[11px] text-white/55 truncate text-right">{p.provider}</span>
                <div className="flex-1 h-6 rounded-md bg-white/[0.03] overflow-hidden relative">
                  <div
                    className="h-full rounded-md flex items-center justify-end pr-2"
                    style={{
                      width: live ? `${(p.price / MAX_BAR) * 100}%` : "0%",
                      backgroundColor: p.cheapest ? "#34d399" : p.color,
                      opacity: p.cheapest ? 0.9 : 0.55,
                      transition: `width 1.1s cubic-bezier(0.22,1,0.36,1) ${i * 90}ms`,
                    }}
                  >
                    <span className="text-[11px] font-mono font-semibold text-black/80">${p.price.toFixed(2)}</span>
                  </div>
                </div>
                {p.cheapest && <span className="text-[10px] text-emerald-300 font-medium">best</span>}
              </div>
            ))}
          </div>
        </div>

        {/* arbitrage + risk */}
        <div className="mt-3 grid md:grid-cols-2 gap-3">
          {/* arbitrage card */}
          <div className="rounded-xl border border-amber-400/25 bg-gradient-to-b from-amber-500/[0.08] to-transparent p-4">
            <div className="text-xs font-medium text-amber-200/80 uppercase tracking-wide">Arbitrage detected</div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-bold text-amber-300">37.6%</span>
              <span className="text-xs text-white/45">cross-provider spread</span>
            </div>
            <div className="mt-3 space-y-1 text-[11px] font-mono">
              <div className="flex justify-between"><span className="text-emerald-300">TensorDock (cheapest)</span><span className="text-white/60">$2.99/hr</span></div>
              <div className="flex justify-between"><span className="text-red-300">CoreWeave (priciest)</span><span className="text-white/60">$4.79/hr</span></div>
            </div>
            <div className="mt-3 pt-2 border-t border-white/8 text-xs text-white/55">
              Save <span className="text-emerald-300 font-semibold">$15,768/yr</span> per GPU at 24/7 utilization.
            </div>
          </div>

          {/* provider risk scores */}
          <div className="rounded-xl border border-white/8 bg-white/[0.015] p-4">
            <div className="text-xs font-medium text-white/70 mb-3">Provider reliability — composite</div>
            <div className="space-y-2">
              {RISK.map((r, i) => (
                <div key={r.provider} className="flex items-center gap-2 text-[11px]">
                  <span className="w-20 text-white/55 truncate text-right">{r.provider}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: live ? `${r.score}%` : "0%",
                        backgroundColor: r.color,
                        opacity: 0.75,
                        transition: `width 1s ease ${300 + i * 80}ms`,
                      }}
                    />
                  </div>
                  <span className="w-7 font-mono text-white/60 text-right">{r.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* bright data trace */}
        <div className="mt-3 rounded-xl border border-white/8 bg-white/[0.015] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-white/70">Bright Data pipeline — MCP trace</span>
            <span className="text-[10px] text-emerald-300 font-mono">49 calls · 100% success</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {BD.map((b) => (
              <span
                key={b.name}
                className="flex items-center gap-2 rounded-lg border border-amber-400/20 bg-amber-500/[0.05] px-3 py-1.5 text-[11px] text-amber-100"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {b.name}
                <span className="text-white/40 font-mono">×{b.calls}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
