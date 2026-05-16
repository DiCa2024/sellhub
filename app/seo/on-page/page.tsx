import Link from "next/link";

const posts = [
  {
    title: "Content optimization",
    href: "/seo/on-page/content-optimization",
  },
  {
    title: "Internal link structure",
    href: "/seo/on-page/internal-link",
  },
  {
    title: "User experience (UX) and SEO",
    href: "/seo/on-page/ux-seo",
  },
];

export default function OnPageSeoPage() {
  return (
    <CategoryPage
      title="On-page SEO"
      description="콘텐츠 구조와 페이지 최적화 전략"
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