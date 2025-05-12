import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif4 = Source_Serif_4({
  weight: ['400', '600', '700'],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jay Rana - Portfolio",
    template: "%s | Jay Rana Portfolio",
  },
  description: "Showcasing my software development projects and skills. Explore my work in web development, problem-solving, and more.",
  authors: [{ name: "Jay Rana" }],
  keywords: ["software developer", "portfolio", "web development", "full stack", "internship", "web specialist", "projects", "Jay Rana", "personal website"]
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(var(--background))" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(var(--background))" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable}`} suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <meta name="theme-color" content="hsl(var(--background))" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`font-sans antialiased min-h-screen flex flex-col`}>
        {/* Skip to content link - hidden until focused */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[10001] focus:bg-background focus:text-primary focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-ring"
        >
          Skip to content
        </a>
        
        <header>
          <MainNav />
        </header>
        
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
