import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChatbotWidget from "@/components/chat/ChatbotWidget";
import { site } from "@/data/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
  weight: "variable",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.agentName} | ${site.title}`,
    template: `%s | ${site.agentName}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.agentName} | ${site.title}`,
    description: site.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-ink font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
