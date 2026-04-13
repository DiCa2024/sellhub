import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function InquiriesPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "HQ") {
    redirect("/");
  }

  const inquiries = await prisma.inquiry.findMany({
    where: {
      brand: {
        ownerId: user.id,
      },
    },
    include: {
      user: true,
      brand: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-semibold">문의 목록</h1>

      {inquiries.length === 0 ? (
        <p className="text-sm text-neutral-500">문의가 없습니다.</p>
      ) : (
        inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className="rounded-2xl border bg-white p-6 shadow-sm"
          >
            <p className="font-medium">{inquiry.brand.name}</p>

            <p className="text-sm text-neutral-600 mt-1">
              문의자: {inquiry.user.email}
            </p>

            <p className="mt-3">{inquiry.message}</p>

            <p className="text-xs text-neutral-400 mt-3">
              {new Date(inquiry.createdAt).toLocaleString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}