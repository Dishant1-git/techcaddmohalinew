import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { RELATED, type RelatedLink } from "@/lib/related";

/**
 * The cross-linking block that closes a page.
 *
 * Pass `route` for a static page and the set comes from the map in
 * `@/lib/related`; pass `links` directly for a dynamic route that builds its
 * own from the record it is rendering. Renders nothing when there is nothing to
 * offer, so a page can mount it unconditionally.
 *
 * It sits above `<CtaBanner/>` on purpose: the banner is the end of the page,
 * and a reader who is not ready for it should meet somewhere else to go first
 * rather than the enquiry form or the back button.
 */
export default function RelatedLinks({
  route,
  links,
  eyebrow = "Keep exploring",
  title = "Where to go next",
  tone = "subtle",
}: {
  route?: string;
  links?: RelatedLink[];
  eyebrow?: string;
  title?: string;
  tone?: "subtle" | "plain";
}) {
  const items = links ?? (route ? RELATED[route] : undefined) ?? [];
  if (items.length === 0) return null;

  return (
    <section
      className={`border-t border-line py-20 lg:py-24 ${tone === "subtle" ? "bg-subtle" : ""}`}
      aria-labelledby="related-heading"
    >
      <div className="container-x">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-accent">{eyebrow}</p>
        <h2
          id="related-heading"
          data-anim="words"
          className="mt-3 font-display text-2xl font-extrabold text-up-ink sm:text-3xl"
        >
          {title}
        </h2>
        <div
          data-underline
          className="mt-4 h-[3px] w-20 rounded-full bg-gradient-to-r from-up-accent to-transparent"
        />

        <div
          data-anim="up"
          data-anim-stagger
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className="card-hover group flex flex-col rounded-3xl border border-line bg-white p-7"
            >
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-50 text-up-accent transition-colors group-hover:bg-up-accent group-hover:text-white">
                <Icon name={l.icon} size={19} />
              </span>
              <span className="mt-5 font-display text-lg font-bold leading-snug text-up-ink transition-colors group-hover:text-up-accent">
                {l.label}
              </span>
              <span className="mt-2.5 flex-1 text-sm leading-relaxed text-up-muted">{l.blurb}</span>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-up-accent">
                {l.cta}
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
