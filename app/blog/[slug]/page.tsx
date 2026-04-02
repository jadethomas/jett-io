import type React from "react"
import { notFound } from "next/navigation"
import { ActionBox } from "@/components/action-box"
import { ScrollProgress } from "@/components/scroll-progress"
import { getPostBySlug, getAllPosts } from "@/lib/blog"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MDXRemote } from "next-mdx-remote/rsc"

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const components = {
  ActionBox,
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-4xl md:text-5xl font-bold mb-6 mt-8" {...props} />
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-3xl md:text-4xl font-bold mb-4 mt-8" {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-2xl md:text-3xl font-bold mb-3 mt-6" {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => <li className="leading-relaxed" {...props} />,
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground" {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code className="bg-surface-container-lowest text-primary px-1 py-0.5 text-sm font-mono" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="bg-surface-container-lowest border border-outline-variant/15 p-4 overflow-x-auto my-6 font-mono text-sm"
      {...props}
    />
  ),
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <ScrollProgress />

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Category tag */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-bold bg-primary/10 text-primary border border-primary/30 font-label uppercase tracking-widest">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">{post.title}</h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8 pb-8 border-b border-outline-variant/15">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <div>
            <span>By {post.author}</span>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          <MDXRemote source={post.content} components={components} />
        </div>

        {/* Share buttons */}
        <div className="mt-12 pt-8 border-t border-outline-variant/15">
          <p className="text-sm text-muted-foreground mb-4">Share this post:</p>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              Twitter
            </Button>
            <Button variant="outline" size="sm">
              LinkedIn
            </Button>
            <Button variant="outline" size="sm">
              Copy Link
            </Button>
          </div>
        </div>
      </article>
    </>
  )
}
