import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ViewTracker from "./ViewTracker";
import RecentBlogTracker from "./RecentBlogTracker";
import BlogCommentClient from "./BlogCommentClient";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }: any) {
  const { id } = await params;

  const post = await prisma.blog.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!post) {
    return {
      title: "블로그 | globalsellershop",
      description: "온라인 판매, 도매 소싱, 판매 전략 관련 글을 확인해보세요.",
    };
  }

  const imageUrl =
  post.imageUrl?.trim() ||
  "https://placehold.co/1200x800?text=Blog";

const description =
  post.excerpt ||
  post.content.slice(0, 120);

return {
  title: `${post.title} | globalsellershop 블로그`,
  description,

  alternates: {
    canonical: `https://globalsellershop.com/blog/${id}`,
  },

  openGraph: {
    title: `${post.title} | globalsellershop 블로그`,
    description,
    url: `https://globalsellershop.com/blog/${id}`,

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


type PageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 3600;

const PLACEHOLDER = "https://placehold.co/1200x800?text=Blog";

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) notFound();

  const [post, latestPosts, relatedPosts, comments] =
  await Promise.all([
    prisma.blog.findUnique({
      where: { id: numericId },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        imageUrl: true,
        views: true,
        category: true,
      },
    }),

    prisma.blog.findMany({
      where: {
        NOT: { id: numericId },
      },
      take: 7,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        imageUrl: true,
      },
    }),

    prisma.blog.findMany({
      where: {
        NOT: { id: numericId },
      },
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        imageUrl: true,
      },
    }),

    prisma.blogComment.findMany({
      where: {
        blogId: numericId,
      },
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  if (!post) notFound();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white px-6 py-10 text-neutral-900">
      <ViewTracker id={post.id} />
      <RecentBlogTracker
        post={{
        id: post.id,
        title: post.title,
        imageUrl: post.imageUrl,
       }}
     />

      <div className="mx-auto max-w-7xl">
        <Link
          href="/blog"
          prefetch={false}
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 블로그로 돌아가기
        </Link>
       <nav className="mt-4 text-sm text-neutral-500">
          <Link href="/" prefetch={false} className="hover:text-neutral-900">
             HOME
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" prefetch={false} className="hover:text-neutral-900">
             Blog
         </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-900">{post.title}</span>
       </nav>
        <section className="mt-6 grid gap-10 lg:grid-cols-[1.65fr_0.75fr]">
          <div>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">
              {post.title}
            </h1>

            <div className="mt-2 text-sm text-neutral-500">
              조회수 {post.views ?? 0}
            </div>

            <div className="mt-5 border-b border-neutral-200" />

            <div className="mt-8 overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={post.imageUrl || PLACEHOLDER}
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
    }}
  >
    {post.content || post.excerpt}
  </ReactMarkdown>
</div>
          </div>

          <aside>
            <h2 className="mb-5 text-2xl font-bold">최신 글</h2>

            <div className="space-y-4">
              {latestPosts.slice(0, 7).map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}`}
                  prefetch={false}
                  className="flex gap-4"
                >
                  <div className="h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                    <Image
                      src={item.imageUrl || PLACEHOLDER}
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
        <section className="mt-16">
  <h2 className="mb-6 text-2xl font-bold">
    관련 글
  </h2>

  <div className="space-y-4">
    {relatedPosts.map((item) => (
      <Link
        key={item.id}
        href={`/blog/${item.id}`}
        prefetch={false}
        className="flex gap-4 rounded-2xl border border-neutral-200 bg-white p-4 transition hover:bg-neutral-50"
      >
        <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl bg-neutral-100">
          <Image
            src={item.imageUrl || PLACEHOLDER}
            alt={item.title}
            width={400}
            height={300}
            sizes="128px"
            className="h-full w-full object-contain bg-white"
          />
        </div>

       <div className="flex flex-1 flex-col justify-center">
          <h3 className="line-clamp-2 text-base font-bold">
            {item.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {item.excerpt}
          </p>
        </div>
      </Link>
    ))}
  </div>
</section>
        <BlogCommentClient blogId={post.id} initialComments={comments} />
     </div>
    </main>
  );
}