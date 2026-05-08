"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [nickname, setNickname] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async () => {
    if (!nickname || !email || !password) {
  alert("닉네임, 이메일, 비밀번호를 입력해주세요.");
  return;
}

    if (!agreeTerms || !agreePrivacy) {
      alert("Please agree to the required terms.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
               nickname,
               email,
               password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Sign up failed.");
        return;
      }

      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginResult?.error) {
        alert("Sign up complete. Please login.");
        router.push("/login");
        return;
      }

      alert("Sign up complete.");
      router.push("/");
      router.refresh();
    } catch {
      alert("Server error.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    if (!agreeTerms || !agreePrivacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    signIn("google", { callbackUrl: "/" });
  };

  const handleKakaoSignup = () => {
    if (!agreeTerms || !agreePrivacy) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    signIn("kakao", { callbackUrl: "/" });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleEmailSignup();
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-neutral-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-bold">
          Create account
        </h1>

        <p className="mb-6 text-center text-sm text-neutral-500">
          이메일 또는 소셜 계정으로 globalsellershop에 가입하세요.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleKakaoSignup}
            className="w-full cursor-pointer rounded-xl bg-[#FEE500] py-3 font-semibold text-black transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            카카오로 회원가입
          </button>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full cursor-pointer rounded-xl border border-neutral-300 bg-white py-3 font-semibold text-black transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            Google로 회원가입
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">or</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <form onSubmit={handleSubmit}>
          <input
             type="text"
             placeholder="Nickname"
             value={nickname}
            onChange={(e) => setNickname(e.target.value)}
             className="mb-3 w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-3 w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-xl border p-3 outline-none transition focus:border-black"
          />

          <div className="mb-4 space-y-2 text-sm">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              서비스 이용약관에 동의합니다 (필수)
            </label>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                checked={agreePrivacy}
                onChange={() => setAgreePrivacy(!agreePrivacy)}
              />
              개인정보 처리방침에 동의합니다 (필수)
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-black py-3 text-white transition duration-200 hover:-translate-y-1 hover:bg-neutral-800 hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "이메일로 회원가입"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-500">
          이미 계정이 있으신가요?{" "}
          <a
            href="/login"
            className="cursor-pointer font-medium text-black underline transition hover:text-neutral-600"
          >
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
