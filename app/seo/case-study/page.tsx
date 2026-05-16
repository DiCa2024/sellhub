import Link from "next/link";

const posts = [
  {
    title: "Keyword insertion frequency experiment",
    href: "/seo/case-study/keyword-frequency",
  },
  {
    title: "CTR experiment with numbers in titles",
    href: "/seo/case-study/title-number-ctr",
  },
  {
    title: "Traffic growth report",
    href: "/seo/case-study/traffic-growth",
  },
];

export default function CaseStudyPage() {
  return (
    <CategoryPage
      title="Experiment & Case Study"
      description="실제 SEO 실험과 트래픽 성장 기록"
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