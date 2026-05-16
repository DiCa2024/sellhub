import Link from "next/link";

const posts = [
  {
    title: "Write SEO content with ChatGPT",
    href: "/seo/ai-automation/chatgpt-seo-content",
  },
  {
    title: "Automatic keyword clustering",
    href: "/seo/ai-automation/keyword-clustering",
  },
  {
    title: "Data-based SEO analysis",
    href: "/seo/ai-automation/data-analysis",
  },
];

export default function AiAutomationPage() {
  return (
    <CategoryPage
      title="AI & Automation"
      description="AI와 자동화를 활용한 SEO 전략"
      posts={posts}
    />
  );
}

function CategoryPage({ title, description, posts }: any) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold">{title}</h1>

        <p className="mt-4 text-neutral-600">{description}</p>

        <div className="mt-8 grid gap-4">
          {posts.map((post: any) => (
            <Link
              key={post.href}
              href={post.href}
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm hover:bg-neutral-50"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}