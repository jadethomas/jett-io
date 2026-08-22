import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/container"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { PostCard } from "@/components/post-card"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/blog"

const CREDENTIALS = ["6+ yrs leading teams", "AI in production", "DevOps · Security · Resilience"]

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <Image
          src="/images/hero-kapiti-sunset.jpg"
          alt="Sunset over Kāpiti Island"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%]"
        />
        {/* Scrim, so the headline holds contrast over the photo */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,17,38,0.72)_0%,rgba(0,22,50,0.35)_45%,rgba(0,22,50,0.96)_100%)]" />

        <div className="relative">
          <Navigation overlay />

          <Container className="pb-28 pt-20 md:pb-35 md:pt-30">
            <p className="mb-3.5 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Engineering leadership in the age of AI
            </p>
            <h1 className="mb-5 max-w-[820px] text-hero font-extrabold leading-[1.04] tracking-[-0.015em] text-balance">
              Signal over noise.
              <br />
              Always.
            </h1>
            <p className="mb-9 max-w-[560px] text-xl leading-relaxed text-foreground/85 text-pretty">
              Cut through the hype. Practical, battle-tested takes on AI, DevOps, security, and resilience — from an
              engineering leader who&apos;s been in the trenches.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild size="xl" className="font-bold">
                <Link href="/blog">Read the blog</Link>
              </Button>
              <Button asChild variant="hairline" size="xl" className="font-semibold">
                <Link href="/about">About me</Link>
              </Button>
            </div>
          </Container>
        </div>
      </header>

      <main>
        {/* Latest posts */}
        <Container className="pt-22">
          <div className="mb-9 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <h2 className="mb-2 text-[38px] font-extrabold tracking-tight">Latest posts</h2>
              <p className="text-[17px] text-foreground/65">
                Opinionated takes on what actually works in modern engineering.
              </p>
            </div>
            <Link href="/blog" className="font-bold whitespace-nowrap text-accent transition-colors hover:text-primary">
              View all posts →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>

          {/* Why this blog exists */}
          <section className="mt-28 grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            <div className="relative">
              <div className="relative h-[320px] overflow-hidden rounded-md sm:h-[420px] lg:h-[520px]">
                <Image
                  src="/images/about-kapiti-horizon.jpg"
                  alt="Pointing at the horizon, Kāpiti Island at dusk"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="absolute bottom-6 left-6 rounded-[10px] bg-navy-deep/75 px-4 py-2.5 text-[13px] font-semibold text-foreground/85 backdrop-blur-sm">
                Kāpiti coast — where the thinking happens
              </p>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-primary">Why this blog exists</p>
              <h2 className="mb-4.5 text-[38px] font-extrabold leading-[1.12] tracking-tight text-pretty">
                No theory for theory&apos;s sake. No buzzword bingo.
              </h2>
              <p className="mb-4 text-[17px] leading-relaxed text-foreground/80">
                I&apos;m an Engineering Manager with 6+ years leading digital engineering teams. I&apos;ve seen the AI
                hype cycle from the inside, and I&apos;ve learned what actually works versus what just sounds good in
                meetings.
              </p>
              <p className="mb-7 text-[17px] leading-relaxed text-foreground/80">
                Every post is designed to give you something you can implement on Monday morning. Practical,
                battle-tested, signal over noise.
              </p>
              <ul className="mb-7 flex list-none flex-wrap gap-3">
                {CREDENTIALS.map((credential) => (
                  <li
                    key={credential}
                    className="rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-bold text-accent"
                  >
                    {credential}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="font-bold">
                <Link href="/about">More about me</Link>
              </Button>
            </div>
          </section>

          {/* Subscribe */}
          <section id="subscribe" className="relative mt-28 scroll-mt-24 overflow-hidden rounded-lg">
            <Image
              src="/images/subscribe-dusk-beach.jpg"
              alt="Dusk over the beach"
              fill
              sizes="100vw"
              className="object-cover object-[center_60%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,17,38,0.92)_0%,rgba(0,33,76,0.78)_55%,rgba(0,33,76,0.45)_100%)]" />
            <NewsletterSignup variant="bare" className="relative max-w-[640px] p-8 md:p-16" />
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  )
}
