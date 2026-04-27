import { prisma } from "@/lib/prisma";
import SalesChannelPageClient from "./SalesChannelPageClient";

export default async function SalesChannelPage() {
  const channels = await prisma.salesChannel.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <SalesChannelPageClient initialChannels={channels} />;
}