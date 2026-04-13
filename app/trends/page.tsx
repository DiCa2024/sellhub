import Link from "next/link";

export default function TrendsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">트렌드</h1>
        <p className="mt-3 text-neutral-600">
          최신 프랜차이즈 트렌드와 유망 업종 정보를 확인할 수 있는 페이지입니다.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
       <div className="rounded-2xl border bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold">인기 업종</h2>
  <p className="mt-2 text-sm text-neutral-600">
    최근 관심이 높은 카페, 치킨, 무인 매장, 디저트 업종 등을 소개합니다.
  </p>

  <Link
    href="/?q=치킨"
    className="mt-4 inline-block text-sm text-blue-600 underline"
  >
    치킨 브랜드 보러가기 →
  </Link>
</div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">예비 창업자 관심 키워드</h2>
          <p className="mt-2 text-sm text-neutral-600">
            소자본 창업, 배달 특화, 1인 운영, 지역 밀착형 브랜드 같은 키워드를 정리합니다.
          </p>
        </div>
      </section>
    </div>
  );
}