import { Logo } from "@/components/logo"
import { PostCard } from "@/components/post-card"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// Sample featured posts data
const featuredPosts = [
  {
    title: "Everyone's Wrong About AI Agents in Production",
    excerpt:
      "The hype cycle is real, but so are the practical applications. Here's what actually works in enterprise AI deployments.",
    date: "Jan 15, 2025",
    readTime: "8 min read",
    category: "AI",
    slug: "ai-agents-production",
  },
  {
    title: "The DevOps Practices That Actually Ship",
    excerpt:
      "Forget the buzzwords. These are the battle-tested practices that reduce deployment friction and increase velocity.",
    date: "Jan 10, 2025",
    readTime: "6 min read",
    category: "DevOps",
    slug: "devops-practices-ship",
  },
  {
    title: "Security Theater vs. Real Security",
    excerpt:
      "Stop checking boxes and start building systems that actually protect your users. A practical guide to security that matters.",
    date: "Jan 5, 2025",
    readTime: "10 min read",
    category: "Security",
    slug: "security-theater-real",
  },
]

export default function HomePage() {
  return (
    <>
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
              className="text-lg"
            >
              <Link href="/blog">
                Read the Blog <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-4">Latest Posts</h2>
          <p className="text-muted-foreground text-lg">
            Opinionated takes on what actually works in modern engineering
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
          >
            <Link href="/blog">View All Posts</Link>
          </Button>
        </div>
      </section>

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
            <Button asChild variant="outline">
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
    </>
  )
}
