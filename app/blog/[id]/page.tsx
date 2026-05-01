import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ViewTracker from "./ViewTracker";
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
      title: "블로그 | sellhub",
      description: "온라인 판매, 도매 소싱, 판매 전략 관련 글을 확인해보세요.",
    };
  }

  return {
    title: `${post.title} | sellhub 블로그`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | sellhub 블로그`,
      description: post.excerpt,
      images: [
        {
          url: post.imageUrl,
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

export const revalidate = 60;

const PLACEHOLDER = "https://placehold.co/1200x800?text=Blog";

const sellerTools = [
  {
    id: "margin-calculator",
    title: "마진 계산기",
    description: "매입가, 배송비, 수수료, 판매가 기준으로 순이익과 마진율을 계산합니다.",
    href: "/sellertool/margin-calculator",
  },
  {
    id: "sales-price-calculator",
    title: "판매가 계산기",
    description: "목표 마진율을 기준으로 적정 판매가를 계산합니다.",
    href: "/sellertool/sales-price-calculator",
  },
  {
    id: "commission-calculator",
    title: "수수료 계산기",
    description: "플랫폼 수수료와 차감 금액을 간단히 계산합니다.",
    href: "/sellertool/commission-calculator",
  },
  {
    id: "memo-check-tool",
    title: "메모 / 체크 도구",
    description: "소싱 메모와 체크리스트를 빠르게 정리할 수 있습니다.",
    href: "/sellertool/memo-check-tool",
  },
];

export default async function BlogDetailPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) notFound();

  const [post, latestPosts, latestWholesaleSites, latestSalesChannels, comments] =
    await Promise.all([
      prisma.blog.findUnique({
        where: { id: numericId },
      }),

      prisma.blog.findMany({
        where: {
          NOT: {
            id: numericId,
          },
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

      prisma.wholesaleSite.findMany({
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      }),

      prisma.salesChannel.findMany({
        take: 4,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          name: true,
          imageUrl: true,
        },
      }),

      prisma.blogComment.findMany({
        where: {
          blogId: numericId,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ]);

  if (!post) notFound();

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white px-6 py-10 text-neutral-900">
      <ViewTracker id={post.id} />

      <div className="mx-auto max-w-7xl">
        <Link
          href="/blog"
          prefetch
          className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
        >
          ← 블로그로 돌아가기
        </Link>

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
              {latestPosts.slice(0, 5).map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.id}`}
                  prefetch
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

        <BlogCommentClient blogId={post.id} initialComments={comments} />

        <CardSection title="도매 사이트" href="/wholesale">
          {latestWholesaleSites.map((site) => (
            <Link
              key={site.id}
              href={`/wholesale/${site.id}`}
              prefetch
              className="block overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5"
            >
              <ImageCard src={site.imageUrl} alt={site.name} label={site.name} />
            </Link>
          ))}
        </CardSection>

        <CardSection title="판매 채널" href="/sales-channel">
          {latestSalesChannels.map((item) => (
            <Link
              key={item.id}
              href={`/sales-channel/${item.id}`}
              prefetch
              className="block overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5"
            >
              <ImageCard src={item.imageUrl} alt={item.name} label={item.name} />
            </Link>
          ))}
        </CardSection>

        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Seller Tools</h2>
            <Link
              href="/sellertool"
              prefetch
              className="text-sm font-medium text-neutral-600 hover:text-black"
            >
              전체 보기 →
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-4">
            {sellerTools.map((tool) => (
              <Link
                key={tool.id}
                href={tool.href}
                prefetch
                className="flex min-h-[150px] flex-col rounded-2xl bg-neutral-50 p-5 transition hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-bold">{tool.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">
                  {tool.description}
                </p>
                <div className="mt-auto pt-4 text-sm font-medium text-neutral-800">
                  바로 가기 →
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function CardSection({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Link
          href={href}
          prefetch
          className="text-sm font-medium text-neutral-600 hover:text-black"
        >
          전체 보기 →
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-4">{children}</div>
    </section>
  );
}

function ImageCard({
  src,
  alt,
  label,
}: {
  src?: string;
  alt: string;
  label: string;
}) {
  return (
    <>
      <div className="overflow-hidden rounded-2xl bg-neutral-100">
        <Image
          src={src || PLACEHOLDER}
          alt={alt}
          width={1200}
          height={800}
          sizes="(max-width: 768px) 50vw, 25vw"
          className="h-full w-full object-contain bg-white"
        />
      </div>

      <div className="pt-3">
        <h3 className="line-clamp-2 text-base font-bold leading-6">{label}</h3>
      </div>
    </>
  );
}