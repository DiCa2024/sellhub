import Link from "next/link";

const seoMenus = [
  {
    title: "SEO Basics",
    description: "검색엔진 작동 방식, 키워드 조사, 메타태그 최적화",
    href: "/seo/basics",
  },
  {
    title: "On-page SEO",
    description: "콘텐츠 최적화, 내부링크 구조, UX와 SEO",
    href: "/seo/on-page",
  },
  {
    title: "Off-page SEO",
    description: "백링크 원리, 도메인 권위, 브랜드 신뢰도",
    href: "/seo/off-page",
  },
  {
    title: "Technical SEO",
    description: "robots.txt, sitemap.xml, 페이지 속도 개선",
    href: "/seo/technical",
  },
  {
    title: "AI & Automation",
    description: "ChatGPT SEO 글쓰기, 키워드 클러스터링, 데이터 분석",
    href: "/seo/ai-automation",
  },
  {
    title: "Experiment & Case Study",
    description: "SEO 실험과 실제 트래픽 성장 사례",
    href: "/seo/case-study",
  },
];

export default function SeoPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 rounded-[28px] border border-neutral-200 bg-white p-10 shadow-sm">
          <p className="mb-3 text-sm font-medium text-neutral-500">
            SEO Guide
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
            SEO Learning Center
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-neutral-600">
            검색엔진 최적화의 기본부터 콘텐츠 전략, 기술 SEO, AI 활용,
            실제 SEO 실험까지 정리한 공간입니다.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {seoMenus.map((menu) => (
            <Link
              key={menu.href}
              href={menu.href}
              className="rounded-[24px] border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <h2 className="text-xl font-bold text-neutral-900">
                {menu.title}
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-600">
                {menu.description}
              </p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
