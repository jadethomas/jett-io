import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { format, parseISO } from "date-fns"

const postsDirectory = path.join(process.cwd(), "content/posts")

/** Shown when a post's frontmatter omits `image`, so a missing field never breaks the build. */
const FALLBACK_POST_IMAGE = "/images/hero-kapiti-sunset.jpg"

export interface PostMetadata {
  title: string
  date: string
  excerpt: string
  category: string
  readTime: string
  author: string
  slug: string
  image: string
  imageAlt: string
}

/** Renders a raw frontmatter date ("2025-01-15") for display ("Jan 15, 2025"). */
export function formatPostDate(date: string): string {
  return format(parseISO(date), "MMM d, yyyy")
}

export interface Post extends PostMetadata {
  content: string
}

export function getAllPosts(): PostMetadata[] {
  // Create directory if it doesn't exist
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        category: data.category,
        readTime: data.readTime,
        author: data.author,
        image: data.image ?? FALLBACK_POST_IMAGE,
        imageAlt: data.imageAlt ?? "",
      } as PostMetadata
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      category: data.category,
      readTime: data.readTime,
      author: data.author,
      image: data.image ?? FALLBACK_POST_IMAGE,
      imageAlt: data.imageAlt ?? "",
      content,
    }
  } catch {
    return null
  }
}

export function getPostsByCategory(category: string): PostMetadata[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.category === category)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = new Set(allPosts.map((post) => post.category))
  return Array.from(categories)
}
