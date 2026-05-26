import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getAllPosts, type PostMetadata } from "@/lib/blog"

function formatPostDate(iso: string): string {
  const parsed = new Date(iso)
  if (Number.isNaN(parsed.getTime())) return iso
  return parsed.toLocaleDateString("en-NZ", { month: "short", year: "numeric" })
}

export function LatestLogs() {
  const posts: PostMetadata[] = getAllPosts().slice(0, 5)

  return (
    <section className="px-12 md:px-24 mb-40">
      <div className="grid grid-cols-12 gap-0 border-t border-outline-variant/15">
        {/* Latest Posts Column */}
        <div className="col-span-12 lg:col-span-7 pt-20 lg:pr-24">
          <div className="flex items-center gap-4 mb-16">
            <span className="font-label text-xs tracking-widest uppercase text-primary-container">01</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight">LATEST LOGS</h2>
          </div>

          <div className="space-y-0">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border-b border-outline-variant/15 py-12 transition-all hover:bg-surface-container-low/50"
              >
                <div className="flex justify-between items-start gap-8">
                  <div className="flex-1">
                    <span className="font-label text-xs text-slate-500 mb-2 block uppercase">
                      {formatPostDate(post.date)} • {post.category}
                    </span>
                    <h3 className="font-headline text-2xl font-bold group-hover:text-primary-container transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-on-surface-variant mt-4 line-clamp-2 max-w-xl">{post.excerpt}</p>
                  </div>
                  <ArrowRight
                    aria-hidden="true"
                    className="text-primary-container w-8 h-8 shrink-0 transition-transform group-hover:translate-x-2"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Sidebar placeholder — filled by JETT-17 */}
        <div className="col-span-12 lg:col-span-5" />
      </div>
    </section>
  )
}
