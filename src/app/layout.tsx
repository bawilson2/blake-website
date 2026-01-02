import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link"; // Added this
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Update this to make the site look professional in Google results
export const metadata: Metadata = {
  title: "Blake's Maker Shop",
  description: "Custom 3D printed and laser-engraved creations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* --- GLOBAL NAVIGATION BAR --- */}
        <nav className="border-b p-4 mb-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold italic text-black-600 hover:opacity-80 transition">
              Blake's Maker Shop
            </Link>
            <div className="flex gap-6 items-center">
              <Link href="/" className="font-medium hover:text-black-600 transition">Shop All</Link>
            </div>
          </div>
        </nav>
        {/* ------------------------------ */}

        {/* The children is where your Homepage or Product Pages are injected */}
        <div className="max-w-7xl mx-auto px-4">
          {children}
        </div>
        
        <footer className="mt-20 py-10 border-t text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Blake's Maker Shop 
        </footer>
      </body>
    </html>
  );
}