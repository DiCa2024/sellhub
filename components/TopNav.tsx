"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const ADMIN_EMAIL = "jmjmanse@naver.com";

export default function TopNav() {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const currentUser = session?.user;
  const isAdmin = currentUser?.email === ADMIN_EMAIL;

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href
        ? "text-black"
        : "text-neutral-600 hover:text-black"
    }`;

  const handleLogout = () => {
    localStorage.removeItem("compareSites");
    localStorage.removeItem("compareSalesChannels");

    signOut({
      callbackUrl: "/",
    });
  };

  function SubMenuGroup({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-bold text-neutral-900">{title}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block text-sm leading-6 text-neutral-600 transition hover:text-black"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

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
                globalsellershop
              </div>
              <div className="text-xs text-neutral-500">
                도매 사이트를 찾고, 비교하고, 배우는 곳
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/wholesale" className={navLinkClass("/wholesale")}>
              Wholesale
            </Link>

            <Link href="/sales-channel" className={navLinkClass("/sales-channel")}>
              Sales Channel
            </Link>

             <Link href="/seo" className={navLinkClass("/seo")}>
    SEO
  </Link>
           
            <Link href="/blog" className={navLinkClass("/blog")}>
              Blog
            </Link>

             

            <Link href="/sellertool" className={navLinkClass("/sellertool")}>
              Seller Tool
            </Link>

            <Link href="/board" className={navLinkClass("/board")}>
              Board
            </Link>

            {isAdmin && (
              <Link href="/admin" className={navLinkClass("/admin")}>
                Admin
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {status === "loading" ? null : currentUser ? (
            <>
            <div className="hidden text-sm font-medium text-neutral-700 md:block">
              안녕하세요, {currentUser.name || "사용자"}님
           </div>
              <Link
                href="/mypage"
                className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
              >
                마이페이지
              </Link>

              <button
                type="button"
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