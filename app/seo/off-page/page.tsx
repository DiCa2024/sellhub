import Link from "next/link";

const posts = [
  {
    title: "Principle of backlinks",
    href: "/seo/off-page/backlinks",
  },
  {
    title: "How to increase domain authority",
    href: "/seo/off-page/domain-authority",
  },
  {
    title: "Trust and brand search",
    href: "/seo/off-page/trust-brand-search",
  },
];

export default function OffPageSeoPage() {
  return (
    <CategoryPage
      title="Off-page SEO"
      description="백링크와 사이트 신뢰도를 높이는 전략"
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