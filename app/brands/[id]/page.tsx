import { prisma } from "@/lib/prisma";
import InquiryForm from "@/components/InquiryForm";
import { getCurrentUser } from "@/lib/auth";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BrandDetailPage({ params }: Props) {
  const { id } = await params;
  const user = await getCurrentUser();

  const brand = await prisma.brand.findFirst({
    where: {
      OR: [{ slug: id }, { id: id }],
    },
    include: {
      _count: {
        select: {
          likes: true,
          bookmarks: true,
          inquiries: true,
        },
      },
    },
  });

  if (!brand) {
    notFound();
  }

  const tagList =
    typeof brand.tags === "string"
      ? brand.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : Array.isArray(brand.tags)
      ? brand.tags
      : [];

  return (
    <div className="bg-neutral-50">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
        <section className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <div className="grid gap-0 md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-sm font-medium text-neutral-500">
                {brand.country} · {brand.category}
              </p>

              <h1 className="mt-3 text-4xl font-bold leading-tight">
                {brand.name}
              </h1>

              <p className="mt-4 text-lg text-neutral-700">
                {brand.oneLiner}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {tagList.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-500">예산</p>
                  <p className="mt-2 text-lg font-semibold">{brand.budget || "-"}</p>
                </div>
                <div className="rounded-2xl border bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-500">좋아요</p>
                  <p className="mt-2 text-lg font-semibold">{brand._count.likes}</p>
                </div>
                <div className="rounded-2xl border bg-neutral-50 p-4">
                  <p className="text-sm text-neutral-500">문의</p>
                  <p className="mt-2 text-lg font-semibold">{brand._count.inquiries}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-blue-100 p-8 md:p-10">
              {brand.imageUrl ? (
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="h-80 w-full rounded-3xl object-cover shadow-md"
                />
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-3xl border bg-white text-center text-neutral-400 shadow-sm">
                  브랜드 이미지 준비 중
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-4">
          <div className="rounded-3xl border bg-white p-6 shadow-sm md:col-span-3">
            <h2 className="text-2xl font-semibold">브랜드 소개</h2>
            <p className="mt-4 whitespace-pre-line leading-8 text-neutral-700">
              {brand.summary || "브랜드 소개가 아직 등록되지 않았습니다."}
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">핵심 정보</h2>
            <div className="mt-4 space-y-3 text-sm text-neutral-700">
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-neutral-500">브랜드명</span>
                <span className="font-medium">{brand.name}</span>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-neutral-500">국가</span>
                <span className="font-medium">{brand.country || "-"}</span>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-neutral-500">카테고리</span>
                <span className="font-medium">{brand.category || "-"}</span>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-neutral-500">예산</span>
                <span className="font-medium">{brand.budget || "-"}</span>
              </div>
              <div className="flex justify-between gap-4 border-b pb-3">
                <span className="text-neutral-500">북마크</span>
                <span className="font-medium">{brand._count.bookmarks}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-neutral-500">문의 수</span>
                <span className="font-medium">{brand._count.inquiries}</span>
              </div>
            </div>
          </div>
        </section>
        <section className="rounded-3xl border bg-white p-6 shadow-sm">
  <h2 className="text-2xl font-semibold">창업 비용 정보</h2>

  <div className="mt-6 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">최소 창업 비용</p>
      <p className="mt-2 text-lg font-semibold">
        {brand.budgetMin ? `${brand.budgetMin.toLocaleString()}원` : "-"}
      </p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">최대 창업 비용</p>
      <p className="mt-2 text-lg font-semibold">
        {brand.budgetMax ? `${brand.budgetMax.toLocaleString()}원` : "-"}
      </p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">예산 구간</p>
      <p className="mt-2 text-lg font-semibold">
        {brand.budget || "-"}
      </p>
    </div>
  </div>
</section>
<section className="rounded-3xl border bg-white p-6 shadow-sm">
  <h2 className="text-2xl font-semibold">브랜드 규모</h2>

  <div className="mt-6 grid gap-4 md:grid-cols-3">
    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">전체 매장 수</p>
      <p className="mt-2 text-lg font-semibold">
        {brand.storeCount ?? "-"}개
      </p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">설립 연도</p>
      <p className="mt-2 text-lg font-semibold">
        {brand.foundingYear ?? "-"}
      </p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">월 평균 매출</p>
      <p className="mt-2 text-lg font-semibold">
        {brand.monthlyRevenue ?? "-"}
      </p>
    </div>
  </div>
</section>
<section className="rounded-3xl border bg-white p-6 shadow-sm">
  <h2 className="text-2xl font-semibold">지역별 매장 분포</h2>

  <div className="mt-6 grid gap-4 md:grid-cols-4">
    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">서울</p>
      <p className="mt-2 text-lg font-semibold">{brand.storesSeoul ?? "-"}개</p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">경기</p>
      <p className="mt-2 text-lg font-semibold">{brand.storesGyeonggi ?? "-"}개</p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">인천</p>
      <p className="mt-2 text-lg font-semibold">{brand.storesIncheon ?? "-"}개</p>
    </div>

    <div className="rounded-2xl bg-neutral-50 p-5">
      <p className="text-sm text-neutral-500">부산</p>
      <p className="mt-2 text-lg font-semibold">{brand.storesBusan ?? "-"}개</p>
    </div>
  </div>
</section>
        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">왜 이 브랜드를 봐야 할까요?</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-neutral-50 p-5">
              <h3 className="text-lg font-semibold">브랜드 강점</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">
                카테고리와 브랜드 특성에 맞는 차별점을 강조해 예비 창업자가 빠르게 핵심을 이해할 수 있도록 합니다.
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-5">
              <h3 className="text-lg font-semibold">예산 정보</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">
                예산 구간을 함께 보여줘서 소자본, 중자본, 고자본 여부를 직관적으로 확인할 수 있습니다.
              </p>
            </div>
            <div className="rounded-2xl bg-neutral-50 p-5">
              <h3 className="text-lg font-semibold">즉시 문의</h3>
              <p className="mt-2 text-sm leading-7 text-neutral-600">
                마음에 드는 브랜드를 찾았으면 아래 문의 폼을 통해 바로 상담 연결까지 이어질 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold">문의하기</h2>
          <p className="mt-2 text-sm text-neutral-500">
            브랜드에 관심이 있다면 아래에서 바로 문의를 남겨보세요.
          </p>

          <div className="mt-6">
            <InquiryForm brandId={brand.id} isLoggedIn={!!user} />
          </div>
        </section>
      </div>
    </div>
  );
}