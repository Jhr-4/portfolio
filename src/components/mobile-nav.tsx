// filepath: c:\Users\rjay1\Desktop\College\IS219\autocoderbase\src\components\mobile-nav.tsx
"use client"

// Client-side mobile navigation menu (slide-out sheet)
import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Navigation routes (same as MainNav)
const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
]

export function MobileNav() {
  // State for sheet open/close
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="p-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted transition-colors"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 max-w-[90vw] bg-background">
        <SheetHeader className="border-b border-border px-6 py-4">
          <SheetTitle className="font-serif text-lg font-semibold text-foreground">Menu</SheetTitle>
        </SheetHeader>
        {/* Navigation links for mobile */}
        <nav className="flex flex-col gap-2 py-6 px-6">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)} // Close sheet on link click
              className="block w-full rounded-lg px-4 py-3 text-base font-medium text-left text-foreground hover:bg-muted focus:bg-muted transition-colors"
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
