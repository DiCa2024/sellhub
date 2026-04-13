export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <section className="rounded-3xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">창업 가이드</h1>
        <p className="mt-3 text-neutral-600">
          예비 창업자를 위한 기본 절차와 준비 사항을 안내하는 페이지입니다.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">1. 업종 선택</h2>
          <p className="mt-2 text-sm text-neutral-600">
            관심 업종과 예산, 운영 방식에 맞는 브랜드를 먼저 정리합니다.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">2. 브랜드 비교</h2>
          <p className="mt-2 text-sm text-neutral-600">
            가맹비, 인테리어 비용, 수익 구조, 본사 지원 내용을 비교합니다.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">3. 문의 및 상담</h2>
          <p className="mt-2 text-sm text-neutral-600">
            관심 브랜드에 직접 문의하고 상담을 통해 실제 조건을 확인합니다.
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold">4. 최종 결정</h2>
          <p className="mt-2 text-sm text-neutral-600">
            입지, 운영 가능성, 자금 계획을 종합해 최종 브랜드를 결정합니다.
          </p>
        </div>
      </section>
    </div>
  );
}