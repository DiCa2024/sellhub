"use client";

import { useState } from "react";

export default function BlogCommentClient({
  blogId,
  initialComments,
}: {
  blogId: number;
  initialComments: any[];
}) {
  const [comments, setComments] = useState<any[]>(initialComments);
  const [commentName, setCommentName] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const visibleComments = showAllComments ? comments : comments.slice(0, 5);

  const handleAddComment = async () => {
    if (!commentName.trim() || !commentText.trim()) {
      alert("이름과 댓글 내용을 입력해 주세요.");
      return;
    }

    const response = await fetch(`/api/blog/${blogId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: commentName.trim(),
        text: commentText.trim(),
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      alert(result.message || "댓글 등록 실패");
      return;
    }

    setComments([result.data, ...comments]);
    setCommentName("");
    setCommentText("");
  };

  return (
    <section className="mt-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">댓글</h2>
      </div>

      <div className="rounded-2xl bg-neutral-50 p-5">
        <div className="grid gap-3 md:grid-cols-[180px_1fr]">
          <input
            value={commentName}
            onChange={(e) => setCommentName(e.target.value)}
            placeholder="이름"
            className="rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
          />

          <div className="flex gap-3">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력해 주세요"
              className="flex-1 rounded-xl border border-neutral-300 bg-white px-4 py-3 text-sm outline-none focus:border-neutral-900"
            />

            <button
              type="button"
              onClick={handleAddComment}
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white"
            >
              등록
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {visibleComments.length === 0 ? (
          <div className="rounded-2xl bg-neutral-50 px-5 py-6 text-sm text-neutral-500">
            아직 댓글이 없습니다.
          </div>
        ) : (
          visibleComments.map((item) => (
            <div key={item.id} className="rounded-2xl bg-neutral-50 px-5 py-5">
              <div className="text-sm font-semibold text-neutral-900">
                {item.name}
              </div>
              <div className="mt-2 whitespace-pre-line text-sm leading-7 text-neutral-700">
                {item.text}
              </div>
            </div>
          ))
        )}
      </div>

      {comments.length > 5 && (
        <div className="mt-5">
          <button
            type="button"
            onClick={() => setShowAllComments((prev) => !prev)}
            className="text-sm font-medium text-neutral-600 hover:text-black"
          >
            {showAllComments ? "댓글 접기" : "댓글 더보기"}
          </button>
        </div>
      )}
    </section>
  );
}