import { PostCard } from "@/components/post-card"
import { getAllPosts, getAllCategories } from "@/lib/blog"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()

  return (
    <div className="container mx-auto px-4 py-12">
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
          <Button variant="default" size="sm">
            All
          </Button>
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
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
    </div>
  )
}
