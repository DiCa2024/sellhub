"use client";

import { useEffect } from "react";

export default function ViewTracker({ id }: { id: number }) {
  useEffect(() => {
    fetch(`/api/sales-channel/${id}/view`, {
      method: "PATCH",
    }).catch((error) => {
      console.error("판매채널 조회수 증가 오류:", error);
    });
  }, [id]);

  return null;
}