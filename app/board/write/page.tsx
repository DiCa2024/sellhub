"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function BoardWritePage() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");
    setCurrentUser(savedUser);
    setLoaded(true);

    if (!savedUser) {
      alert("회원만 글을 작성할 수 있습니다.");
      router.push("/login");
    }
  }, [router]);

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    const savedPosts = JSON.parse(localStorage.getItem("boardPosts") || "[]");

    const nickname =
      currentUser?.nickname ||
      currentUser?.email?.split("@")[0] ||
      "회원";

    const newPost = {
      id: `board-${Date.now()}`,
      title: title.trim(),
      content: content.trim(),
      author: currentUser?.email || "",
      nickname,
      date: new Date().toISOString().slice(0, 10),
      views: 0,
    };

    const updatedPosts = [newPost, ...savedPosts];
    localStorage.setItem("boardPosts", JSON.stringify(updatedPosts));

    alert("게시글이 등록되었습니다.");
    router.push("/board");
  };

  if (!currentUser) return null;

  if (!loaded) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-10 text-center shadow-sm">
        불러오는 중...
      </div>
    </main>
  );
}

if (!currentUser) {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold">회원만 글을 작성할 수 있습니다.</h1>
        <p className="mt-3 text-sm text-neutral-600">
          게시글 작성은 로그인한 회원만 가능합니다.
        </p>
        <a
          href="/login"
          className="mt-6 inline-flex rounded-xl bg-black px-4 py-3 text-sm text-white"
        >
          로그인하러 가기
        </a>
      </div>
    </main>
  );
}
  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold">게시판 글쓰기</h1>

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium">제목</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="제목을 입력하세요"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full rounded-xl border p-3"
              placeholder="내용을 입력하세요"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-black px-5 py-3 text-white hover:opacity-90"
          >
            등록하기
          </button>
        </div>
      </div>
    </main>
  );
}