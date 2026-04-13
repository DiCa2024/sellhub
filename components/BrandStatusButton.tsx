"use client";

import { useRouter } from "next/navigation";

export default function BrandStatusButton({
  brandId,
  action,
}: {
  brandId: string;
  action: "approve" | "reject";
}) {
  const router = useRouter();

  const handleClick = async () => {
    const res = await fetch(`/api/admin/brands/${brandId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action }),
    });

    if (!res.ok) {
      alert("처리에 실패했습니다.");
      return;
    }

    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`rounded-xl px-4 py-2 text-sm text-white ${
        action === "approve" ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {action === "approve" ? "승인" : "반려"}
    </button>
  );
}