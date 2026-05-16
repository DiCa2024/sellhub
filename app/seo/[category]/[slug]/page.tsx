import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-12 text-neutral-900">
      <article className="mx-auto max-w-4xl rounded-[28px] border border-neutral-200 bg-white p-8 shadow-sm md:p-10">
        <p className="mb-3 text-sm font-medium text-neutral-500">
          {post.category}
        </p>

        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-base leading-7 text-neutral-600">
          {post.excerpt}
        </p>

        {post.imageUrl && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}

        <div className="mt-10 space-y-6 leading-8 text-neutral-700">
          {post.content.split("\n").map((line, index) => {
            if (line.startsWith("## ")) {
              return (
                <h2
                  key={index}
                  className="mt-10 text-2xl font-bold text-neutral-900"
                >
                  {line.replace("## ", "")}
                </h2>
              );
            }

            if (line.startsWith("### ")) {
              return (
                <h3
                  key={index}
                  className="mt-8 text-xl font-bold text-neutral-900"
                >
                  {line.replace("### ", "")}
                </h3>
              );
            }

            if (line.trim() === "") {
              return <div key={index} className="h-2" />;
            }

            return <p key={index}>{line}</p>;
          })}
        </div>
      </article>
    </main>
  );
}