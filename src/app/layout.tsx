import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider"; // Ensure this file exists!
import { ModeToggle } from "@/components/mode-toggle";     // Ensure this file exists!
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blake's Maker Shop",
  description: "Custom laser-engraved and 3D printed creations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning is required when using next-themes to prevent console errors
    <html lang="en" suppressHydrationWarning> 
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >

          {/* --- GLOBAL NAVIGATION --- */}
          <nav className="border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold italic text-blue-600 hover:opacity-80 transition">
                Blake's Maker Shop
              </Link>
              
              <div className="flex gap-6 items-center">
                <Link href="/" className="font-medium hover:text-blue-600 transition">Shop All</Link>
                {/* The Theme Switcher Button */}
                <ModeToggle />
              </div>
            </div>
          </nav>

          {/* --- MAIN CONTENT AREA --- */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>

          {/* --- FOOTER --- */}
          <footer className="mt-20 py-12 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} Blake's Maker Shop | Hand-crafted in the Pacific Northwest</p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}