import Link from "next/link";

const posts = [
  {
    title: "How search engines work",
    href: "/seo/basics/search-engines",
  },
  {
    title: "Keyword research method",
    href: "/seo/basics/keyword-research",
  },
  {
    title: "Meta tag and title optimization",
    href: "/seo/basics/meta-title",
  },
];

export default function SeoBasicsPage() {
  return (
    <SeoCategoryLayout
      title="SEO Basics"
      description="SEO를 처음 시작하는 사람들을 위한 기본 개념 정리"
      posts={posts}
    />
  );
}

function SeoCategoryLayout({
  title,
  description,
  posts,
}: any) {
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
              className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:bg-neutral-50"
            >
              {post.title}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}