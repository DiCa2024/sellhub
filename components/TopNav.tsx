"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const ADMIN_EMAIL = "jmjmanse@naver.com";

export default function TopNav() {
  const pathname = usePathname();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const refreshUser = () => {
  const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
  console.log("currentUser:", savedUser);
  setCurrentUser(savedUser);
};
  useEffect(() => {
    refreshUser();
  }, [pathname]);

  useEffect(() => {
    const handleAuthChanged = () => refreshUser();

    window.addEventListener("auth-changed", handleAuthChanged);

    return () => {
      window.removeEventListener("auth-changed", handleAuthChanged);
    };
  }, []);

  const handleLogout = () => {
  localStorage.removeItem("currentUser");

  // ✅ 여기 추가 (딱 이 위치)
  localStorage.removeItem("compareSites");
  localStorage.removeItem("compareSalesChannels");

  setCurrentUser(null);
  window.dispatchEvent(new Event("auth-changed"));
  alert("로그아웃 되었습니다.");
  window.location.href = "/";
};

  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href
        ? "text-black"
        : "text-neutral-600 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-neutral-900 text-sm font-bold text-white shadow-sm">
              sh
            </div>

            <div className="leading-tight">
              <div className="text-lg font-bold tracking-tight text-neutral-900">
                sellhub
              </div>
              <div className="text-xs text-neutral-500">
                도매 사이트를 찾고, 비교하고, 배우는 곳
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/wholesale" className={navLinkClass("/wholesale")}>
              도매사이트
            </Link>
            <Link href="/sales-channel" className={navLinkClass("/sales-channel")}>
              판매 채널
            </Link>
            <Link href="/blog" className={navLinkClass("/blog")}>
              블로그
            </Link>
            <Link href="/sellertool" className={navLinkClass("/sellertool")}>
              셀러툴
            </Link>
            <Link href="/board" className={navLinkClass("/board")}>
              게시판
            </Link>

            {isAdmin && (
              <Link href="/admin" className={navLinkClass("/admin")}>
                Admin
              </Link>
            )}
          </nav>
        </div>

     <div className="flex items-center gap-3">
  {currentUser ? (
    <>
      <Link
        href="/mypage"
        className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
      >
        마이페이지
      </Link>

      <button
        onClick={handleLogout}
        className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
      >
        로그아웃
      </button>
    </>
  ) : (
    <>
      <Link
        href="/login"
        className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
      >
        로그인
      </Link>

      <Link
        href="/signup"
        className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
      >
        회원가입
      </Link>
    </>
  )}
</div>
      </div>
    </header>
  );
}