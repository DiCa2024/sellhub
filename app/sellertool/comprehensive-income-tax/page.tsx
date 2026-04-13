"use client";

import { useState } from "react";

export default function ComprehensiveIncomeTaxPage() {
  const [earnedIncome, setEarnedIncome] = useState("");
  const [businessIncome, setBusinessIncome] = useState("");
  const [interestIncome, setInterestIncome] = useState("");
  const [dividendIncome, setDividendIncome] = useState("");
  const [rentalIncome, setRentalIncome] = useState("");
  const [otherIncome, setOtherIncome] = useState("");

  const earned = Number(earnedIncome) || 0;
  const business = Number(businessIncome) || 0;
  const interest = Number(interestIncome) || 0;
  const dividend = Number(dividendIncome) || 0;
  const rental = Number(rentalIncome) || 0;
  const other = Number(otherIncome) || 0;

  const totalIncome = earned + business + interest + dividend + rental + other;
  const estimatedTax = calculateComprehensiveTax(totalIncome);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">종합소득세 계산기</h1>
        <p className="mt-2 text-sm text-neutral-600">
          근로, 사업, 이자, 배당, 임대, 기타소득을 합산해 참고용 종합소득세를 계산합니다.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="/sellertool/vat-calculator"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100"
          >
            ← 부가가치세 계산기
          </a>
          <a
            href="/sellertool/capital-gains-tax"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100"
          >
            양도소득세 계산기 →
          </a>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Input label="근로소득" value={earnedIncome} onChange={setEarnedIncome} />
          <Input label="사업소득" value={businessIncome} onChange={setBusinessIncome} />
          <Input label="이자소득" value={interestIncome} onChange={setInterestIncome} />
          <Input label="배당소득" value={dividendIncome} onChange={setDividendIncome} />
          <Input label="임대소득" value={rentalIncome} onChange={setRentalIncome} />
          <Input label="기타소득" value={otherIncome} onChange={setOtherIncome} />
        </div>

        <div className="mt-10 rounded-2xl border bg-neutral-50 p-6">
          <h2 className="text-lg font-bold">계산 결과</h2>

          <div className="mt-4 space-y-2 text-sm">
            <Result label="총 합산 소득" value={`${Math.round(totalIncome).toLocaleString()}원`} />
            <Result label="예상 종합소득세" value={`${Math.round(estimatedTax).toLocaleString()}원`} />
          </div>

          <p className="mt-4 text-xs leading-5 text-neutral-500">
            참고용 계산기입니다. 실제 신고세액은 공제, 감면, 필요경비, 분리과세 여부 등에 따라 달라질 수 있습니다.
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

function calculateComprehensiveTax(amount: number) {
  if (amount <= 14000000) return amount * 0.06;
  if (amount <= 50000000) return amount * 0.15 - 1260000;
  if (amount <= 88000000) return amount * 0.24 - 5760000;
  if (amount <= 150000000) return amount * 0.35 - 15440000;
  if (amount <= 300000000) return amount * 0.38 - 19940000;
  if (amount <= 500000000) return amount * 0.4 - 25940000;
  if (amount <= 1000000000) return amount * 0.42 - 35940000;
  return amount * 0.45 - 65940000;
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