"use client";

import { useState } from "react";

type InquiryFormProps = {
  brandId: string;
  isLoggedIn: boolean;
};

export default function InquiryForm({ brandId, isLoggedIn }: InquiryFormProps) {
  const [message, setMessage] = useState("");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPassword, setGuestPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResultMessage("");

    const payload = {
      brandId,
      message,
      ...(isLoggedIn
        ? {}
        : {
            guestName,
            guestPhone,
            guestEmail,
            guestPassword,
          }),
    };

    const res = await fetch("/api/inquiries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      setResultMessage("문의가 정상적으로 접수되었습니다.");
      setMessage("");
      setGuestName("");
      setGuestPhone("");
      setGuestEmail("");
      setGuestPassword("");
    } else {
      setResultMessage(data.error || "문의 등록에 실패했습니다.");
    }

    setLoading(false);
  };

  return (
    <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold mb-2">상담 문의</h2>

      {isLoggedIn ? (
        <div className="mb-4 rounded-xl bg-blue-50 p-4 text-sm text-blue-700">
          회원 문의입니다. 문의 내역 추적과 맞춤 추천 혜택을 받을 수 있습니다.
        </div>
      ) : (
        <div className="mb-4 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-700">
          비회원도 문의할 수 있지만, 회원 가입 시 문의 내역 조회와 관심 브랜드 저장이 가능합니다.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLoggedIn && (
          <>
            <input
              type="text"
              placeholder="이름"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
            <input
              type="text"
              placeholder="연락처"
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
            <input
              type="email"
              placeholder="이메일(선택)"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
            <input
              type="password"
              placeholder="문의 조회용 비밀번호"
              value={guestPassword}
              onChange={(e) => setGuestPassword(e.target.value)}
              className="w-full rounded-lg border px-3 py-2"
            />
          </>
        )}

        <textarea
          placeholder="문의 내용을 입력하세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full rounded-lg border px-3 py-2 min-h-[140px]"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-black px-5 py-3 text-white disabled:opacity-50"
        >
          {loading ? "접수 중..." : "문의하기"}
        </button>
      </form>

      {resultMessage && (
        <p className="mt-4 text-sm text-gray-700">{resultMessage}</p>
      )}
    </div>
  );
}