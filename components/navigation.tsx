import Link from "next/link"
import { Logo } from "./logo"
import { Search } from "lucide-react"

export function Navigation() {
  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Logo />
            <span className="text-xl font-bold">jett.io</span>
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/blog" className="text-foreground hover:text-primary transition-colors font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary transition-colors font-medium">
              About
            </Link>
            <button className="text-foreground hover:text-primary transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
