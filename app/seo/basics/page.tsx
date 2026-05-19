import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function SeoBasicsPage() {
  const posts = await prisma.seoPost.findMany({
    where: { category: "basics" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <CategoryPage
      title="SEO Basics"
      description="검색엔진 작동 방식, 키워드 조사, 메타태그 최적화의 기본을 정리합니다."
      posts={posts}
    />
  );
}

function CategoryPage({ title, description, posts }: any) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-12 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm">
          <p className="mb-3 text-sm font-medium text-neutral-500">SEO Category</p>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-4 text-neutral-600">{description}</p>
        </section>

        {posts.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
            아직 등록된 글이 없습니다.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post: any) => (
              <SeoCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function SeoCard({ post }: { post: any }) {
  return (
    <Link
      href={`/seo/${post.category.trim()}/${post.slug.trim()}`}
      className="flex h-full flex-col rounded-[24px] border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="h-44 overflow-hidden rounded-2xl bg-neutral-100">
        <img
          src={post.imageUrl?.trim() || "https://placehold.co/600x400?text=SEO"}
          alt={post.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-4 inline-flex w-fit rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
        {post.category}
      </div>

      <h2 className="mt-3 line-clamp-2 text-lg font-bold leading-7">
        {post.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
        {post.excerpt}
      </p>

      <div className="mt-auto pt-4 text-xs text-neutral-500">
        조회수 {post.views ?? 0}
      </div>
    </Link>
  );
}