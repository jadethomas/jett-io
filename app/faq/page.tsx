import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FaqItem } from "@/components/faq-item"
import { FaqHashHandler } from "@/components/faq-hash-handler"
import { faqItems } from "@/lib/faq"

export const metadata: Metadata = {
  title: "FAQ — Jett.io",
  description:
    "Answers to common questions about jett.io: who writes it, what it covers, how to subscribe, and how to get in touch.",
}

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">FAQ</h1>
            <p className="text-xl text-muted-foreground leading-relaxed text-pretty">
              Common questions about the blog, the writer, and how to get in touch. Click a question to expand it.
            </p>
          </header>

          <section aria-label="Frequently asked questions" className="space-y-4">
            {faqItems.map((item) => (
              <FaqItem key={item.id} item={item} />
            ))}
          </section>

          <FaqHashHandler />

          <aside className="mt-16 bg-surface-container border border-outline-variant/15 p-8">
            <h2 className="text-2xl font-bold mb-3">Didn&apos;t find what you were looking for?</h2>
            <p className="text-card-foreground leading-relaxed">
              The <a href="/about" className="text-primary hover:underline">About page</a> has contact details. Good
              questions often become future posts.
            </p>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
