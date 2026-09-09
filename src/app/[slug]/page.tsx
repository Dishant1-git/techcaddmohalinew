import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import Icon from "@/components/ui/Icon";
import CtaBanner from "@/components/home/CtaBanner";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import { getCmsPage, getCmsPageSlugs, getBlogPosts } from "@/lib/cms/content";
import { artFor } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * Pages written entirely in the CMS.
 *
 * A catch-all at the root, so an editor can publish `/scholarships` without a
 * developer adding a route. It only ever sees addresses nothing else claimed —
 * Next matches static and nested routes first — so `/courses`, `/blog` and the
 * rest are untouched by it. An address with no page behind it 404s exactly as
 * it did before.
 *
 * Unlike every other CMS reader on this site there is no built-in fallback:
 * these pages have no source in the repository, so an unreachable CMS means
 * the URL is simply not a page.
 */

export async function generateStaticParams() {
  const slugs = await getCmsPageSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getCmsPage(slug);
  if (!page) return { title: "Page not found" };

  const title = page.metaTitle || page.title;
  const description = page.metaDescription;

  return {
    title,
    description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      title: `${title} | techcadd Mohali`,
      description,
      url: `${site.url}/${page.slug}`,
      type: "article",
      images: page.ogImage ? [page.ogImage] : undefined,
    },
  };
}

/**
 * Rich text from the editor, rendered as markup.
 *
 * `dangerouslySetInnerHTML` is the point of a rich-text field — stripping the
 * tags would throw away the headings, lists and links the editor wrote. The
 * HTML comes from the CMS, which is behind a login, so it is trusted the same
 * way the rest of the site's copy is. The `prose-cms` styles live in
 * globals.css so this markup inherits the site's typography rather than the
 * browser's defaults.
 */
function RichText({ html }: { html: string }) {
  return <div className="prose-cms" dangerouslySetInnerHTML={{ __html: html }} />;
}

/** The three most recent posts, for a `blogs` block. */
async function BlogsBlock() {
  const posts = (await getBlogPosts()).slice(0, 3);
  if (!posts.length) return null;

  return (
    <div data-anim="up" data-anim-stagger className="grid gap-6 md:grid-cols-3">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white transition-shadow hover:shadow-[0_20px_50px_-30px_rgba(11,26,77,0.45)]"
        >
          <span className={`relative block h-32 bg-gradient-to-br ${artFor(post.category)}`}>
            {post.cover && (
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            )}
          </span>
          <span className="flex flex-1 flex-col p-5">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">
              {post.category}
            </span>
            <span className="mt-2 break-words font-display text-base font-bold leading-snug text-up-ink group-hover:text-up-accent">
              {post.title}
            </span>
            <span className="mt-2 line-clamp-2 break-words text-sm leading-relaxed text-up-muted">
              {post.excerpt}
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default async function CmsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getCmsPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHero crumbs={[{ label: page.title }]} eyebrow="techcadd" title={page.title} />

      <section className="py-16 lg:py-20">
        {/* `container-x` sets the page gutters but stretches full width, so the
            reading column needs its own centring — without `mx-auto` it sat
            hard against the left gutter. */}
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
          {page.html && (
            <div data-anim="up">
              <RichText html={page.html} />
            </div>
          )}

          {page.sections.map((section) => (
            <div key={section.id} className="mt-12 first:mt-0">
              {section.title && (
                <>
                  <h2
                    data-anim="words"
                    className="break-words font-display text-2xl font-extrabold text-up-ink"
                  >
                    {section.title}
                  </h2>
                  <div
                    data-underline
                    className="mb-6 mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-up-accent to-transparent"
                  />
                </>
              )}

              {/* rich-text and cta both carry prose; image and video do not. */}
              {section.type === "rich-text" && section.html && (
                <div data-anim="up">
                  <RichText html={section.html} />
                </div>
              )}

              {section.type === "image" && section.image && (
                <figure data-anim="up" className="overflow-hidden rounded-2xl">
                  <Image
                    src={section.image.src}
                    alt={section.image.alt}
                    width={section.image.width ?? 1200}
                    height={section.image.height ?? 800}
                    className="h-auto w-full object-cover"
                  />
                </figure>
              )}

              {section.type === "video" && section.link && (
                <div data-anim="up" className="overflow-hidden rounded-2xl bg-black">
                  {/* The editor supplies a URL, not a file — an iframe is the
                      only thing that can play an arbitrary one. */}
                  <div className="relative aspect-video">
                    <iframe
                      src={section.link.url}
                      title={section.title || page.title}
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full border-0"
                    />
                  </div>
                </div>
              )}

              {section.type === "cta" && (
                <div
                  data-anim="up"
                  className="rounded-3xl border border-line bg-subtle p-8 text-center"
                >
                  {section.html && <RichText html={section.html} />}
                  {section.link && (
                    <Link
                      href={section.link.url}
                      target={section.link.newTab ? "_blank" : undefined}
                      rel={section.link.newTab ? "noreferrer" : undefined}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-up-accent px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5"
                    >
                      {section.link.label}
                      <Icon name="arrowRight" size={15} />
                    </Link>
                  )}
                </div>
              )}

              {section.type === "blogs" && <BlogsBlock />}

              {/* A link on any other block type still has to go somewhere. */}
              {section.type !== "cta" && section.type !== "video" && section.link && (
                <Link
                  href={section.link.url}
                  target={section.link.newTab ? "_blank" : undefined}
                  rel={section.link.newTab ? "noreferrer" : undefined}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-up-accent"
                >
                  {section.link.label}
                  <Icon name="arrowRight" size={14} />
                </Link>
              )}
            </div>
            ))}
          </div>
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
