import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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
      category,
      slug,
    },
  });

  if (!post) {
    return {
      title: "SEO 글",
    };
  }

  return {
    title: `${post.title} | globalsellershop SEO`,
    description:
      post.excerpt ||
      post.content.slice(0, 120),

    openGraph: {
      title: post.title,
      description:
        post.excerpt ||
        post.content.slice(0, 120),

      images: post.imageUrl
        ? [post.imageUrl.trim()]
        : [],

      type: "article",
    },

    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.excerpt ||
        post.content.slice(0, 120),

      images: post.imageUrl
        ? [post.imageUrl.trim()]
        : [],
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
      category,
      slug,
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

  const relatedPosts = await prisma.seoPost.findMany({
    where: {
      category: post.category,
      NOT: {
        id: post.id,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => line.replace("## ", "").trim());

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-12 text-neutral-900">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <div className="mb-4 inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
          {post.category}
        </div>

        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-base leading-7 text-neutral-600">
          {post.excerpt}
        </p>

        <div className="mt-5 flex flex-wrap gap-3 text-xs text-neutral-500">
          <span>조회수 {(post.views ?? 0) + 1}</span>
          <span>작성일 {new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
        </div>

        {post.imageUrl && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
            <img
              src={post.imageUrl.trim()}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {headings.length > 0 && (
          <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
            <h2 className="mb-3 text-lg font-bold">목차</h2>
            <ol className="space-y-2 text-sm text-neutral-700">
              {headings.map((heading, index) => (
                <li key={heading}>
                  {index + 1}. {heading}
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="mt-10 leading-8 text-neutral-700">
  <ReactMarkdown
    remarkPlugins={[remarkGfm]}
    components={{
      h2: ({ children }) => (
        <h2 className="mt-12 border-t border-neutral-200 pt-8 text-2xl font-bold text-neutral-900">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-8 text-xl font-bold text-neutral-900">
          {children}
        </h3>
      ),
      p: ({ children }) => (
        <p className="mt-5 leading-8 text-neutral-700">
          {children}
        </p>
      ),
      ul: ({ children }) => (
        <ul className="mt-5 list-disc space-y-2 pl-6">
          {children}
        </ul>
      ),
      ol: ({ children }) => (
        <ol className="mt-5 list-decimal space-y-2 pl-6">
          {children}
        </ol>
      ),
      li: ({ children }) => (
        <li className="leading-8 text-neutral-700">
          {children}
        </li>
      ),
      blockquote: ({ children }) => (
        <blockquote className="mt-6 rounded-2xl border-l-4 border-neutral-900 bg-neutral-50 p-5 text-sm leading-7 text-neutral-700">
          {children}
        </blockquote>
      ),
      strong: ({ children }) => (
        <strong className="font-bold text-neutral-900">
          {children}
        </strong>
      ),
      a: ({ href, children }) => (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="font-medium text-blue-600 underline underline-offset-4"
        >
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm">
          {children}
        </code>
      ),
    }}
  >
    {post.content}
  </ReactMarkdown>
</div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="mx-auto mt-10 max-w-4xl">
          <h2 className="mb-5 text-2xl font-bold">관련 글</h2>

          <div className="grid gap-5 md:grid-cols-3">
            {relatedPosts.map((item) => (
              <Link
                key={item.id}
                href={`/seo/${item.category}/${item.slug}`}
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
    </main>
  );
}