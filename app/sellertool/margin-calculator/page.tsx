"use client";

import { useState } from "react";

export default function MarginCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [shippingCost, setShippingCost] = useState("");
  const [commissionRate, setCommissionRate] = useState("");
  const [extraCost, setExtraCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  const purchase = Number(purchasePrice) || 0;
  const shipping = Number(shippingCost) || 0;
  const commission = Number(commissionRate) || 0;
  const extra = Number(extraCost) || 0;
  const selling = Number(sellingPrice) || 0;

  const commissionFee = (selling * commission) / 100;
  const totalCost = purchase + shipping + commissionFee + extra;
  const profit = selling - totalCost;
  const marginRate = selling > 0 ? (profit / selling) * 100 : 0;

  return (
    <main className="min-h-[calc(100vh-80px)] bg-neutral-50 px-6 py-10">
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">마진 계산기</h1>
        <p className="mt-2 text-sm text-neutral-600">
          매입가, 배송비, 수수료, 판매가를 입력하면 순이익과 마진율을 계산합니다.
        </p>

        <div className="mt-4 flex gap-2">
         <a href="/sellertool/sales-price-calculator" className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100">
          판매가 계산기 →
         </a>
         <a href="/sellertool/commission-calculator" className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-100">
          수수료 계산기 →
         </a>
        </div>

        <div className="mt-8 grid gap-4">
          <Input label="매입가" value={purchasePrice} onChange={setPurchasePrice} />
          <Input label="배송비" value={shippingCost} onChange={setShippingCost} />
          <Input label="수수료 (%)" value={commissionRate} onChange={setCommissionRate} />
          <Input label="기타 비용" value={extraCost} onChange={setExtraCost} />
          <Input label="판매가" value={sellingPrice} onChange={setSellingPrice} />
        </div>

        <div className="mt-10 rounded-2xl border bg-neutral-50 p-6">
          <h2 className="text-lg font-bold">계산 결과</h2>

          <div className="mt-4 space-y-2 text-sm">
            <Result label="수수료 금액" value={`${commissionFee.toLocaleString()}원`} />
            <Result label="총 원가" value={`${totalCost.toLocaleString()}원`} />
            <Result label="순이익" value={`${profit.toLocaleString()}원`} />
            <Result label="마진율" value={`${marginRate.toFixed(1)}%`} />
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
         <a href="/wholesale" className="rounded-xl bg-black px-4 py-3 text-sm text-white">
          도매 사이트 보러가기
         </a>
         <a href="/blog" className="rounded-xl border px-4 py-3 text-sm hover:bg-neutral-100">
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

