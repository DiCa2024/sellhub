export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Disclaimer</h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          sellhub에서 제공하는 모든 정보는 참고용으로 제공됩니다.
        </p>

        <div className="mt-10 space-y-8 text-neutral-700 leading-8">
          <div>
            <h2 className="text-xl font-bold">1. 정보의 정확성</h2>
            <p>
              사이트는 정보를 최신 상태로 유지하려 노력하지만,
              정보의 정확성이나 완전성을 보장하지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">2. 책임 제한</h2>
            <p>
              이용자가 사이트 정보를 기반으로 내린 결정 및 행동에 대해
              사이트는 어떠한 책임도 지지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">3. 외부 링크</h2>
            <p>
              사이트에는 외부 사이트로 연결되는 링크가 포함될 수 있으며,
              해당 사이트의 내용이나 정책에 대해 책임지지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">4. 광고</h2>
            <p>
              본 사이트는 광고 및 제휴 마케팅을 포함할 수 있으며,
              일부 링크를 통해 수익이 발생할 수 있습니다.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}