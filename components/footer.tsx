import Link from "next/link"
import { Container } from "./container"
import { Logo } from "./logo"

// TODO(JETT-32): these are placeholder profile roots carried over from the
// previous footer — swap for real profile URLs once they're confirmed.
const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Twitter", href: "https://twitter.com" },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-28">
      <Container className="pb-12 pt-18">
        <div className="grid grid-cols-1 gap-12 border-b border-foreground/15 pb-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="mb-3.5 flex items-center gap-3">
              <Logo className="h-[34px] w-[34px]" />
              <span className="text-[19px] font-bold">jett.io</span>
            </div>
            <p className="max-w-[320px] text-[15px] leading-relaxed text-foreground/60">
              Engineering leadership in the age of AI. Signal over noise.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground/50">
              Quick links
            </p>
            <Link href="/blog" className="text-[15px] text-foreground/80 transition-colors hover:text-primary">
              Blog
            </Link>
            <Link href="/about" className="text-[15px] text-foreground/80 transition-colors hover:text-primary">
              About
            </Link>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground/50">Connect</p>
            {SOCIAL_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[15px] text-foreground/80 transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        <p className="mt-6 text-[13px] text-foreground/45">&copy; {currentYear} jett.io. All rights reserved.</p>
      </Container>
    </footer>
  )
}
