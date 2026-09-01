import Link from "next/link";
import Icon from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-hero-950 pt-[7rem] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_20%,#123285_0%,transparent_60%)]" />
      <div className="absolute inset-0 grid-lines" />
      <div className="glow-blob left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 animate-pulse-glow bg-accent-glow/20" />

      <div className="container-x relative text-center">
        <p className="font-display text-[6rem] font-extrabold leading-none text-white/10 sm:text-[10rem]">
          404
        </p>
        <h1 className="-mt-6 font-display text-3xl font-extrabold sm:text-4xl">
          That page is not on the syllabus
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-up-soft/75">
          The link may be old or mistyped. Try the course catalogue, or tell a counsellor what
          you were looking for.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-hero-900 transition-transform hover:-translate-y-0.5"
          >
            Back to home
            <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Browse courses
          </Link>
        </div>
      </div>
    </section>
  );
}
