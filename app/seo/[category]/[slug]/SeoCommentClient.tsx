"use client";

import { useState } from "react";

export default function SeoCommentClient({
  seoPostId,
  initialComments,
}: {
  seoPostId: number;
  initialComments: any[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const submitComment = async () => {
    if (!name.trim() || !text.trim()) {
      alert("이름과 댓글을 입력해주세요.");
      return;
    }

    const res = await fetch("/api/seo-comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        seoPostId,
        name,
        text,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message || "댓글 등록 실패");
      return;
    }

    setComments([result.data, ...comments]);
    setName("");
    setText("");
  };

  return (
    <section className="mt-16">
      <h2 className="mb-5 text-2xl font-bold">댓글</h2>

      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
  <div className="flex flex-col gap-2 md:flex-row">
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="이름"
      className="h-12 w-full rounded-xl border bg-white px-3 text-sm md:w-32"
    />

    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") submitComment();
      }}
      placeholder="댓글을 입력하세요"
      className="h-12 flex-1 rounded-xl border bg-white px-3 text-sm"
    />

    <button
      type="button"
      onClick={submitComment}
      className="h-12 rounded-xl bg-black px-5 text-sm font-medium text-white"
    >
      등록
    </button>
  </div>
</div>

      <div className="mt-6 space-y-4">
        {comments.length === 0 ? (
          <p className="text-sm text-neutral-500">아직 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-neutral-200 bg-white p-5"
            >
              <p className="font-bold">{comment.name}</p>
              <p className="mt-2 text-sm leading-7 text-neutral-700">
                {comment.text}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}