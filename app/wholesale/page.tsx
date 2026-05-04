export const revalidate = 60;

import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import WholesalePageClient from "./WholesalePageClient";

export default async function WholesalePage() {
  const [sites, channels, posts] = await Promise.all([
    prisma.wholesaleSite.findMany({
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.salesChannel.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    }),
    prisma.blog.findMany({
      take: 4,
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  return (
    <Suspense fallback={<div className="px-6 py-10">불러오는 중...</div>}>
      <WholesalePageClient
        initialSites={sites}
        initialChannels={channels}
        initialPosts={posts}
      />
    </Suspense>
  );
}