"use client";

import { useEffect } from "react";

type Props = {
  post: {
    id: number;
    title: string;
    imageUrl?: string | null;
  };
};

export default function RecentBlogTracker({ post }: Props) {
  useEffect(() => {
    const key = "recentBlogs";

    const prev = JSON.parse(localStorage.getItem(key) || "[]");

    const next = [
      {
        id: post.id,
        name: post.title,
        imageUrl: post.imageUrl || "",
        category: "Blog",
        href: `/blog/${post.id}`,
        viewedAt: new Date().toISOString(),
      },
      ...prev.filter((item: any) => String(item.id) !== String(post.id)),
    ].slice(0, 10);

    localStorage.setItem(key, JSON.stringify(next));
  }, [post]);

  return null;
}