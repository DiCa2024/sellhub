import { Suspense } from "react";
import WholesalePageClient from "./temp";

export default function WholesalePage() {
  return (
    <Suspense fallback={<div className="px-6 py-10">불러오는 중...</div>}>
      <WholesalePageClient />
    </Suspense>
  );
}