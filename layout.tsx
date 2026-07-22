import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Glow Color Analysis",
  description: "Find your 16-season color profile.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900">
        <header className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="font-semibold tracking-tight text-lg">
              Glow Color Analysis
            </Link>
            <nav className="text-sm flex gap-4 text-neutral-500">
              <Link href="/upload" className="hover:text-neutral-900">
                Try it
              </Link>
              <Link href="/seasons" className="hover:text-neutral-900">
                All 16 seasons
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-neutral-200 py-6 text-center text-xs text-neutral-400">
          Recommended palettes are real and research-grounded; personalized notes are AI-written. Photo-based analysis is still coming — pick your season manually for now.
        </footer>
      </body>
    </html>
  );
}
