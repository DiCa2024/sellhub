"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function BoardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const id = String(params.id);
  const currentUser = session?.user;

  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await fetch(`/api/board/${id}`);
        const data = await res.json();

        if (!data.success) {
          alert("게시글을 불러올 수 없습니다.");
          router.push("/board");
          return;
        }

        setPost(data.data);

        const viewedKey = `viewed_board_post_${id}`;
        const alreadyViewed = localStorage.getItem(viewedKey);

        if (!alreadyViewed) {
        const viewRes = await fetch(`/api/board/${id}/view`, {
               method: "POST",
        });

         const viewData = await viewRes.json();

        if (viewData.success) {
            setPost(viewData.data);
           localStorage.setItem(viewedKey, "true");
           }
        }

        const res2 = await fetch(`/api/board/${id}/comments`);
        const data2 = await res2.json();

        if (data2.success) {
          setComments(data2.data);
        }

        const userId = (session?.user as any)?.id;

        const likeUrl = userId
          ? `/api/board/${id}/like?userId=${userId}`
          : `/api/board/${id}/like`;

        const res3 = await fetch(likeUrl);
        const data3 = await res3.json();

        if (data3.success) {
          setLikeCount(data3.count);
          setLiked(data3.liked);
        }
      } catch (e) {
        console.error(e);
        alert("오류 발생");
        router.push("/board");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, router, session]);

  const handleDelete = async () => {
    const ok = confirm("삭제할까요?");
    if (!ok) return;

    const res = await fetch(`/api/board/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (!result.success) {
      alert(result.message || "삭제 실패");
      return;
    }

    alert("삭제 완료");
    router.push("/board");
  };

  const handleComment = async () => {
    if (!session?.user) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (!commentText.trim()) {
      alert("댓글을 입력하세요.");
      return;
    }

    const res = await fetch(`/api/board/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: commentText,
        name: session.user.email,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert("댓글 등록 실패");
      return;
    }

    setCommentText("");

    const res2 = await fetch(`/api/board/${id}/comments`);
    const data2 = await res2.json();

    if (data2.success) {
      setComments(data2.data);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
  if (!session?.user?.email) {
    alert("로그인이 필요합니다.");
    return;
  }

  const ok = confirm("댓글을 삭제할까요?");
  if (!ok) return;

  const res = await fetch(`/api/board/${id}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userEmail: session.user.email,
    }),
  });

  const result = await res.json();

  if (!result.success) {
    alert(result.message || "댓글 삭제 실패");
    return;
  }

  setComments((prev) => prev.filter((comment) => comment.id !== commentId));
};

  const handleLike = async () => {
  if (!session?.user) {
    alert("로그인이 필요합니다.");
    return;
  }

  if (likeLoading) return; // 🔥 연타 방지

  try {
    setLikeLoading(true);

    const res = await fetch(`/api/board/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: (session.user as any).id,
      }),
    });

    const result = await res.json();

    if (!result.success) {
      alert("좋아요 처리 실패");
      return;
    }

    setLiked(result.liked);
    setLikeCount((prev) =>
      result.liked ? prev + 1 : prev - 1
    );
  } catch (e) {
    console.error(e);
    alert("오류 발생");
  } finally {
    setLikeLoading(false);
  }
};

  if (loading) return <main className="p-10">불러오는 중...</main>;
  if (!post) return <main className="p-10">게시글 없음</main>;

  const isMine = currentUser?.email === post.author;

  return (
    <main className="min-h-screen bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link href="/board">← 목록으로</Link>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h1 className="text-2xl font-bold">{post.title}</h1>

          <div className="mt-2 text-sm text-gray-500">
            {post.nickname || post.author} ·{" "}
            {new Date(post.createdAt).toISOString().slice(0, 10)} · 조회{" "}
            {post.views}
          </div>

          <div className="mt-6 whitespace-pre-line">{post.content}</div>

          <div className="mt-6 flex items-center gap-3">
            <button
  type="button"
  onClick={handleLike}
  disabled={likeLoading}
  className={`rounded px-4 py-2 transition ${
    liked
      ? "bg-red-500 text-white"
      : "border text-black hover:bg-gray-100"
  } ${likeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
>
  {likeLoading ? "처리중..." : "❤️ 좋아요"}
</button>

            <span>{likeCount}</span>
          </div>

          {isMine && (
            <div className="mt-6 flex gap-2">
              <button
                type="button"
                onClick={handleDelete}
                className="rounded bg-red-500 px-4 py-2 text-white"
              >
                삭제
              </button>
            </div>
          )}
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-xl font-bold">댓글</h2>

          <div className="space-y-3">
            {comments.map((c) => {
  const isMyComment = session?.user?.email === c.name;

  return (
    <div key={c.id} className="rounded border p-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">{c.name}</div>

        {isMyComment && (
          <button
            type="button"
            onClick={() => handleDeleteComment(c.id)}
            className="text-xs text-red-500 hover:underline"
          >
            삭제
          </button>
        )}
      </div>

      <div className="mt-1">{c.text}</div>
    </div>
  );
})}
          </div>

          <div className="mt-4 flex gap-2">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="flex-1 rounded border p-2"
              placeholder="댓글 입력"
            />
            <button
              type="button"
              onClick={handleComment}
              className="rounded bg-black px-4 text-white"
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}