"use client"

// Client-side mobile navigation menu (slide-out sheet)
import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Navigation routes (should match MainNav)
const routes = [
  //{ href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/playground", label: "Playground" },
  //{ href: "/projects", label: "Projects" },  
  { href: "/contact", label: "Contact" },
]

export function MobileNav() {
  // State for sheet open/close
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>        <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 max-w-[90vw] bg-background">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="font-serif text-lg font-semibold text-foreground">Jay R.</SheetTitle>
        </SheetHeader>
        {/* Navigation links for mobile */}
        <nav className="flex flex-col gap-2 py-6 px-6" aria-label="Mobile Navigation">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)} // Close sheet on link click
              className="block w-full rounded-lg px-4 py-3 text-base font-medium text-left text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
            >
              {route.label}
            </Link>
          ))}
          <Link 
            href="https://drive.google.com/file/d/1Ae3dx-PYWJt1_luJGHlUZnlBSK0RAdI7/view?usp=sharing" 
            onClick={() => setIsOpen(false)}
            className="block w-full rounded-lg px-4 py-3 text-base font-medium text-left text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Resume (opens in new tab)"
          > 
            Resume
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  )
}