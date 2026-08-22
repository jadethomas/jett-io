import Image from "next/image"
import Link from "next/link"
import { formatPostDate } from "@/lib/blog"
import { cn } from "@/lib/utils"

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
  image: string
  imageAlt: string
}

/** Each category gets its own accent so the grid reads at a glance. */
const CATEGORY_COLORS: Record<string, string> = {
  AI: "text-primary",
  DevOps: "text-accent",
  Security: "text-destructive",
}

export function PostCard({ title, excerpt, date, readTime, category, slug, image, imageAlt }: PostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block h-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-sm border border-border bg-card transition-colors group-hover:border-primary">
        <div className="relative h-[210px] w-full">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col gap-2.5 px-6 pb-7 pt-6">
          <span
            className={cn(
              "self-start text-xs font-extrabold uppercase tracking-[0.1em]",
              CATEGORY_COLORS[category] ?? "text-muted-foreground",
            )}
          >
            {category}
          </span>

          <h3 className="text-[22px] font-bold leading-tight text-pretty">{title}</h3>

          <p className="flex-1 text-[15px] leading-relaxed text-muted-foreground text-pretty">{excerpt}</p>

          <p className="mt-1.5 text-[13px] font-semibold text-foreground/50">
            {formatPostDate(date)} · {readTime}
          </p>
        </div>
      </article>
    </Link>
  )
}
