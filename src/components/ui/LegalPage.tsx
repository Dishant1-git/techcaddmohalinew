import PageHero from "@/components/ui/PageHero";

export default function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}) {
  return (
    <>
      <PageHero crumbs={[{ label: title }]} eyebrow={`Last updated ${updated}`} title={title} />

      <section className="py-20 lg:py-28">
        <div className="container-x max-w-3xl">
          {sections.map((s) => (
            <div key={s.heading} data-anim="up" className="mb-10 last:mb-0">
              <h2 className="font-display text-xl font-extrabold text-up-ink">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 text-sm leading-relaxed text-up-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
