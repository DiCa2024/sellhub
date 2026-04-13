"use client";

import { useState } from "react";

export default function VatCalculatorPage() {
  const [supplyAmount, setSupplyAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  const supply = Number(supplyAmount) || 0;
  const total = Number(totalAmount) || 0;

  const vatFromSupply = supply * 0.1;
  const totalFromSupply = supply + vatFromSupply;

  const supplyFromTotal = total / 1.1;
  const vatFromTotal = total - supplyFromTotal;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">부가가치세 계산기</h1>
        <p className="mt-2 text-sm text-neutral-600">
          공급가액 또는 합계금액을 기준으로 부가세를 계산할 수 있습니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/sellertool/margin-calculator"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100"
          >
            ← 마진 계산기
          </a>
          <a
            href="/sellertool/memo-check-tool"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100"
          >
            메모 / 체크 도구 →
          </a>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl border bg-neutral-50 p-6">
            <h2 className="text-lg font-bold">공급가액 기준 계산</h2>
            <p className="mt-1 text-sm text-neutral-600">
              공급가액을 입력하면 부가세와 합계금액을 계산합니다.
            </p>

            <div className="mt-4">
              <Input
                label="공급가액"
                value={supplyAmount}
                onChange={setSupplyAmount}
              />
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <Result
                label="부가세"
                value={`${Math.round(vatFromSupply).toLocaleString()}원`}
              />
              <Result
                label="합계금액"
                value={`${Math.round(totalFromSupply).toLocaleString()}원`}
              />
            </div>
          </section>

          <section className="rounded-2xl border bg-neutral-50 p-6">
            <h2 className="text-lg font-bold">합계금액 기준 계산</h2>
            <p className="mt-1 text-sm text-neutral-600">
              합계금액을 입력하면 공급가액과 부가세를 분리 계산합니다.
            </p>

            <div className="mt-4">
              <Input
                label="합계금액"
                value={totalAmount}
                onChange={setTotalAmount}
              />
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <Result
                label="공급가액"
                value={`${Math.round(supplyFromTotal).toLocaleString()}원`}
              />
              <Result
                label="부가세"
                value={`${Math.round(vatFromTotal).toLocaleString()}원`}
              />
            </div>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/wholesale"
            className="rounded-xl bg-black px-4 py-3 text-sm text-white"
          >
            도매 리스트 보러가기
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

function Input({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();

            const inputs = Array.from(
              document.querySelectorAll<HTMLInputElement>(".calc-input")
            );
            const index = inputs.indexOf(e.currentTarget);

            if (index !== -1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          }
        }}
        className="calc-input w-full rounded-xl border p-3"
        placeholder="숫자를 입력하세요"
      />
    </div>
  );
}

function Result({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}