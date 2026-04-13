import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3">
        
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-neutral-900 text-white">
            fw
          </span>
          <span>Franwave</span>
        </Link>

        {/* 오른쪽 영역 */}
        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 text-sm md:flex">
            <Link href="/brands" className="hover:text-neutral-600">브랜드</Link>
            <Link href="/trends" className="hover:text-neutral-600">트렌드</Link>
            <Link href="/guides" className="hover:text-neutral-600">창업가이드</Link>
            <Link href="/contact" className="hover:text-neutral-600">게시판</Link>
          </nav>

          <Link
            href="/signup"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            회원가입
          </Link>

          <Link
            href="/login"
            className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:bg-neutral-800"
          >
            로그인
          </Link>
        </div>

      </div> {/* 🔥 이거 꼭 있어야 함 */}
    </header>
  );
}