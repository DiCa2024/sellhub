export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Terms of Service</h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          본 약관은 globalsellershop(이하 “사이트”)의 이용과 관련된 기본적인 사항을 규정합니다.
        </p>

        <div className="mt-10 space-y-8 text-neutral-700 leading-8">
          <div>
            <h2 className="text-xl font-bold">1. 서비스 제공</h2>
            <p>
              사이트는 도매 정보, 판매 채널 정보, 셀러 도구 및 관련 콘텐츠를 제공합니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">2. 이용자의 책임</h2>
            <p>
              이용자는 서비스를 이용함에 있어 관련 법령을 준수해야 하며,
              부정한 방법으로 서비스를 이용해서는 안 됩니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">3. 서비스 변경</h2>
            <p>
              사이트는 필요에 따라 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">4. 면책 사항</h2>
            <p>
              사이트는 제공되는 정보의 정확성, 완전성에 대해 보장하지 않으며,
              이용자가 해당 정보를 사용함으로써 발생하는 결과에 대해 책임지지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">5. 문의</h2>
            <p>이용 관련 문의는 아래 이메일로 연락 바랍니다.</p>
            <p className="mt-2 font-semibold">koreashopmall@gmail.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}