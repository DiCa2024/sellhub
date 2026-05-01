export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">About sellhub</h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          sellhub는 국내외 도매 사이트, 판매 채널, 셀러 도구, 온라인 판매 정보를
          한곳에서 비교하고 탐색할 수 있도록 만든 정보 플랫폼입니다.
        </p>

        <p className="mt-4 leading-8 text-neutral-700">
          우리는 초보 셀러와 온라인 판매자를 위해 도매 사이트 정보, 판매 채널별
          특징, 수수료 비교, 실무형 셀러 도구, 그리고 판매 전략 관련 블로그
          콘텐츠를 제공합니다.
        </p>

        <p className="mt-4 leading-8 text-neutral-700">
          sellhub의 목표는 사용자가 더 빠르고 정확하게 판매 기회를 찾고,
          자신에게 맞는 유통·판매 경로를 선택할 수 있도록 돕는 것입니다.
        </p>

        <div className="mt-10 rounded-2xl bg-neutral-50 p-6">
          <h2 className="text-2xl font-bold">What we provide</h2>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-neutral-700">
            <li>도매 사이트 정보와 비교 기능</li>
            <li>판매 채널 정보와 수수료 비교</li>
            <li>온라인 셀러를 위한 계산기와 실무 도구</li>
            <li>전자상거래, 소싱, 마케팅 관련 블로그 콘텐츠</li>
          </ul>
        </div>
      </section>
    </main>
  );
}