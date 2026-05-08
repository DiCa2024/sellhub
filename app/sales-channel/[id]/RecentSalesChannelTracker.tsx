"use client";

import { useEffect } from "react";

type Props = {
  channel: {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    region: string;
  };
};

export default function RecentSalesChannelTracker({ channel }: Props) {
  useEffect(() => {
    const key = "recentSalesChannels";

    const prev = JSON.parse(localStorage.getItem(key) || "[]");

    const next = [
      {
        id: channel.id,
        name: channel.name,
        imageUrl: channel.imageUrl,
        category: channel.category,
        region: channel.region,
        href: `/sales-channel/${channel.id}`,
        viewedAt: new Date().toISOString(),
      },
      ...prev.filter((item: any) => String(item.id) !== String(channel.id)),
    ].slice(0, 10);

    localStorage.setItem(key, JSON.stringify(next));
  }, [channel]);

  return null;
}