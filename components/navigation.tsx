"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

const navLinks = [
  { label: "Architecture", href: "/blog" },
  { label: "Systems", href: "/blog" },
  { label: "Engineering", href: "/blog" },
  { label: "About", href: "/about" },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 z-50 w-full bg-[#080808]/80 backdrop-blur-md border-none">
      <div className="flex items-center justify-between w-full px-12 py-8">
        <Link
          href="/"
          className="text-2xl font-black tracking-tighter text-slate-100 uppercase font-headline hover:opacity-80 transition-opacity"
        >
          jett.io
        </Link>

        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href))

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`font-label uppercase tracking-widest text-xs transition-colors ${
                  isActive
                    ? "text-primary-container border-b-2 border-primary-container pb-1"
                    : "text-slate-400 hover:text-slate-100"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <button
          className="text-on-surface hover:bg-slate-800/50 transition-all duration-200 p-2"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>
    </nav>
  )
}
