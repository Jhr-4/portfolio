// Main site navigation bar (desktop & mobile)
// Contains brand/logo, navigation links, and mobile menu
import Link from "next/link"
import dynamic from 'next/dynamic'
import { StickyNote } from "lucide-react"

// Dynamically import MobileNav for client-side mobile menu
const MobileNav = dynamic(() => import('./mobile-nav').then(mod => mod.MobileNav), {
  ssr: false,
})

// Navigation routes
const routes = [
  //{ href: "/", label: "Home" }, the logo already goes to home..
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
]

export function MainNav() {
  return (
    <nav className="top-0 sticky flex items-center justify-between w-full py-4 px-4 md:px-8 border-b border-border bg-background/95">
      {/* Logo */}
      <Link href="/" className="font-serif text-xl font-semibold text-primary hover:text-primary/90 transition-colors flex items-center gap-2">
        <img src="/jr-logo.svg" alt="JR Logo" className="h-12 w-12 -my-2" />
        <span className="sr-only">Home</span>
      </Link>
      {/* Desktop navigation links */}
      <div className="hidden md:flex items-center gap-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className="text-base font-medium text-foreground/80 transition-colors hover:text-primary"
          >
            {route.label}
          </Link>
        ))}
        <Link href="https://drive.google.com/file/d/1Ae3dx-PYWJt1_luJGHlUZnlBSK0RAdI7/view?usp=sharing" className="text-base font-medium transition-colors hover:text-white" target="_blank"> Resume
        </Link>
      </div>
      {/* Mobile navigation menu */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </nav>
  )
}