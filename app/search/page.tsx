import { brands } from "../../data/brands";

function includesLoose(a: string, b: string) {
  return a.toLowerCase().includes(b.toLowerCase());
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const q = typeof searchParams.q === "string" ? searchParams.q : "";
  const category = typeof searchParams.category === "string" ? searchParams.category : "";
  const country = typeof searchParams.country === "string" ? searchParams.country : "";
  const budget = typeof searchParams.budget === "string" ? searchParams.budget : "";

  const filtered = brands.filter((b) => {
    const okQ =
      !q ||
      includesLoose(b.name, q) ||
      includesLoose(b.oneLiner, q) ||
      b.tags.some((t) => includesLoose(t, q));

    const okCategory = !category || b.category === category;
    const okCountry = !country || b.country === country;
    const okBudget = !budget || b.budgetLabel === budget;

    return okQ && okCategory && okCountry && okBudget;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">검색 결과</h1>
        <p className="mt-2 text-sm text-neutral-600">결과 {filtered.length}개</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filtered.map((b) => (
          <a key={b.id} href={`/brands/${b.id}`} className="rounded-2xl border p-4">
            <div className="text-sm text-neutral-500">
              {b.country} · {b.category} · {b.budgetLabel}
            </div>
            <div className="mt-1 text-base font-semibold">{b.name}</div>
            <div className="mt-2 text-sm text-neutral-600">{b.oneLiner}</div>
          </a>
        ))}
      </div>
    </div>
  );
}