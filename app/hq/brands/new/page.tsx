import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import BrandForm from "@/components/BrandForm";

export default async function NewBrandPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "HQ") {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">브랜드 등록</h1>

      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <BrandForm />
      </div>
    </div>
  );
}