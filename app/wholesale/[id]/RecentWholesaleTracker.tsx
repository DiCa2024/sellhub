"use client";

import { useEffect } from "react";

type Props = {
  site: {
    id: number;
    name: string;
    imageUrl: string;
    category: string;
    region: string;
  };
};

export default function RecentWholesaleTracker({ site }: Props) {
  useEffect(() => {
    const key = "recentWholesaleSites";

    const prev = JSON.parse(localStorage.getItem(key) || "[]");

    const next = [
      {
        id: site.id,
        name: site.name,
        imageUrl: site.imageUrl,
        category: site.category,
        region: site.region,
        href: `/wholesale/${site.id}`,
        viewedAt: new Date().toISOString(),
      },
      ...prev.filter((item: any) => String(item.id) !== String(site.id)),
    ].slice(0, 10);

    localStorage.setItem(key, JSON.stringify(next));
  }, [site]);

  return null;
}