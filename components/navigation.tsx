import Link from "next/link"
import { Container } from "./container"
import { Logo } from "./logo"
import { cn } from "@/lib/utils"

interface NavigationProps {
  /**
   * Renders the bar transparently so it can sit over the homepage hero photo.
   * Every other page needs the sticky, opaque treatment.
   */
  overlay?: boolean
}

export function Navigation({ overlay = false }: NavigationProps) {
  return (
    <nav
      className={cn(
        "w-full",
        overlay ? "relative z-10" : "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md",
      )}
    >
      <Container className="flex items-center justify-between py-6">
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
          aria-label="jett.io home"
        >
          <Logo />
          <span className="text-[21px] font-bold">jett.io</span>
        </Link>

        <div className="flex items-center gap-6 sm:gap-8">
          <Link href="/blog" className="font-semibold transition-colors hover:text-primary">
            Blog
          </Link>
          <Link href="/about" className="font-semibold transition-colors hover:text-primary">
            About
          </Link>
          <Link
            href="/#subscribe"
            className="rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground transition-colors hover:bg-amber-hover"
          >
            Subscribe
          </Link>
        </div>
      </Container>
    </nav>
  )
}
