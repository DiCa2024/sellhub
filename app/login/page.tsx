"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (user: any) => user.email === email && user.password === password
    );

    if (!foundUser) {
      alert("Login failed.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(foundUser));
    window.dispatchEvent(new Event("auth-changed"));
    alert("Login success.");
    router.push("/");
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>

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

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-black py-3 text-white"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-neutral-500">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="font-medium text-black underline">
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}