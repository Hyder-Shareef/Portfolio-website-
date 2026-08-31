import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import EasterEggs from "@/components/ui/EasterEggs";
import SkimOverlay from "@/components/navigation/SkimOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohammed Hyder Shareef — Applied AI & Data Science | Portfolio",
  description:
    "Applied AI & Data Science student at IIT Jodhpur & Leapstart School of Technology. Specializing in intelligent systems, 3D telemetry, network security anomaly detection, and robust relational architectures.",
  keywords: [
    "Mohammed Hyder Shareef",
    "Hyder Shareef",
    "IIT Jodhpur",
    "Leapstart School of Technology",
    "Applied AI",
    "Data Science",
    "Cybersecurity",
    "PostgreSQL",
    "React",
    "Next.js",
    "Three.js",
    "Machine Learning",
  ],
  authors: [{ name: "Mohammed Hyder Shareef" }],
  creator: "Mohammed Hyder Shareef",
  openGraph: {
    title: "Mohammed Hyder Shareef — Applied AI, Systems & Engineering",
    description:
      "Interactive 3D portfolio and architectural case studies by Mohammed Hyder Shareef (IIT Jodhpur / Leapstart).",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Hyder Shareef — Portfolio 2026",
    description: "Applied AI, Cybersecurity, Relational Architectures and Interactive 3D WebGL systems.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-background text-text-primary antialiased selection:bg-accent selection:text-background`}
      >
        <SmoothScroll>
          <CustomCursor />
          <EasterEggs />
          <SkimOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
