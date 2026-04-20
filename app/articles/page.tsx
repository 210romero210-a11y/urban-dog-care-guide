import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

interface PostData {
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export const metadata: Metadata = {
  title: "Dog Care Articles | Urban Dog Care Guide",
  description: "Expert guides on dog training, health, grooming, nutrition, and gear for apartment dog owners.",
};

function getPosts() {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));
  
  return files.map(filename => {
    const filePath = path.join(postsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      slug: filename.replace(".mdx", ""),
      title: String(data.title || ""),
      description: String(data.description || ""),
      date: String(data.date || ""),
      category: String(data.category || ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export default function ArticlesPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <Link href="/" className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Dog Care <span className="text-amber-400">Articles</span>
        </h1>
        <p className="text-xl text-slate-400 mb-12 max-w-2xl">
          Expert guides on training, health, grooming, nutrition, and gear for apartment dog owners.
        </p>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/articles/${post.slug}`}
              className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-all group block"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-medium">
                  {post.category}
                </span>
                <time className="text-slate-500 text-sm">{post.date}</time>
              </div>
              <h2 className="text-xl font-bold mb-3 group-hover:text-amber-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                {post.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs text-slate-500">#{tag}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p>No articles yet. Check back soon!</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800 text-center text-slate-500">
        <p>© 2026 Urban Dog Care Guide</p>
      </footer>
    </main>
  );
}