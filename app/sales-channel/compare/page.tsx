import { prisma } from "@/lib/prisma";
import SalesChannelCompareClient from "./SalesChannelCompareClient";

export default async function SalesChannelComparePage() {
  const channels = await prisma.salesChannel.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return <SalesChannelCompareClient channels={channels} />;
}