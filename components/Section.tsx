export default function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="py-10">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">{title}</h2>
        {subtitle ? <p className="mt-2 text-sm text-neutral-600">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}