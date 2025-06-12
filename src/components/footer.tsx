// Footer component for site-wide use
// Contains copyright, navigation links, and social media
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

// Navigation routes - should match main-nav
const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
]

// Social media links
const socialLinks = [
  { 
    href: "https://github.com/jhr-4", 
    label: "GitHub", 
    icon: <Github className="h-5 w-5" /> 
  },
  { 
    href: "https://www.linkedin.com/in/jay-rana-23441a298/", 
    label: "LinkedIn", 
    icon: <Linkedin className="h-5 w-5" /> 
  }
]

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-auto border-t border-border bg-background/95 relative overflow-hidden">
      {/* Background floating orbs - matching the layered background system from docs */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 blur-3xl rounded-full mix-blend-screen animate-float"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-teal-400/10 blur-3xl rounded-full mix-blend-screen animate-float animate-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and copyright */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="font-serif text-xl font-semibold text-primary hover:text-primary/90 transition-colors flex items-center gap-2">
              <img src="/jr-logo.svg" alt="JR Logo" className="h-10 w-10 pointer-events-none" />
              <span>Jay Rana</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-2">
              © {currentYear} Jay Rana. All rights reserved.
            </p>
          </div>          {/* Navigation */}
          <nav className="flex flex-col md:flex-row items-center gap-4 md:gap-6" aria-label="Footer Navigation">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary focus-visible:text-primary"
              >
                {route.label}
              </Link>
            ))}
            <Link 
              href="https://drive.google.com/file/d/1Ae3dx-PYWJt1_luJGHlUZnlBSK0RAdI7/view?usp=sharing" 
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary focus-visible:text-primary" 
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Resume (opens in new tab)"
            >
              Resume
            </Link>
          </nav>          {/* Social links */}
          <div className="flex items-center gap-4" aria-label="Social Media Links">
            {socialLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-label={link.label}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-foreground/70 hover:text-primary focus-visible:text-primary transition-colors p-2 rounded-full hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
