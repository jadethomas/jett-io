import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
}

export function PostCard({ title, excerpt, date, readTime, category, slug }: PostCardProps) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="bg-card border border-border hover:border-primary/40 rounded-lg p-6 transition-all hover:terminal-glow-box h-full flex flex-col">
        {/* Category tag */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-bold bg-primary/10 text-primary rounded-full border border-primary/30">
            {category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-balance">{title}</h3>

        {/* Excerpt */}
        <p className="text-muted-foreground mb-4 leading-relaxed flex-1 text-pretty">{excerpt}</p>

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
