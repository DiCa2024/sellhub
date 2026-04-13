export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-lg font-bold tracking-tight text-neutral-900">
              globalsellermall
            </div>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              도매 정보, 판매 채널 정보, 셀러 도구를 한곳에서 확인할 수 있는 플랫폼입니다.
            </p>
          </div>

          <p className="text-xs text-neutral-400">
            © 2026 sellhub. All rights reserved.
          </p>
        </div>

        <div className="grid gap-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              사업자 정보
            </h3>

            <div className="space-y-2 text-sm text-neutral-600">
              <p>
                <span className="font-medium text-neutral-900">사이트명</span> : Globalsellermall
              </p>
              <p>
                <span className="font-medium text-neutral-900">상호명</span> : HIGH WAY
              </p>
              <p>
                <span className="font-medium text-neutral-900">대표자</span> : LEE MI YONG
              </p>
              <p>
                <span className="font-medium text-neutral-900">사업자등록번호</span> : 837-06-00234
              </p>
              <p>
                <span className="font-medium text-neutral-900">통신판매업신고번호</span> : 제2016-경기파주-0294호
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-neutral-900">
              고객 및 문의 정보
            </h3>

            <div className="space-y-2 text-sm text-neutral-600">
              <p>
                <span className="font-medium text-neutral-900">대표 이메일</span> : koreashopmall@gmail.com
              </p>
              <p>
                <span className="font-medium text-neutral-900">대표 번호</span> : 010-5124-6988
              </p>
              <p>
                <span className="font-medium text-neutral-900">주소</span> : 경기도 고양시 일산서구 산율로 36
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-2 text-xs text-neutral-400 md:flex-row md:items-center md:justify-between">
          <p>
            sellhub는 도매 사이트 탐색, 판매 채널 비교, 셀러 운영 도구 제공을 목적으로 하는 정보형 플랫폼입니다.
          </p>
          <p>운영 정책 및 정보는 필요에 따라 변경될 수 있습니다.</p>
        </div>
      </div>
    </footer>
  );
}