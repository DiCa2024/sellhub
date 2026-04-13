import Link from "next/link";

export default function BrandCard({ brand }: { brand: any }) {
  const tagList =
    typeof brand.tags === "string"
      ? brand.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean)
      : Array.isArray(brand.tags)
      ? brand.tags
      : [];

  return (
    <Link
      href={`/brands/${brand.slug ?? brand.id}`}
      className="group rounded-2xl border p-4 transition hover:-translate-y-1 hover:shadow-lg hover:border-neutral-300"
    >
      {brand.imageUrl && (
  <div className="mb-3 overflow-hidden rounded-xl">
    <img
      src={brand.imageUrl}
      alt={brand.name}
      className="h-40 w-full object-cover"
    />
  </div>
)}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-neutral-500">
            {brand.country} · {brand.category}
          </div>

          <div className="mt-1 text-base font-semibold group-hover:underline">
            {brand.name}
          </div>

          <div className="mt-2 line-clamp-2 text-sm text-neutral-600">
            {brand.oneLiner}
          </div>
        </div>

        <div className="rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-700">
          {brand.budgetLabel ?? brand.budget}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {tagList.slice(0, 4).map((t: string) => (
          <span
            key={t}
            className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700"
          >
            {t}
          </span>
        ))}
      </div>
    </Link>
  );
}