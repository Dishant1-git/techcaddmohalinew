import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";
import CtaBanner from "@/components/home/CtaBanner";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import RelatedLinks from "@/components/ui/RelatedLinks";
import { getCmsPages } from "@/lib/cms/content";

/**
 * An index of every page the office publishes from the CMS.
 *
 * Without it a page that was published but never added to a menu had no route
 * to it at all — it existed at its address and nothing on the site pointed
 * there. This is a static route, so it takes precedence over the `/[slug]`
 * catch-all beside it; a CMS page whose slug is literally "pages" would be
 * shadowed by this listing, which is a fair trade for having one.
 */

export const metadata: Metadata = {
  title: "Pages",
  description:
    "Guides, policies and notices published by techcadd Mohali — everything from the information desk in one place.",
};

export default async function PagesIndex() {
  const pages = await getCmsPages();

  return (
    <>
      <PageHero
        crumbs={[{ label: "Pages" }]}
        eyebrow="Pages"
        title={
          <>
            Everything else <span className="text-white/45">worth reading.</span>
          </>
        }
        subtitle="Guides, policies and notices published by the office."
      />

      <section className="py-16 lg:py-20">
        <div className="container-x">
          {pages.length === 0 ? (
            /*
              An empty state rather than a blank section. This list is entirely
              CMS-driven, so "nothing here yet" is a normal condition on a fresh
              install, not a fault to hide.
            */
            <div className="rounded-3xl border border-line bg-subtle px-8 py-14 text-center">
              <p className="font-display text-lg font-bold text-up-ink">Nothing published yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-up-muted">
                Pages written in the CMS appear here as soon as they are published.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
              >
                Ask us instead
                <Icon name="arrowRight" size={14} />
              </Link>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">
                  All pages
                </p>
                <p className="text-xs text-up-muted">
                  {pages.length} {pages.length === 1 ? "page" : "pages"}
                </p>
              </div>

              <div
                data-anim="up"
                data-anim-stagger
                className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {pages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${page.slug}`}
                    className="group flex flex-col rounded-2xl border border-line bg-white p-6 transition-shadow hover:shadow-[0_24px_60px_-30px_rgba(11,26,77,0.4)]"
                  >
                    <span className="break-words font-display text-lg font-bold leading-snug text-up-ink transition-colors group-hover:text-up-accent">
                      {page.title}
                    </span>
                    {page.description && (
                      <span className="mt-2 line-clamp-3 flex-1 break-words text-sm leading-relaxed text-up-muted">
                        {page.description}
                      </span>
                    )}
                    <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-xs font-semibold text-up-accent">
                      Read
                      <Icon
                        name="arrowRight"
                        size={13}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <RelatedLinks route="/blog" />
      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
