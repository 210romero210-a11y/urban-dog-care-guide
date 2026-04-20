import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Link from "next/link";

const postsDir = path.join(process.cwd(), "content/posts");

interface PostData {
  title: string;
  description: string;
  date: string;
  author?: string;
  category: string;
  tags: string[];
  image?: string;
  seo?: {
    title: string;
    description: string;
  };
}

export async function generateStaticParams() {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter(f => f.endsWith(".mdx"));
  return files.map(filename => ({
    slug: filename.replace(".mdx", ""),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContent);
  const postData = data as PostData;
  
  return {
    title: postData.seo?.title || postData.title,
    description: postData.seo?.description || postData.description,
  };
}

function renderLine(line: string, i: number): React.ReactNode {
  // Headings
  if (line.startsWith('# ')) {
    return <h1 key={i} className="text-3xl md:text-4xl font-bold mt-12 mb-6 text-amber-400">{line.slice(2)}</h1>;
  }
  if (line.startsWith('## ')) {
    return <h2 key={i} className="text-2xl md:text-3xl font-bold mt-10 mb-5 text-amber-400">{line.slice(3)}</h2>;
  }
  if (line.startsWith('### ')) {
    return <h3 key={i} className="text-xl font-semibold mt-8 mb-4 text-amber-300">{line.slice(4)}</h3>;
  }
  
  // Blockquote
  if (line.startsWith('> ')) {
    const text = line.slice(2);
    if (text.includes('Disclosure') || text.includes('affiliate')) {
      return (
        <div key={i} className="my-8 p-6 bg-amber-500/10 border-l-4 border-amber-500 rounded-r-xl">
          <p className="text-amber-200 italic">{text}</p>
        </div>
      );
    }
    return <blockquote key={i} className="border-l-4 border-amber-500 pl-5 py-3 my-5 text-amber-200/80 italic">{text}</blockquote>;
  }
  
  // Lists
  if (line.startsWith('- ')) {
    return (
      <div key={i} className="flex items-start gap-3 my-2 ml-4">
        <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 shrink-0" />
        <span className="text-slate-300">{line.slice(2)}</span>
      </div>
    );
  }
  
  // Strong emphasis
  if (line.startsWith('**') && line.endsWith('**')) {
    return <p key={i} className="my-4 text-lg"><strong className="text-amber-400 font-semibold">{line.slice(2, -2)}</strong></p>;
  }
  
  // Horizontal rule
  if (line.trim() === '---') {
    return <hr key={i} className="my-12 border-slate-700" />;
  }
  
  // Empty line
  if (line.trim() === '') {
    return <div key={i} className="h-4" />;
  }
  
  // Regular paragraph
  return <p key={i} className="my-4 text-slate-300 leading-relaxed text-lg">{line}</p>;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const postData = data as PostData;
  
  const dateStr = String(postData.date);
  const lines = content.split('\n');
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2">
            ← Home
          </Link>
          <Link href="/articles" className="text-slate-400 hover:text-amber-400 text-sm">
            All Articles
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/articles" 
              className="px-4 py-1.5 bg-amber-500/15 text-amber-400 rounded-full text-sm font-medium hover:bg-amber-500/25 transition-colors"
            >
              {postData.category}
            </Link>
            <time className="text-slate-500">{dateStr}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{postData.title}</h1>
          <p className="text-xl text-slate-300 leading-relaxed">{postData.description}</p>
        </header>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8 pb-8 border-b border-slate-800">
          {postData.tags?.map((tag: string) => (
            <span key={tag} className="text-sm text-slate-500">#{tag}</span>
          ))}
        </div>
        
        {/* Content */}
        <div className="prose prose-invert prose-amber max-w-none">
          {lines.map((line, i) => renderLine(line, i))}
        </div>
        
        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-slate-800">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-800/20 rounded-2xl p-8 text-center border border-slate-700/50">
            <p className="text-slate-300 mb-6 text-lg">
              Thanks for reading! Check out more dog care guides below.
            </p>
            <Link 
              href="/articles" 
              className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-900 font-semibold rounded-xl transition-colors"
            >
              View All Guides
            </Link>
          </div>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800 text-center text-slate-500">
        <p>© 2026 Urban Dog Care Guide — Dog Care for Apartment Dogs</p>
      </footer>
    </main>
  );
}