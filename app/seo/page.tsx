import { prisma } from "@/lib/prisma";
import SeoPageClient from "@/components/SeoPageClient";

export default async function SeoPage() {
  const posts = await prisma.seoPost.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <SeoPageClient posts={posts} />;
}