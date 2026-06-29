# NemulAI Labs — GreenTune & Aluminati Eye Landing

A standalone Next.js landing page showcasing two NemulAI hackathon agents:

- **GreenTune** — autonomous energy intelligence for LLM fine-tuning on AMD MI300X (Gemini-powered, lablab.ai hackathon).
- **Aluminati Eye** — GPU cloud pricing oracle scraping 6 providers via Bright Data (Web Data UNLOCKED hackathon).

## Stack

- Next.js 16 (App Router) · React 19 · Tailwind CSS v4 · TypeScript
- Zero runtime dependencies beyond React — static, fast, deploys anywhere.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

This is a clean, framework-detected Next.js app — no special config needed.

```bash
# from this directory, with the Vercel CLI installed and logged in
vercel          # preview deploy
vercel --prod   # production
```

Or push to a Git remote and import the repo at vercel.com. Suggested domain: `labs.nemulai.com`.

## Structure

```
app/
  layout.tsx          # metadata + global styles
  page.tsx            # the full single-page landing
  globals.css         # Tailwind v4 + design tokens / animations
  components/
    Reveal.tsx        # scroll-triggered reveal (IntersectionObserver)
    CountUp.tsx       # animated stat counter
```

Content is sourced from the real project READMEs (GreenTune key finding, Aluminati Eye feature set and Bright Data usage). Update copy in `app/page.tsx`.
