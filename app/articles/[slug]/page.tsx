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
    return <h1 key={i} className="text-3xl font-bold mt-10 mb-5 text-amber-400">{line.slice(2)}</h1>;
  }
  if (line.startsWith('## ')) {
    return <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-amber-400">{line.slice(3)}</h2>;
  }
  if (line.startsWith('### ')) {
    return <h3 key={i} className="text-xl font-semibold mt-8 mb-3 text-amber-300">{line.slice(4)}</h3>;
  }
  
  // Blockquote
  if (line.startsWith('> ')) {
    return <blockquote key={i} className="border-l-4 border-amber-500 pl-5 py-3 my-5 bg-slate-800/50 rounded-r-lg text-amber-200 italic">{line.slice(2)}</blockquote>;
  }
  
  // Lists
  if (line.startsWith('- ')) {
    return <li key={i} className="ml-5 mb-2 text-slate-300">{line.slice(2)}</li>;
  }
  
  // Strong emphasis
  if (line.startsWith('**') && line.endsWith('**')) {
    return <p key={i} className="my-3"><strong className="text-amber-400 font-semibold">{line.slice(2, -2)}</strong></p>;
  }
  
  // Horizontal rule
  if (line.trim() === '---') {
    return <hr key={i} className="my-10 border-slate-700" />;
  }
  
  // Empty line
  if (line.trim() === '') {
    return <div key={i} className="h-3" />;
  }
  
  // Regular paragraph
  return <p key={i} className="my-4 text-slate-300 leading-relaxed">{line}</p>;
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const filePath = path.join(postsDir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const postData = data as PostData;
  
  // Ensure date is a string
  const dateStr = String(postData.date);
  const lines = content.split('\n');
  
  return (
    <main className="min-h-screen bg-slate-900 text-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="text-amber-400 hover:text-amber-300 font-medium flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <Link 
              href="/articles" 
              className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-medium hover:bg-amber-500/30 transition-colors"
            >
              {postData.category}
            </Link>
            <time className="text-slate-500">{dateStr}</time>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">{postData.title}</h1>
          <p className="text-xl text-slate-400 leading-relaxed">{postData.description}</p>
        </header>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-10">
          {postData.tags?.map((tag: string) => (
            <span key={tag} className="text-sm text-slate-500">#{tag}</span>
          ))}
        </div>
        
        <hr className="border-slate-800 mb-10" />
        
        {/* Content */}
        <div className="prose prose-invert prose-amber max-w-none">
          {lines.map((line, i) => renderLine(line, i))}
        </div>
        
        {/* Footer */}
        <hr className="border-slate-800 mt-16 mb-8" />
        <div className="bg-slate-800/50 rounded-xl p-6 text-center">
          <p className="text-slate-400 mb-4">
            Thanks for reading! Check out more dog care guides below.
          </p>
          <Link 
            href="/articles" 
            className="inline-block px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-900 font-semibold rounded-lg transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </article>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-800 text-center text-slate-500">
        <p>© 2026 Urban Dog Care Guide — Dog Care for Apartment Dogs</p>
      </footer>
    </main>
  );
}