import Link from "next/link";
import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export const metadata: Metadata = {
  title: "Urban Dog Care Guide | Dog Care for Apartment Dogs",
  description: "Your trusted guide for dog care in apartments. Expert advice on training, health, grooming, nutrition, and gear for dog owners in small spaces.",
};

interface PostData {
  title: string;
  description: string;
  date: string;
  category: string;
}

function getLatestPost(): { slug: string; title: string; description: string; date: string; category: string } | null {
  if (!fs.existsSync(postsDir)) return null;
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));
  if (files.length === 0) return null;
  
  const filePath = path.join(postsDir, files[0]);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);
  
  return {
    slug: files[0].replace(".mdx", ""),
    title: String(data.title || ""),
    description: String(data.description || ""),
    date: String(data.date || ""),
    category: String(data.category || ""),
  };
}

function getAllPosts() {
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
    };
  }).sort((a, b) => b.date.localeCompare(a.date));
}

export default function Home() {
  const latestPost = getLatestPost();
  const allPosts = getAllPosts();
  const recentPosts = allPosts.slice(0, 3);
  
  const categories = [
    { title: "Nutrition", description: "Best foods, feeding guides & nutrition tips", slug: "nutrition", icon: "🍖" },
    { title: "Training", description: "Commands, behavior & positive reinforcement", slug: "training", icon: "🎓" },
    { title: "Health", description: "Preventive care, common issues & vet tips", slug: "health", icon: "🏥" },
    { title: "Grooming", description: "Brushing, bathing & grooming guides", slug: "grooming", icon: "✂️" },
    { title: "Gear", description: "Reviews & recommendations", slug: "gear", icon: "🎒" },
    { title: "Senior Dogs", description: "Care guides for older dogs", slug: "senior-dogs", icon: "🐕" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/8 via-transparent to-blue-900/15" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl" />
        
        <div className="max-w-6xl mx-auto px-6 py-28 relative">
          <div className="text-center max-w-3xl mx-auto">
            <p className="text-amber-400 font-medium mb-4 tracking-wide uppercase text-sm">Welcome to Urban Dog Care</p>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Dog, Your Space, <span className="text-amber-400">Our Help</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Expert guidance on training, health, grooming, nutrition, and gear for apartment dog owners. 
              Because great dogs don't need big yards — just loving homes.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/articles"
                className="px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/25"
              >
                Explore Guides
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Article */}
      {latestPost && (
        <section className="py-16 bg-slate-800/30 border-y border-slate-700/50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-12 h-1 bg-amber-500 rounded-full" />
              <h2 className="text-sm font-medium text-amber-400 uppercase tracking-wider">Latest Guide</h2>
            </div>
            <Link 
              href={`/articles/${latestPost.slug}`}
              className="block bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-2xl p-8 md:p-10 hover:from-slate-700 hover:to-slate-700/50 transition-all border border-slate-700/50 hover:border-amber-500/30 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="px-4 py-1.5 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {latestPost.category}
                </span>
                <span className="text-slate-500 text-sm">{latestPost.date}</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-amber-400 transition-colors">
                {latestPost.title}
              </h3>
              <p className="text-slate-400 text-lg mb-6 max-w-2xl">
                {latestPost.description}
              </p>
              <span className="inline-flex items-center gap-2 text-amber-400 font-medium group-hover:gap-3 transition-all">
                Read Full Guide →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Dog Care Topics</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">Everything you need to know about raising a happy, healthy dog in your apartment.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {categories.map((cat, idx) => (
              <Link
                key={cat.slug}
                href="/articles"
                className="bg-slate-800/50 p-7 rounded-2xl hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-amber-500/20 group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <span className="text-4xl mb-4 block">{cat.icon}</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-400 text-sm">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      {recentPosts.length > 1 && (
        <section className="py-20 bg-slate-800/20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl font-bold">Recent Guides</h2>
              <Link href="/articles" className="text-amber-400 hover:text-amber-300 font-medium">
                View All →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/articles/${post.slug}`}
                  className="bg-slate-800/50 rounded-xl p-6 hover:bg-slate-700/50 transition-all border border-slate-700/50 hover:border-amber-500/20 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-amber-500/15 text-amber-400 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm line-clamp-2">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Trust Us */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Dog Owners Trust Urban Dog Care</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-b from-slate-800/50 to-transparent p-6 rounded-2xl">
              <div className="w-14 h-14 bg-amber-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Research-Backed</h3>
              <p className="text-slate-400 text-sm">
                Our guides are based on veterinary research, expert recommendations, and real-world testing.
              </p>
            </div>
            <div className="bg-gradient-to-b from-slate-800/50 to-transparent p-6 rounded-2xl">
              <div className="w-14 h-14 bg-amber-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Dog-Loving Experts</h3>
              <p className="text-slate-400 text-sm">
                We're dog parents too. Every recommendation comes from hands-on experience.
              </p>
            </div>
            <div className="bg-gradient-to-b from-slate-800/50 to-transparent p-6 rounded-2xl">
              <div className="w-14 h-14 bg-amber-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏙️</span>
              </div>
              <h3 className="font-semibold mb-3 text-lg">Apartment Specialists</h3>
              <p className="text-slate-400 text-sm">
                We understand urban living. Every guide is tailored for small space dog owners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-amber-500/10 to-blue-900/10 border-t border-slate-700/50">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-slate-400 mb-8">
            Get the latest dog care tips delivered to your inbox. New guides every week!
          </p>
          <Link 
            href="/articles"
            className="inline-block px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-xl transition-colors"
          >
            Browse All Guides
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-slate-500 mb-2">Urban Dog Care Guide — Dog Care for Apartment Dogs</p>
          <p className="text-sm text-slate-600">
            © 2026 Urban Dog Care. Made with ❤️ for dog owners everywhere.
          </p>
        </div>
      </footer>
    </main>
  );
}