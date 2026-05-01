export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Privacy Policy</h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          sellhub(이하 “사이트”)는 이용자의 개인정보를 중요하게 생각하며,
          관련 법령을 준수하고 있습니다.
        </p>

        <div className="mt-10 space-y-8 text-neutral-700 leading-8">
          <div>
            <h2 className="text-xl font-bold">1. 수집하는 정보</h2>
            <p>
              사이트는 회원가입, 댓글 작성, 로그인 등의 과정에서 이메일, 이름,
              접속 로그, 쿠키 정보를 수집할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">2. 정보 사용 목적</h2>
            <p>
              수집된 정보는 서비스 제공, 사용자 식별, 문의 응답, 서비스 개선을
              위해 사용됩니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">3. 쿠키 사용</h2>
            <p>
              사이트는 사용자 경험 향상을 위해 쿠키를 사용할 수 있으며,
              브라우저 설정을 통해 쿠키 저장을 거부할 수 있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">4. 광고 및 외부 서비스</h2>
            <p>
              본 사이트는 Google AdSense와 같은 외부 광고 서비스를 사용할 수
              있으며, 광고 제공자는 쿠키를 사용하여 맞춤형 광고를 제공할 수
              있습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">5. 개인정보 보호</h2>
            <p>
              사이트는 이용자의 개인정보를 안전하게 보호하기 위해 최선을
              다하며, 법적 요구가 없는 한 외부에 공개하지 않습니다.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold">6. 문의</h2>
            <p>
              개인정보 관련 문의는 아래 이메일로 연락해 주시기 바랍니다.
            </p>
            <p className="mt-2 font-semibold">
              koreashopmall@gmail.com
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}