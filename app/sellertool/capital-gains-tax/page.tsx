"use client";

import { useState } from "react";

export default function CapitalGainsTaxPage() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [taxRate, setTaxRate] = useState("");

  const purchase = Number(purchasePrice) || 0;
  const selling = Number(sellingPrice) || 0;
  const expense = Number(expenseCost) || 0;
  const rate = Number(taxRate) || 0;

  const gain = Math.max(selling - purchase - expense, 0);
  const estimatedTax = (gain * rate) / 100;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">양도소득세 계산기</h1>
        <p className="mt-2 text-sm text-neutral-600">
          취득가액, 양도가액, 필요경비와 적용세율을 기준으로 참고용 세액을 계산합니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/sellertool/comprehensive-income-tax"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100"
          >
            ← 종합소득세 계산기
          </a>
          <a
            href="/sellertool/memo-check-tool"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100"
          >
            메모 / 체크 도구 →
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Input label="취득가액" value={purchasePrice} onChange={setPurchasePrice} />
          <Input label="양도가액" value={sellingPrice} onChange={setSellingPrice} />
          <Input label="필요경비" value={expenseCost} onChange={setExpenseCost} />
          <Input label="적용세율 (%)" value={taxRate} onChange={setTaxRate} />
        </div>

        <div className="mt-10 rounded-2xl border bg-neutral-50 p-6">
          <h2 className="text-lg font-bold">계산 결과</h2>

          <div className="mt-4 space-y-2 text-sm">
            <Result label="양도차익" value={`${Math.round(gain).toLocaleString()}원`} />
            <Result label="예상 양도소득세" value={`${Math.round(estimatedTax).toLocaleString()}원`} />
          </div>

          <p className="mt-4 text-xs leading-5 text-neutral-500">
            참고용 계산기입니다. 실제 양도소득세는 자산 종류, 보유기간, 중과 여부, 공제 적용 등에 따라 달라질 수 있습니다.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
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