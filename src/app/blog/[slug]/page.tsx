import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, categoryArt, getPost } from "@/lib/blog";
import Icon from "@/components/ui/Icon";
import CtaBanner from "@/components/home/CtaBanner";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Post not found" };
  return { title: post.title, description: post.excerpt };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="relative overflow-hidden bg-hero-950 pb-16 pt-[7.5rem] text-white lg:pb-20 lg:pt-[12rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_20%_0%,#123285_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_90%_40%,#1c53d1_0%,transparent_55%)] opacity-85" />
        <div className="absolute inset-0 grid-lines" />

        <div className="container-x relative max-w-3xl">
          <nav data-anim="fade" className="mb-6 flex flex-wrap items-center gap-2 text-xs text-up-soft/60">
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Icon name="arrowRight" size={11} className="opacity-50" />
            <Link href="/blog" className="transition-colors hover:text-white">
              Blog
            </Link>
            <Icon name="arrowRight" size={11} className="opacity-50" />
            <span className="text-up-soft">{post.category}</span>
          </nav>

          <p
            data-anim="fade"
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-up-soft"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-yellow" />
            {post.category}
          </p>

          <h1 data-anim="words" className="font-display text-3xl font-extrabold leading-[1.15] sm:text-4xl lg:text-[2.9rem]">
            {post.title}
          </h1>

          <div data-anim="up" data-anim-delay="0.15" className="mt-6 flex items-center gap-3 text-sm text-up-soft/70">
            <span>{post.author}</span>
            <span className="h-1 w-1 rounded-full bg-up-soft/40" />
            <span>{formatDate(post.date)}</span>
            <span className="h-1 w-1 rounded-full bg-up-soft/40" />
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <article className="py-16 lg:py-20">
        <div className="container-x max-w-3xl">
          <span className={`relative block h-56 overflow-hidden rounded-3xl bg-gradient-to-br ${categoryArt[post.category]} sm:h-72`}>
            <span className="absolute inset-0 grid-lines opacity-70" />
          </span>

          <div className="mt-10 space-y-5">
            {post.body.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-up-ink/85">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-line bg-subtle px-6 py-5">
            <p className="text-sm text-up-muted">Want this mapped to your own background and goals?</p>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-up-accent px-5 py-2.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            >
              Talk to a counsellor
              <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {related.length > 0 && (
            <div className="mt-14 border-t border-line pt-10">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-up-muted">
                More on {post.category}
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="group rounded-2xl border border-line p-5 transition-colors hover:border-up-accent"
                  >
                    <h3 className="text-sm font-bold text-up-ink transition-colors group-hover:text-up-accent">
                      {r.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-up-muted">{r.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>

      <CtaBanner />
    </>
  );
}
