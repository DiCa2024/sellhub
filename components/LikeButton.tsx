"use client";

import { useState } from "react";

export default function LikeButton({
  brandId,
  initialLiked = false,
  initialCount = 0,
}: {
  brandId: string;
  initialLiked?: boolean;
  initialCount?: number;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brandId }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message ?? "좋아요 처리 실패");
        return;
      }

      if (data.liked) {
        setLiked(true);
        setCount((prev) => prev + 1);
      } else {
        setLiked(false);
        setCount((prev) => Math.max(0, prev - 1));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleLike}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-neutral-50"
    >
      {liked ? "❤️" : "🤍"} 좋아요 {count}
    </button>
  );
}