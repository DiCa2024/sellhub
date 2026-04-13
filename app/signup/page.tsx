"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  const handleSignup = () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    if (!agreeTerms || !agreePrivacy) {
      alert("Please agree to the required terms.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const alreadyExists = users.some((user: any) => user.email === email);

    if (alreadyExists) {
      alert("This email is already registered.");
      return;
    }

    const newUser = {
      email,
      password,
      role: "USER",
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    window.dispatchEvent(new Event("auth-changed"));

    alert("Sign up complete.");
    router.push("/");
  };

  return (
    <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow">
        <h1 className="mb-6 text-center text-2xl font-bold">Sign up</h1>

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
            I agree to the Terms of Service (required)
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={agreePrivacy}
              onChange={() => setAgreePrivacy(!agreePrivacy)}
            />
            I agree to the Privacy Policy (required)
          </label>
        </div>

        <button
          onClick={handleSignup}
          className="w-full rounded-xl bg-black py-3 text-white"
        >
          Create account
        </button>

        <p className="mt-4 text-center text-sm text-neutral-500">
          Already have an account?{" "}
          <a href="/login" className="font-medium text-black underline">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}