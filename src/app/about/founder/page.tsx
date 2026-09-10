import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { founder, founderStory, leadership } from "@/lib/about";
import RelatedLinks from "@/components/ui/RelatedLinks";
import TeamWall from "@/components/about/TeamWall";

export const metadata: Metadata = {
  title: "Our Founder",
  description:
    "Mr. Gourav Gupta founded techcadd in 2016 to give young people in Punjab technology skills and the confidence to use them — practising engineers as trainers, project work over slide decks.",
};

const milestones = [
  { year: "2016", body: "techcadd opens with one classroom in Jalandhar." },
  { year: "2018", body: "A dedicated placement cell takes over resumes, mock interviews and partners." },
  { year: "2021", body: "Data, cloud and DevOps tracks are built with practising engineers." },
  { year: "2023", body: "The Sector 75 campus brings the full curriculum to the tricity." },
  { year: "2026", body: "AI is folded into every track rather than sold as a separate course." },
];

/** Bottom-to-top rail text, the way an editorial spread labels its margin. */
const RAIL = "[writing-mode:vertical-rl] rotate-180";

export default function FounderPage() {
  return (
    <>
      {/* ================================ HERO ================================
          Photo left, a solid accent block right, and the name set oversized
          behind both. The reference runs a cut-out figure straight onto the
          dark, which needs a masked portrait; ours is a rectangular photograph,
          so it is framed as a panel instead and the name is ghosted behind it —
          the same watermark idiom the footer already uses, rather than a
          knock-out this photograph cannot support. */}
      <section className="relative overflow-hidden bg-hero-950 pt-[7.5rem] text-white lg:pt-[8.5rem]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_25%_10%,#123285_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-lines opacity-40" />

        {/* The name, oversized and ghosted, straddling the photo's top edge. */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[6.5rem] select-none px-4 text-center font-display text-[clamp(3.2rem,13vw,11rem)] font-extrabold uppercase leading-[0.82] tracking-tighter text-white/[0.09] lg:top-[7.5rem]"
        >
          Gourav Gupta
        </span>

        {/* Margin rail */}
        <span
          aria-hidden
          className={`absolute left-5 top-1/2 hidden -translate-y-1/2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-white/35 xl:block ${RAIL}`}
        >
          Founder &amp; CEO
        </span>

        <div className="container-x relative">
          <nav
            data-anim="fade"
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-up-soft/60"
          >
            <Link href="/" className="transition-colors hover:text-white">
              Home
            </Link>
            <Icon name="arrowRight" size={11} className="opacity-50" />
            <Link href="/about" className="transition-colors hover:text-white">
              About
            </Link>
            <Icon name="arrowRight" size={11} className="opacity-50" />
            <span className="text-up-soft">Founder</span>
          </nav>

          <div className="mt-10 grid items-end gap-8 pb-16 lg:mt-14 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:pb-24">
            {/* Portrait panel */}
            <figure
              data-anim="scale"
              className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[2rem] sm:aspect-[3/4] lg:aspect-auto lg:h-[34rem] xl:h-[38rem]"
            >
              <Image
                src={founder.photo?.src ?? "/founder/gouravsir.jpg"}
                alt={founder.photo?.alt ?? founder.name}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                className="object-cover object-top"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-hero-950/70 via-transparent to-transparent"
              />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-6 lg:p-8">
                <span className="h-px w-10 bg-accent-yellow" />
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white/85">
                  {founder.role}
                </span>
              </figcaption>
            </figure>

            {/* The accent block. Yellow rather than the reference's red: it is
                the one loud colour this site already owns, and it is what every
                primary action on the page is set in. */}
            <div
              data-anim="up"
              data-anim-delay="0.15"
              className="relative flex flex-col justify-center bg-accent-yellow p-8 text-hero-950 sm:p-10 lg:h-[26rem] lg:p-12 xl:h-[29rem]"
            >
              <span
                aria-hidden
                className="font-display text-6xl font-extrabold leading-none text-hero-950/15"
              >
                &ldquo;
              </span>
              <p className="-mt-6 font-display text-2xl font-extrabold leading-[1.2] tracking-tight sm:text-[1.75rem]">
                {founder.quote}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-hero-950/75">
                He started techcadd in 2016 with one rule that has not moved since: a student
                should leave with work an employer can open and inspect.
              </p>
              <Link
                href="/about"
                className="group mt-8 inline-flex w-fit items-center gap-3 border-b-2 border-hero-950 pb-1 text-sm font-bold uppercase tracking-[0.14em]"
              >
                The institute
                <Icon
                  name="arrowRight"
                  size={15}
                  className="transition-transform group-hover:translate-x-1.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =============================== ABOUT ================================
          Heading and dense narrow columns left, an offset photo panel right —
          the reference's second spread. */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <span
          aria-hidden
          className="dot-grid pointer-events-none absolute -left-6 top-16 h-40 w-40 opacity-70"
        />

        <div className="container-x relative grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16 xl:grid-cols-[1fr_24rem]">
          <div>
            <p
              data-anim="fade"
              className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-up-accent"
            >
              About {founder.name.replace("Mr. ", "").split(" ")[0]}
            </p>
            <h2
              data-anim="words"
              className="mt-5 max-w-2xl font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-up-ink sm:text-4xl lg:text-[2.9rem]"
            >
              The person behind techcadd
            </h2>
            <div
              data-underline
              className="mt-6 h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-up-accent to-transparent"
            />

            {/* Two narrow measures rather than one wide one — the reference sets
                its body copy in columns, and it is also simply easier to read
                at this size. */}
            <div
              data-anim="up"
              data-anim-delay="0.1"
              className="mt-10 grid gap-8 text-[0.92rem] leading-relaxed text-up-muted sm:grid-cols-2"
            >
              <p>{founder.bio}</p>
              <p>{founderStory[0].body}</p>
            </div>

            <dl className="mt-12 grid gap-8 border-t border-line pt-9 sm:grid-cols-3">
              {founder.principles.map((p) => (
                <div key={p.title}>
                  <dt className="font-display text-base font-bold text-up-ink">{p.title}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-up-muted">{p.body}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Offset panel: lifted on large screens so it breaks the section's
              top line the way the reference's card overlaps its hero. */}
          <figure
            data-anim="up"
            data-anim-delay="0.2"
            className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] border border-line lg:-mt-40"
          >
            <Image
              src="/about/team-alpine-college.jpeg"
              alt="The techcadd team with faculty at Alpine Girl's (AIIT) College"
              fill
              sizes="(min-width: 1024px) 24rem, 100vw"
              className="object-cover"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-hero-950/90 to-transparent p-6 pt-14 text-[0.72rem] leading-relaxed text-white/85">
              On campus with faculty — industry engagement is run as part of the programme, not
              around it.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ============================= PULL QUOTE =============================
          The reference's full-bleed statement band, in the accent. */}
      <section className="relative overflow-hidden bg-accent-yellow py-20 text-hero-950 lg:py-28">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-4 top-2 select-none font-display text-[14rem] font-extrabold leading-none text-hero-950/10 lg:text-[20rem]"
        >
          &ldquo;
        </span>

        <div className="container-x relative mx-auto max-w-4xl text-center">
          <blockquote
            data-anim="words"
            className="font-display text-[2rem] font-extrabold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            You learn it
            <br />
            by building it.
          </blockquote>
          <p className="mt-8 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-hero-950/70">
            {founder.name} · {founder.role}
          </p>
        </div>
      </section>

      {/* ============================= LEADERSHIP ============================= */}
      <section className="relative overflow-hidden bg-hero-950 py-24 text-white lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_0%,rgba(28,83,209,0.4),transparent_65%)]" />
        <div className="absolute inset-0 grid-lines opacity-40" />
        <div data-parallax="-50" className="glow-blob right-[6%] top-[12%] h-[22rem] w-[22rem] bg-accent-glow/20" />
        <div data-parallax="40" className="glow-blob bottom-[8%] left-[4%] h-[18rem] w-[18rem] bg-brand-400/20" />

        <div className="container-x relative">
          <div className="max-w-2xl">
            <p
              data-anim="fade"
              className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-accent-glow"
            >
              Under his leadership
            </p>
            <h2
              data-anim="words"
              className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.9rem]"
            >
              Five things that widened
            </h2>
            <p data-anim="up" data-anim-delay="0.1" className="mt-5 text-base leading-relaxed text-up-soft/75">
              Not a list of qualities — the parts of the institute that actually moved, and are
              still moving.
            </p>
          </div>

          {/* Five cards in a six-column grid: three across, then the last two
              starting at column two so the short row sits centred instead of
              stranded against the left edge. */}
          <div
            data-anim="up"
            data-anim-stagger
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-6"
          >
            {leadership.map((l, i) => (
              <div
                key={l.title}
                className={`card-hover glass-dark glass-sheen group relative overflow-hidden rounded-3xl p-7 lg:col-span-2 ${
                  i === 3 ? "lg:col-start-2" : ""
                }`}
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-14 -top-14 h-40 w-40 rounded-full bg-gradient-to-br from-accent-glow to-hero-glow opacity-25 blur-2xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-50"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-5 font-display text-5xl font-extrabold leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.12]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent-glow to-hero-glow text-hero-950 shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon name={l.icon} size={22} />
                </span>

                <h3 className="relative mt-6 font-display text-lg font-bold text-white transition-colors duration-300 group-hover:text-accent-glow">
                  {l.title}
                </h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-up-soft/75">{l.body}</p>

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-glow to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================== CAREER ===============================
          The reference's last spread: photograph one side, a dense run of text
          the other, with the margin rail and a dot field as the only decoration. */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <span
          aria-hidden
          className="dot-grid pointer-events-none absolute bottom-20 right-0 h-48 w-48 opacity-60"
        />
        <span
          aria-hidden
          className={`absolute right-5 top-1/2 hidden -translate-y-1/2 text-[0.65rem] font-bold uppercase tracking-[0.4em] text-up-muted/50 xl:block ${RAIL}`}
        >
          Since 2016
        </span>

        <div className="container-x relative grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-16 xl:grid-cols-[26rem_1fr]">
          <figure
            data-anim="up"
            className="relative aspect-[3/4] w-full self-start overflow-hidden rounded-[1.5rem] border border-line lg:sticky lg:top-28"
          >
            <Image
              src="/about/alpine-trainer-addressing.jpeg"
              alt="A techcadd trainer addressing students at a college session"
              fill
              sizes="(min-width: 1024px) 26rem, 100vw"
              className="object-cover"
            />
          </figure>

          <div>
            <p
              data-anim="fade"
              className="text-[0.7rem] font-bold uppercase tracking-[0.3em] text-up-accent"
            >
              The record
            </p>
            <h2
              data-anim="words"
              className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-up-ink sm:text-4xl lg:text-[2.9rem]"
            >
              Ten years, one method
            </h2>
            <div
              data-underline
              className="mt-6 h-[3px] w-24 origin-left rounded-full bg-gradient-to-r from-up-accent to-transparent"
            />

            {/* The story, set as a run of labelled paragraphs rather than cards
                — this section is meant to be read, and a grid of tiles would
                invite skimming past it. */}
            <div data-anim="up" data-anim-stagger className="mt-10 space-y-9">
              {founderStory.slice(1).map((s) => (
                <article key={s.label} className="border-l-2 border-line pl-6">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-up-accent">
                    {s.label}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold text-up-ink">{s.title}</h3>
                  <p className="mt-2.5 text-[0.92rem] leading-relaxed text-up-muted">{s.body}</p>
                </article>
              ))}
            </div>

            {/* The same decade as a bare index, for the reader who wants the
                dates without the prose. */}
            <ol
              data-anim="up"
              className="mt-12 divide-y divide-line border-y border-line text-sm"
            >
              {milestones.map((m) => (
                <li key={m.year} className="flex items-start gap-6 py-4">
                  <span className="w-12 shrink-0 font-display text-base font-extrabold text-up-accent">
                    {m.year}
                  </span>
                  <span className="leading-relaxed text-up-muted">{m.body}</span>
                </li>
              ))}
            </ol>

            <Link
              data-anim="fade"
              href="/about"
              className="group mt-10 inline-flex items-center gap-2 border-b-2 border-up-ink pb-1 text-sm font-bold uppercase tracking-[0.14em] text-up-ink transition-colors hover:border-up-accent hover:text-up-accent"
            >
              The full story of the institute
              <Icon
                name="arrowRight"
                size={15}
                className="transition-transform group-hover:translate-x-1.5"
              />
            </Link>
          </div>
        </div>
      </section>

      <TeamWall />

      <RelatedLinks route="/about/founder" />
      <CtaBanner />
    </>
  );
}
