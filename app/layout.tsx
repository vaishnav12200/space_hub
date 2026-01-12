import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StarField from "../components/StarField";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Hub | Explore the Universe",
  description: "Discover planets, stars, galaxies, nebulae, and black holes. Get the latest space news and mission updates from NASA, ISRO, ESA, and SpaceX.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased star-field min-h-screen flex flex-col relative`}
      >
        <StarField />
        <Navbar />
        <main className="flex-1 pt-16 relative z-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
