import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://labs.nemulai.com"),
  title: "NemulAI Labs — GreenTune & Aluminati Eye",
  description:
    "Two autonomous GPU intelligence agents. GreenTune measures the energy cost of LLM fine-tuning on AMD MI300X. Aluminati Eye scrapes live GPU cloud pricing across 6 providers to find the cheapest place to run.",
  keywords: [
    "GPU energy",
    "LLM fine-tuning",
    "MI300X",
    "GPU pricing",
    "Bright Data",
    "joules per token",
    "NemulAI",
    "GreenTune",
    "Aluminati Eye",
  ],
  authors: [{ name: "NemulAI" }],
  openGraph: {
    title: "NemulAI Labs — GreenTune & Aluminati Eye",
    description:
      "Two autonomous GPU intelligence agents: measure the energy of every training run, and find the cheapest cloud to run it on.",
    type: "website",
    url: "https://labs.nemulai.com",
    siteName: "NemulAI Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "NemulAI Labs — GreenTune & Aluminati Eye",
    description:
      "Two autonomous GPU intelligence agents from NemulAI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
