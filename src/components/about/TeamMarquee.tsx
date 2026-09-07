import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { team } from "@/lib/team";

function TeamCard({ member, hidden = false }: { member: (typeof team)[number]; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : 0}
      className="group relative h-[300px] w-[168px] shrink-0 overflow-hidden rounded-[84px] border border-white/15 bg-white/5 outline-none transition-[width,border-radius,border-color] duration-500 ease-out hover:w-[228px] hover:rounded-[32px] hover:border-white/35 focus:w-[228px] focus:rounded-[32px] focus:border-white/35 focus-visible:ring-2 focus-visible:ring-accent-glow/70 sm:h-[350px] sm:w-[196px] sm:rounded-[98px] sm:hover:w-[268px] sm:hover:rounded-[36px] sm:focus:w-[268px] sm:focus:rounded-[36px] lg:h-[400px] lg:w-[220px] lg:rounded-[110px] lg:hover:w-[310px] lg:hover:rounded-[40px] lg:focus:w-[310px] lg:focus:rounded-[40px]"
    >
      <Image
        src={member.photo}
        alt={hidden ? "" : member.name}
        fill
        sizes="(min-width: 1024px) 310px, (min-width: 640px) 268px, 228px"
        className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-hero-950/85 via-hero-950/25 to-hero-950/40" />
      <div className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center">
        <h3 className="truncate font-display text-sm font-bold text-white">{member.name}</h3>
        <span aria-hidden className="mx-auto mt-2 block h-px w-8 bg-accent-glow" />
        <p className="mt-2 truncate text-[0.68rem] text-white/75">{member.role}</p>
      </div>
    </article>
  );
}

export default function TeamMarquee() {
  return (
    <section className="relative overflow-hidden bg-hero-950 py-20 text-white lg:py-28">
      <div className="absolute inset-0 grid-lines opacity-40" />
      <div className="glow-blob -left-32 -top-40 h-[38rem] w-[38rem] bg-brand-600/25" />
      <div className="glow-blob -bottom-44 -right-40 h-[34rem] w-[34rem] bg-accent-glow/15" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p
              data-anim="fade"
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md"
            >
              <Icon name="users" size={14} /> Our Team
            </p>
            <h2 data-anim="words" className="mt-6 font-display text-3xl font-extrabold leading-[1.1] sm:text-4xl lg:text-5xl">
              Meet the people who teach here
            </h2>
            <p data-anim="up" data-anim-delay="0.1" className="mt-5 text-base leading-relaxed text-white/70 lg:text-lg">
              Trainers, mentors and counsellors who keep the classrooms running and the students
              moving.
            </p>
          </div>

          <Link
            href="/contact"
            className="group inline-flex shrink-0 items-center gap-3 self-start rounded-full bg-white py-2 pr-2 pl-7 text-sm font-semibold text-hero-900 transition-colors duration-300 hover:bg-brand-50 lg:self-auto"
          >
            Talk to a counsellor
            <span className="grid h-8 w-8 place-items-center rounded-full bg-up-accent text-white transition-transform duration-300 group-hover:translate-x-0.5">
              <Icon name="arrowRight" size={16} />
            </span>
          </Link>
        </div>
      </div>

      <div className="group/track relative mt-10 lg:mt-14">
        <span className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-hero-950 to-transparent sm:w-28" />
        <span className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-hero-950 to-transparent sm:w-28" />

        <div className="flex overflow-hidden">
          <div className="flex w-max gap-4 pl-4 [animation:marquee_55s_linear_infinite] group-hover/track:[animation-play-state:paused] sm:gap-5 lg:gap-6">
            {team.map((m, i) => (
              <TeamCard key={`a-${m.name}-${i}`} member={m} />
            ))}
            {team.map((m, i) => (
              <TeamCard key={`b-${m.name}-${i}`} member={m} hidden />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
