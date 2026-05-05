"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleEmailSignup = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
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

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center bg-neutral-50 px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-2 text-center text-2xl font-bold">Create account</h1>
        <p className="mb-6 text-center text-sm text-neutral-500">
          이메일 또는 Google 계정으로 globalsellershop에 가입하세요.
        </p>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="w-full rounded-xl border border-neutral-300 bg-white py-3 font-semibold text-black"
          >
            Google로 회원가입
          </button>
        </div>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-200" />
          <span className="text-xs text-neutral-400">or</span>
          <div className="h-px flex-1 bg-neutral-200" />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 w-full rounded-xl border p-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-full rounded-xl border p-3"
        />

        <div className="mb-4 space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
            />
            서비스 이용약관에 동의합니다 (필수)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={() => setAgreePrivacy(!agreePrivacy)}
            />
            개인정보 처리방침에 동의합니다 (필수)
          </label>
        </div>

        <button
          onClick={handleEmailSignup}
          disabled={loading}
          className="w-full rounded-xl bg-black py-3 text-white disabled:opacity-50"
        >
          {loading ? "Creating..." : "이메일로 회원가입"}
        </button>

        <p className="mt-4 text-center text-sm text-neutral-500">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="font-medium text-black underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}