import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About</h1>
            <p className="text-2xl text-primary terminal-glow font-bold">Signal Over Noise</p>
          </div>

          {/* Main content */}
          <div className="space-y-8 text-lg leading-relaxed">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Who I Am</h2>
              <div className="space-y-4 text-card-foreground">
                <p>
                  I'm an Engineering Manager at BNZ, where I lead digital engineering teams building the future of
                  banking technology. With over 6 years of experience in engineering leadership, I've learned what
                  actually works versus what just sounds good in meetings.
                </p>
                <p>
                  My focus is on AI SDLC (Software Development Lifecycle), DevOps practices that actually ship, security
                  that goes beyond theater, and building resilient systems that survive contact with production.
                </p>
                <p>
                  I've been in the trenches. I've seen the hype cycles come and go. I've deployed AI systems to
                  production, led incident responses at 3 AM, and learned the hard way what separates theory from
                  practice.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Why This Blog Exists</h2>
              <div className="space-y-4 text-card-foreground">
                <p>
                  The engineering world is drowning in noise. Every vendor has a silver bullet. Every conference talk
                  promises to revolutionize your workflow. Every blog post is either too theoretical or too shallow.
                </p>
                <p className="text-primary font-bold">This blog is different.</p>
                <p>Every post here is designed to give you something you can implement on Monday morning:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>No theory for theory's sake</li>
                  <li>No buzzword bingo</li>
                  <li>No vendor pitches disguised as advice</li>
                </ul>
                <p>
                  Just practical, battle-tested insights from someone who's actually done the work. If I write about it,
                  it's because I've implemented it, measured it, and seen it work (or fail) in production.
                </p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="text-3xl font-bold mb-6">What I Write About</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">AI & Machine Learning</h3>
                  <p className="text-card-foreground">
                    Cutting through the hype to show what actually works in production AI systems. Real deployments,
                    real challenges, real solutions.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">DevOps & Deployment</h3>
                  <p className="text-card-foreground">
                    The practices that reduce deployment friction and increase velocity. No fluff, just what actually
                    ships.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Security</h3>
                  <p className="text-card-foreground">
                    Moving beyond security theater to build systems that actually protect users. Practical security for
                    modern engineering teams.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-3">Resilience</h3>
                  <p className="text-card-foreground">
                    Building systems that survive production. Incident response, monitoring, and the practices that keep
                    systems running.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-primary/20 rounded-lg p-8 terminal-glow-box">
              <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
              <p className="text-card-foreground mb-6">
                Have questions? Want to discuss a post? Disagree with something I wrote? I'm always interested in
                hearing from fellow engineers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold terminal-glow"
                >
                  <a href="mailto:hello@jett.io">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Me
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary/30 hover:border-primary bg-transparent">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary/30 hover:border-primary bg-transparent">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button asChild variant="outline" className="border-primary/30 hover:border-primary bg-transparent">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-16">
            <NewsletterSignup />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
