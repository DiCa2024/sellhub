import { prisma } from "@/lib/prisma";
import WholesaleCompareClient from "./WholesaleCompareClient";

export default async function WholesaleComparePage() {
  const sites = await prisma.wholesaleSite.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const posts = await prisma.blog.findMany({
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });

  return <WholesaleCompareClient sites={sites} posts={posts} />;
}