export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-16 text-neutral-900">
      <section className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold">Contact</h1>

        <p className="mt-6 text-lg leading-8 text-neutral-700">
          globalsellershop에 대한 문의, 제휴, 오류 신고 등은 아래 연락처로 문의해 주세요.
        </p>

        <div className="mt-10 rounded-2xl bg-neutral-50 p-6">
          <h2 className="text-2xl font-bold">Contact Information</h2>

          <div className="mt-6 space-y-4 text-neutral-700">
            <p>
              <span className="font-semibold">이메일:</span>{" "}
              koreashopmall@gmail.com
            </p>

            <p>
              <span className="font-semibold">전화번호:</span>{" "}
              010-5124-6988
            </p>

            <p>
              <span className="font-semibold">주소:</span>{" "}
              경기도 고양시 일산서구 산율로 36
            </p>
          </div>
        </div>

        <div className="mt-10 text-sm text-neutral-500">
          ※ 문의는 이메일을 통해 가장 빠르게 답변드립니다.
        </div>
      </section>
    </main>
  );
}