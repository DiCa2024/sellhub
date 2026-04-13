"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactBoardForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    setMessage("");
    setError("");

    const res = await fetch("/api/contact-posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, author, content }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      setError(data.message ?? "등록에 실패했습니다.");
      return;
    }

    setMessage("문의글이 등록되었습니다.");
    setTitle("");
    setAuthor("");
    setContent("");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <input
        className="h-11 w-full rounded-xl border px-3 text-sm"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="h-11 w-full rounded-xl border px-3 text-sm"
        placeholder="작성자"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <textarea
        className="min-h-32 w-full rounded-xl border px-3 py-3 text-sm"
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      {message ? <p className="text-sm text-green-600">{message}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button
        type="button"
        onClick={submit}
        className="h-11 rounded-xl bg-black px-5 text-sm text-white hover:bg-neutral-800"
      >
        글 등록하기
      </button>
    </div>
  );
}