"use client";

import { useState } from "react";

export default function BookmarkButton({
  brandId,
  initialBookmarked = false,
}: {
  brandId: string;
  initialBookmarked?: boolean;
}) {
  const [bookmarked, setBookmarked] = useState(initialBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmark = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brandId }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        alert(data.message ?? "북마크 처리 실패");
        return;
      }

      setBookmarked(data.bookmarked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBookmark}
      className="rounded-lg border px-3 py-1 text-sm hover:bg-neutral-50"
    >
      {bookmarked ? "⭐ 북마크됨" : "☆ 북마크"}
    </button>
  );
}