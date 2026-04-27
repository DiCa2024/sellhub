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
    <WholesalePageClient
      initialSites={sites}
      initialChannels={channels}
      initialPosts={posts}
    />
  );
}