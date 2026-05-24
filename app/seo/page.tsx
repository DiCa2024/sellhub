import { prisma } from "@/lib/prisma";
import SeoPageClient from "@/components/SeoPageClient";

export const revalidate = 3600;

export default async function SeoPage() {
  const posts = await prisma.seoPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      slug: true,
      category: true,
      excerpt: true,
      imageUrl: true,
      views: true,
      createdAt: true,
    },
  });

  return <SeoPageClient posts={posts} />;
}