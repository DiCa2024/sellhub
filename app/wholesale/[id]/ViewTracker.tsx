"use client";

import { useEffect } from "react";

type ViewTrackerProps = {
  id: number;
};

export default function ViewTracker({ id }: ViewTrackerProps) {
  useEffect(() => {
    const viewedKey = `sellhub-viewed-${id}`;
    const hasViewed = sessionStorage.getItem(viewedKey);

    if (hasViewed) {
      return;
    }

    const increaseView = async () => {
      try {
        await fetch(`/api/wholesale/${id}`, {
          method: "POST",
        });
        sessionStorage.setItem(viewedKey, "true");
      } catch (error) {
        console.error("조회수 증가 실패:", error);
      }
    };

    increaseView();
  }, [id]);

  return null;
}