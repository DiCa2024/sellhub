import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import SeoCommentClient from "./SeoCommentClient";

const PLACEHOLDER = "https://placehold.co/1200x800?text=SEO";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}) {
  const { category, slug } = await params;

  const post = await prisma.seoPost.findFirst({
    where: {
      category: category.trim(),
      slug: slug.trim(),
    },
  });

  if (!post) {
    return {
      title: "SEO | globalsellershop",
      description: "SEO 가이드와 검색엔진 최적화 정보를 확인해보세요.",
    };
  }

  const imageUrl = post.imageUrl?.trim() || PLACEHOLDER;
  const description = post.excerpt || post.content.slice(0, 120);

  return {
    title: `${post.title} | globalsellershop SEO`,
    description,
    openGraph: {
      title: `${post.title} | globalsellershop SEO`,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 800,
        },
      ],
    },
  };
}

export default async function SeoPostDetailPage({
  params,
}: {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}) {
  const { category, slug } = await params;

  const post = await prisma.seoPost.findFirst({
    where: {
      category: category.trim(),
      slug: slug.trim(),
    },
  });

  if (!post) {
    notFound();
  }

  await prisma.seoPost.update({
    where: {
      id: post.id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  const [latestPosts, relatedPosts, comments] = await Promise.all([
  prisma.seoPost.findMany({
    where: {
      NOT: {
        id: post.id,
      },
    },
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      category: true,
      slug: true,
      imageUrl: true,
    },
  }),

  prisma.seoPost.findMany({
    where: {
      category: post.category,
      NOT: {
        id: post.id,
      },
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  }),

  prisma.seoComment.findMany({
    where: {
      seoPostId: post.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  }),
]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white px-6 py-10 text-neutral-900">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/seo"
          prefetch
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← SEO로 돌아가기
        </Link>

        <section className="mt-6 grid gap-10 lg:grid-cols-[1.65fr_0.75fr]">
          <div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-2 text-sm text-neutral-500">
              조회수 {(post.views ?? 0) + 1}
            </div>

            <div className="mt-5 border-b border-neutral-200" />

            <div className="mt-8 overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={post.imageUrl?.trim() || PLACEHOLDER}
                alt={post.title}
                width={1200}
                height={800}
                priority
                sizes="(max-width: 768px) 100vw, 900px"
                className="h-full w-full object-contain bg-white"
              />
            </div>

            <div className="mt-8 prose prose-neutral max-w-none text-neutral-800">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <Link
                      href={href || "#"}
                      className="font-medium text-blue-600 underline"
                    >
                      {children}
                    </Link>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mt-10 text-2xl font-bold text-neutral-900">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 text-xl font-bold text-neutral-900">
                      {children}
                    </h3>
                  ),
                  p: ({ children }) => (
                    <p className="my-4 text-[17px] leading-9 text-neutral-800">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="my-4 list-disc space-y-2 pl-6 text-[17px] leading-8">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="my-4 list-decimal space-y-2 pl-6 text-[17px] leading-8">
                      {children}
                    </ol>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="my-6 rounded-2xl border-l-4 border-neutral-900 bg-neutral-50 p-5 text-[16px] leading-8 text-neutral-700">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {post.content || post.excerpt}
              </ReactMarkdown>
            </div>

            <SeoCommentClient seoPostId={post.id} initialComments={comments} />

            {relatedPosts.length > 0 && (
              <section className="mt-16">
                <h2 className="mb-5 text-2xl font-bold">관련 글</h2>

                <div className="grid gap-5 md:grid-cols-3">
                  {relatedPosts.map((item) => (
                    <Link
                      key={item.id}
                      href={`/seo/${item.category}/${item.slug}`}
                      prefetch
                      className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="mb-3 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600">
                        {item.category}
                      </div>

                      <h3 className="line-clamp-2 font-bold leading-6">
                        {item.title}
                      </h3>

                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-neutral-600">
                        {item.excerpt}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside>
            <h2 className="mb-5 text-2xl font-bold">최신 SEO 글</h2>

            <div className="space-y-4">
              {latestPosts.map((item) => (
                <Link
                  key={item.id}
                  href={`/seo/${item.category}/${item.slug}`}
                  prefetch
                  className="flex gap-4"
                >
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.imageUrl?.trim() || PLACEHOLDER}
                      alt={item.title}
                      width={400}
                      height={300}
                      sizes="128px"
                      className="h-full w-full object-contain bg-white"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-3 text-base font-bold leading-6 text-neutral-900">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}