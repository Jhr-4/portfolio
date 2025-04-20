import type { Metadata, Viewport } from "next";
import "./globals.css";
// Import Inter and Source Serif 4 fonts
import { Inter, Source_Serif_4 } from "next/font/google"; // Corrected font name
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils"; // Import cn utility

// Configure Inter font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans", // Use CSS variable --font-sans
  display: "swap",
});

// Configure Source Serif 4 font
const sourceSerif4 = Source_Serif_4({ // Corrected variable name
  weight: ['400', '600', '700'], // Include weights needed for headings
  subsets: ["latin"],
  variable: "--font-serif", // Use CSS variable --font-serif
  display: "swap",
});

// Update metadata for a personal portfolio
export const metadata: Metadata = {
  title: {
    default: "Jay Rana - Software Developer Portfolio",
    template: "%s | Jay Rana Portfolio",
  },
  description: "Showcasing my software development projects and skills. Explore my work in web development, problem-solving, and more.",
  authors: [{ name: "Jay Rana" }],
  keywords: ["software developer", "portfolio", "web development", "full stack", "react", "nextjs", "typescript", "projects", "Jay Rana", "personal website"]
};

// Update viewport theme colors to match new palette
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(var(--background))" }, // Use CSS variable
    { media: "(prefers-color-scheme: dark)", color: "hsl(var(--background))" }, // Use CSS variable
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
    // Apply font variables to html tag - REMOVED suppressHydrationWarning
    <html lang="en" className={`${inter.variable} ${sourceSerif4.variable}`}>
      {/* Apply font-sans to body as the default */}
      <body className={`font-sans antialiased`}>
        <MainNav />
        {children}
      </body>
    </html>
  );
}
