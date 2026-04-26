"use client";

import { useEffect } from "react";

export default function ViewTracker({ id }: { id: number }) {
  useEffect(() => {
    fetch(`/api/blog/${id}/view`, {
      method: "PATCH",
    }).catch((error) => {
      console.error("블로그 조회수 증가 오류:", error);
    });
  }, [id]);

  return null;
}