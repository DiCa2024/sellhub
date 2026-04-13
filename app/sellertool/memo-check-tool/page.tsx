"use client";

import { useEffect, useState } from "react";

type MemoItem = {
  id: number;
  text: string;
  checked: boolean;
};

export default function MemoCheckToolPage() {
  const [input, setInput] = useState("");
  const [list, setList] = useState<MemoItem[]>([]);

  // 최초 로드 시 저장된 데이터 불러오기
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("memoList") || "[]");
    setList(saved);
  }, []);

  // 리스트 변경될 때마다 저장
  useEffect(() => {
    localStorage.setItem("memoList", JSON.stringify(list));
  }, [list]);

  const addItem = () => {
    if (!input.trim()) return;

    const newItem: MemoItem = {
      id: Date.now(),
      text: input,
      checked: false,
    };

    setList([newItem, ...list]);
    setInput("");
  };

  const toggleItem = (id: number) => {
    const updated = list.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setList(updated);
  };

  const deleteItem = (id: number) => {
    const updated = list.filter((item) => item.id !== id);
    setList(updated);
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">메모 / 체크 도구</h1>
        <p className="mt-2 text-sm text-neutral-600">
          소싱 아이디어, 체크리스트를 간단하게 기록하고 관리하세요.
        </p>

        {/* 입력 영역 */}
        <div className="mt-6 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addItem();
              }
            }}
            className="flex-1 rounded-xl border p-3"
            placeholder="메모 입력 후 Enter"
          />
          <button
            onClick={addItem}
            className="rounded-xl bg-black px-4 text-white"
          >
            추가
          </button>
        </div>

        {/* 리스트 */}
        <div className="mt-8 space-y-3">
          {list.length === 0 ? (
            <p className="text-sm text-neutral-500">아직 메모가 없습니다.</p>
          ) : (
            list.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-xl border p-3"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => toggleItem(item.id)}
                  />
                  <span
                    className={`text-sm ${
                      item.checked
                        ? "line-through text-neutral-400"
                        : ""
                    }`}
                  >
                    {item.text}
                  </span>
                </div>

                <button
                  onClick={() => deleteItem(item.id)}
                  className="text-sm text-red-500"
                >
                  삭제
                </button>
              </div>
            ))
          )}
        </div>

        {/* 하단 이동 버튼 */}
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/wholesale"
            className="rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            도매 사이트 보러가기
          </a>
          <a
            href="/blog"
            className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100"
          >
            블로그 보러가기
          </a>
        </div>
      </div>
    </main>
  );
}