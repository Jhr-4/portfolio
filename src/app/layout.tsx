import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Inter, Source_Serif_4 } from "next/font/google";
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";

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
    default: "Jay Rana - Software Developer Portfolio",
    template: "%s | Jay Rana Portfolio",
  },
  description: "Showcasing my software development projects and skills. Explore my work in web development, problem-solving, and more.",
  authors: [{ name: "Jay Rana" }],
  keywords: ["software developer", "portfolio", "web development", "full stack", "react", "nextjs", "typescript", "projects", "Jay Rana", "personal website"]
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
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable}`}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        <MainNav />
        {children}
      </body>
    </html>
  );
}
