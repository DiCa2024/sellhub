import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function HQPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "HQ") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold">HQ Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2">

        <Link
          href="/hq/brands/new"
          className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">브랜드 등록</h2>
          <p className="text-sm text-neutral-600 mt-2">
            새로운 프랜차이즈 브랜드를 등록합니다.
          </p>
        </Link>

        <Link
          href="/hq/inquiries"
          className="rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md"
        >
          <h2 className="text-lg font-semibold">문의 목록</h2>
          <p className="text-sm text-neutral-600 mt-2">
            창업 문의를 확인합니다.
          </p>
        </Link>

      </div>
    </div>
  );
}