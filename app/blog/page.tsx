import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PostCard } from "@/components/post-card"
import { getAllPosts, getAllCategories } from "@/lib/blog"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 mx-auto w-full max-w-[1240px] px-6 md:px-14 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground">
            Practical engineering leadership insights. No fluff, just signal.
          </p>
        </div>

        {/* Category filters */}
        {categories.length > 0 && (
          <div className="mb-8 flex flex-wrap gap-3">
            <Button variant="outline" className="border-primary bg-primary/10 text-primary hover:bg-primary/20">
              All
            </Button>
            {categories.map((category) => (
              <Button key={category} variant="outline" className="border-border hover:border-primary/40 bg-transparent">
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} {...post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg mb-4">No posts yet. Check back soon!</p>
            <p className="text-sm text-muted-foreground">
              Posts will be loaded from the <code className="text-primary">content/posts</code> directory.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
