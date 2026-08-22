import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Logo } from "@/components/logo"
import { LatestLogs } from "@/components/latest-logs"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <Logo className="justify-center mb-8" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Engineering Practices That <span className="text-primary">Matter</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-balance">
              Engineering Leadership in the Age of AI: Signal Over Noise
            </p>
            <p className="text-lg text-card-foreground mb-10 max-w-2xl mx-auto leading-relaxed text-pretty">
              Cut through the hype. Get practical, battle-tested insights on AI, DevOps, security, and resilience from
              an engineering leader who's been in the trenches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-lg"
              >
                <Link href="/blog">
                  Read the Blog <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Latest Logs — bento section */}
        <LatestLogs />

        {/* About Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-surface-container border border-outline-variant/15 p-8 md:p-12">
            <h2 className="text-3xl font-bold mb-6">Why This Blog Exists</h2>
            <div className="space-y-4 text-card-foreground leading-relaxed">
              <p>
                I'm an Engineering Manager at BNZ with 6+ years leading digital engineering teams. I've seen the AI hype
                cycle from the inside, and I've learned what actually works versus what just sounds good in meetings.
              </p>
              <p>
                This blog is about cutting through the noise. Every post is designed to give you something you can
                implement on Monday morning. No theory for theory's sake. No buzzword bingo. Just practical,
                battle-tested insights.
              </p>
              <p className="text-primary font-bold">Signal over noise. Always.</p>
            </div>
            <div className="mt-8">
              <Button asChild variant="outline" className="border-primary/30 hover:border-primary bg-transparent">
                <Link href="/about">Learn More About Me</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            <NewsletterSignup />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
