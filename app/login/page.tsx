"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      setLoading(true);

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
        return;
      }

      alert("로그인되었습니다.");
      router.push("/");
      router.refresh();
    } catch {
      alert("로그인 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-neutral-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-2xl font-bold">로그인</h1>
        <p className="mb-6 text-center text-sm text-neutral-500">
          이메일 또는 Google 계정으로 로그인하세요.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full cursor-pointer rounded-xl border border-neutral-300 bg-white py-3 font-semibold text-black transition hover:bg-neutral-100"
          >
            Google로 계속하기
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">또는</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEmailLogin();
          }}
        >
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full rounded-xl border p-3"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border p-3"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-black py-3 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "로그인 중..." : "이메일로 로그인"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-500">
          아직 계정이 없으신가요?{" "}
          <a
            href="/signup"
            className="cursor-pointer font-medium text-black underline"
          >
            회원가입
          </a>
        </p>
      </div>
    </main>
  );
}