import { prisma } from "@/lib/prisma";
import InquiryForm from "@/components/InquiryForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

type Props = {
  params: {
    slug: string;
  };
};

export default async function BrandDetailPage({ params }: Props) {
  const session = await getServerSession(authOptions);

  const brand = await prisma.brand.findUnique({
    where: { slug: params.slug },
  });

  if (!brand || !brand.isPublished) {
    return <div className="p-8">브랜드를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="bg-white">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm text-gray-500 mb-2">{brand.category}</p>
            <h1 className="text-4xl font-bold leading-tight">{brand.name}</h1>
            <p className="mt-4 text-lg text-gray-600">
              {brand.summary || brand.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3 text-sm">
              {brand.budgetMin && (
                <span className="rounded-full bg-gray-100 px-4 py-2">
                  최소 예산 {brand.budgetMin.toLocaleString()}원
                </span>
              )}
              {brand.storeCount && (
                <span className="rounded-full bg-gray-100 px-4 py-2">
                  가맹점 {brand.storeCount}개
                </span>
              )}
              {brand.foundingYear && (
                <span className="rounded-full bg-gray-100 px-4 py-2">
                  설립 {brand.foundingYear}
                </span>
              )}
            </div>
          </div>

          <div className="rounded-3xl border p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">브랜드 핵심 정보</h2>
            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>카테고리:</strong> {brand.category}</p>
              <p><strong>본사:</strong> {brand.headquartersName || "-"}</p>
              <p><strong>예상 예산:</strong> {brand.budgetMin?.toLocaleString() || "-"} ~ {brand.budgetMax?.toLocaleString() || "-"}</p>
              <p><strong>예상 월매출:</strong> {brand.monthlyRevenue || "-"}</p>
              <p><strong>대표 문의:</strong> {brand.contactPhone || "-"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">
            {brand.introTitle || `${brand.name}, 어떤 브랜드인가요?`}
          </h2>
          <p className="text-gray-700 leading-8 whitespace-pre-line">
            {brand.introDescription || brand.description}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-4">
          {brand.competitivenessTitle || "왜 이 브랜드를 주목해야 할까요?"}
        </h2>
        <p className="text-gray-700 leading-8 whitespace-pre-line">
          {brand.competitivenessBody || "브랜드 경쟁력 정보가 아직 등록되지 않았습니다."}
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl border p-6">
          <h3 className="text-xl font-bold mb-3">추천 타깃 고객</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {brand.targetCustomer || "타깃 고객 정보 준비 중"}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-xl font-bold mb-3">운영 지원</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {brand.operationSupport || "운영 지원 정보 준비 중"}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-xl font-bold mb-3">창업 절차</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {brand.startupProcess || "창업 절차 정보 준비 중"}
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-xl font-bold mb-3">추천 입지</h3>
          <p className="text-gray-700 whitespace-pre-line">
            {brand.recommendedLocation || "추천 입지 정보 준비 중"}
          </p>
        </div>
      </section>

      <section className="bg-red-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-3">확인해야 할 유의사항</h2>
          <p className="text-gray-700 whitespace-pre-line">
            {brand.cautionNote || "유의사항 정보 준비 중"}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-12">
        <InquiryForm brandId={brand.id} isLoggedIn={!!session} />
      </section>
    </div>
  );
}