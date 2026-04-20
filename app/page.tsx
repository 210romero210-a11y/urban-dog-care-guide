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

export default function Home() {
  const latestPost = getLatestPost();
  const categories = [
    { title: "Nutrition", description: "Best dog foods, feeding guides, and nutrition tips", slug: "nutrition", icon: "🍖" },
    { title: "Training", description: "Commands, behavior, and positive reinforcement", slug: "training", icon: "🎓" },
    { title: "Health", description: "Preventive care, common issues, and vet tips", slug: "health", icon: "🏥" },
    { title: "Grooming", description: "Brushing, bathing, and grooming guides", slug: "grooming", icon: "✂️" },
    { title: "Gear", description: "Reviews and recommendations", slug: "gear", icon: "🎒" },
    { title: "Senior Dogs", description: "Care guides for older dogs", slug: "senior-dogs", icon: "🐕" },
  ];

  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-blue-900/20" />
        <div className="max-w-6xl mx-auto px-6 py-24 relative">
          <p className="text-amber-400 font-medium mb-4 text-center">Welcome to Urban Dog Care</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-center">
            Your Dog, Your Space, <span className="text-amber-400">Our Help</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 text-center">
            Expert guidance on training, health, grooming, nutrition, and gear for apartment dog owners. 
            Because great dogs don't need big yards.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/articles"
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
            >
              Read Our Guides
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Article */}
      {latestPost && (
        <section className="py-16 bg-slate-800/30">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-sm font-medium text-amber-400 mb-4">Latest Article</h2>
            <Link 
              href={`/articles/${latestPost.slug}`}
              className="block bg-slate-800 rounded-2xl p-8 hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium">
                  {latestPost.category}
                </span>
                <span className="text-slate-500 text-sm">{latestPost.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">{latestPost.title}</h3>
              <p className="text-slate-400 mb-4">{latestPost.description}</p>
              <span className="text-amber-400 hover:text-amber-300 font-medium">
                Read More →
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Explore Dog Care Topics</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href="/articles"
                className="bg-slate-800 p-6 rounded-xl hover:bg-slate-700 transition-colors group"
              >
                <span className="text-3xl mb-3 block">{cat.icon}</span>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-amber-400 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-slate-400">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">Why Trust Urban Dog Care?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="font-semibold mb-2">Research-Backed</h3>
              <p className="text-slate-400 text-sm">
                Our guides are based on veterinary research and expert recommendations.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">♡</span>
              </div>
              <h3 className="font-semibold mb-2">Dog-Loving Experts</h3>
              <p className="text-slate-400 text-sm">
                We're dog parents too. We test what we recommend.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏙️</span>
              </div>
              <h3 className="font-semibold mb-2">Apartment Specialists</h3>
              <p className="text-slate-400 text-sm">
                Every guide is tailored for small space living.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-500">
          <p className="mb-4">Urban Dog Care Guide — Dog Care for Apartment Dogs</p>
          <p className="text-sm">
            © 2026 Urban Dog Care. All rights reserved. 
            <span className="mx-2">•</span>
            <Link href="/articles" className="hover:text-amber-400">Articles</Link>
          </p>
        </div>
      </footer>
    </main>
  );
}