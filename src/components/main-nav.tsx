// Main site navigation bar (desktop & mobile)
// Contains brand/logo, navigation links, and mobile menu
import Link from "next/link"
import dynamic from 'next/dynamic'

// Dynamically import MobileNav for client-side mobile menu
const MobileNav = dynamic(() => import('./mobile-nav').then(mod => mod.MobileNav), {
  ssr: false,
})

// Navigation routes
const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
]

export function MainNav() {
  return (
    <nav className="flex items-center justify-between w-full py-4 px-4 md:px-8 border-b border-border bg-background">
      {/* Brand/Logo */}
      <Link href="/" className="font-serif text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
        JR
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
      </div>
      {/* Mobile navigation menu */}
      <div className="md:hidden">
        <MobileNav />
      </div>
    </nav>
  )
}