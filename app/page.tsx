export const revalidate = 60;

import { prisma } from "@/lib/prisma";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const [
    latestSites,
    popularSites,
    channels,
    latestPosts,
    popularSeoPosts,
    popularBlogPosts,
  ] = await Promise.all([
    prisma.wholesaleSite.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.wholesaleSite.findMany({
      take: 6,
      orderBy: {
        views: "desc",
      },
    }),

    prisma.salesChannel.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.blog.findMany({
      take: 6,
      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.seoPost.findMany({
      take: 3,
      orderBy: {
        views: "desc",
      },
    }),

    prisma.blog.findMany({
      take: 3,
      orderBy: {
        views: "desc",
      },
    }),
  ]);

  return (
    <HomeClient
      latestSites={latestSites}
      popularSites={popularSites}
      channels={channels}
      latestPosts={latestPosts}
      popularSeoPosts={popularSeoPosts}
      popularBlogPosts={popularBlogPosts}
    />
  );
}