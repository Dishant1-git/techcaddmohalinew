import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import QuickCallbackBar from "@/components/tools/QuickCallbackBar";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "College Partnerships",
  description:
    "Workshops, mandated industrial training, faculty development and joint placement drives, run with your college or university departments and on your timetable.",
};

const stats = [
  { v: "2016", l: "Working with institutions since" },
  { v: "10,000+", l: "Students trained" },
  { v: "50+", l: "Courses and tracks" },
  { v: "6", l: "Partnership formats" },
];

const leftInstitutions = [
  { name: "RIMT University, Mandi Gobindgarh", src: "/partners/RIMT-gobindgarh-clean.png" },
  { name: "Sant Baba Bhag Singh University, Khiala, Jalandhar", src: "/partners/Sbbsu-hsp.png" },
  { name: "Chandigarh Group of Colleges, Landran", src: "/partners/cgc-landran.png" },
  { name: "Lyallpur Khalsa College Technical Campus, Jalandhar", src: "/partners/lkctc-jal-clean.png" },
  { name: "KMV College, Jalandhar", src: "/partners/kmv-jal-clean.png" },
  { name: "Trinity Institute of Management and Technology, Jalandhar", src: "/partners/trinity-jal.png" },
  { name: "Amritsar Group of Colleges, Amritsar", src: "/partners/amritsar-group-of-colleges-clean.png" },
];
// Outer column (farther from the centre mark) alternates with the inner column
// (closer to it), which is what makes the two columns nest into a honeycomb.
const leftOuter = leftInstitutions.filter((_, i) => i % 2 === 0);
const leftInner = leftInstitutions.filter((_, i) => i % 2 === 1);

const rightInstitutions = [
  { name: "Doaba Group of Colleges, Kharar", src: "/partners/doaba-group-kharar-clean.png" },
  { name: "Universal Group of Institutions, Lalru", src: "/partners/universal-group-of-institutes-lalru-clean.png" },
  { name: "Ram Devi Jindal Group of Institutions, Bassi", src: "/partners/RDJ-bassi.png" },
  { name: "Pyramid College of Business & Technology, Phagwara", src: "/partners/pyramid-clean.png" },
  { name: "Shree Hanumat Institute of Management and Technology, Phagwara", src: "/partners/shimt-phg-transparent.png" },
  { name: "Shri Guru Nanak Dev Academy, Jhunir, Mansa", src: "/partners/GuruNanak-Mansa.png" },
];
const rightInner = rightInstitutions.filter((_, i) => i % 2 === 0);
const rightOuter = rightInstitutions.filter((_, i) => i % 2 === 1);

const programmes = [
  {
    icon: "megaphone",
    title: "Campus Workshops",
    body: "Hands-on sessions on AI, robotics, cyber security and emerging tools, run on your campus and sized to a single department or a whole year group.",
  },
  {
    icon: "cube",
    title: "Industrial Training",
    body: "45-day, 6-week and 6-month programmes mapped to university training requirements, so a batch completes its mandated hours without a timetable clash.",
  },
  {
    icon: "briefcase",
    title: "Placement Drives",
    body: "Joint drives and pre-placement talks with the employers who recruit from us, hosted on your campus or at the Jalandhar centre.",
  },
  {
    icon: "users",
    title: "Faculty Development",
    body: "Short programmes that bring teaching staff up to date on the stacks their students will be interviewed on: cloud, data and modern web tooling.",
  },
  {
    icon: "layers",
    title: "Lab & Curriculum Support",
    body: "Help specifying a teaching lab and aligning elective content with what hiring managers currently ask for, rather than what the syllabus was written against.",
  },
  {
    icon: "certificate",
    title: "Certification",
    body: "Completion certificates and internship letters issued in the format your university requires, for every student who finishes a programme.",
  },
];

const steps = [
  {
    n: "01",
    title: "Introductory call",
    body: "A short conversation about your departments, student numbers and where the gap between syllabus and industry is widest.",
  },
  {
    n: "02",
    title: "Proposal",
    body: "A written plan covering scope, duration, delivery mode and cost. Nothing starts on a handshake.",
  },
  {
    n: "03",
    title: "Pilot batch",
    body: "One cohort or one workshop first, so both sides can judge the fit before committing to a longer arrangement.",
  },
  {
    n: "04",
    title: "Ongoing programme",
    body: "A rolling schedule across semesters, with placement activity attached to the students who complete it.",
  },
];

function Hex({ src, name, big = false }: { src?: string; name: string; big?: boolean }) {
  return (
    <span
      title={name}
      className={`grid shrink-0 place-items-center transition-transform duration-300 hover:scale-[1.06] ${
        big
          ? "h-40 w-40 bg-gradient-to-br from-hero-800 via-hero-600 to-hero-glow shadow-[0_30px_70px_-20px_rgba(28,83,209,0.55)] sm:h-52 sm:w-52"
          : "h-16 w-16 bg-white shadow-[0_16px_30px_-18px_rgba(11,26,77,0.3)] ring-1 ring-line sm:h-20 sm:w-20"
      }`}
      style={{ clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" }}
    >
      {big ? (
        <span className="font-display text-4xl font-bold text-white sm:text-5xl">t</span>
      ) : (
        <Image
          src={src!}
          alt={name}
          width={200}
          height={130}
          className="h-auto max-h-[54%] w-auto max-w-[62%] object-contain"
        />
      )}
    </span>
  );
}

export default function CollegePartnershipsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "College Partnerships" }]}
        eyebrow="College Partnerships"
        title={
          <>
            <span className="text-white/45">Bringing </span>industry practice
            <br />
            <span className="text-white/45">onto your </span>campus.
          </>
        }
        subtitle="Workshops, mandated industrial training, faculty development and joint placement drives, run with your departments and on your timetable."
      >
        <dl data-anim="up" data-anim-delay="0.25" className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="relative flex flex-col-reverse pl-5">
              <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 rounded-full bg-gradient-to-b from-accent-glow to-brand-700" />
              <dt className="mt-2 text-sm text-up-soft/70">{s.l}</dt>
              <dd className="font-display text-3xl font-extrabold leading-none text-white lg:text-4xl">{s.v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Institutions we work with */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <div className="rounded-[2rem] bg-gradient-to-b from-brand-50/70 via-subtle to-subtle px-6 py-14 sm:px-10 lg:px-16 lg:py-20">
            <SectionHeading
              align="center"
              eyebrow="Institutions we work with"
              title="Colleges and universities across Punjab"
              subtitle="Workshops, industrial training and placement activity run with departments at institutions from Amritsar and Jalandhar down to Landran, Kharar and Lalru."
            />

            <div
              data-anim="up"
              className="mt-14 flex flex-wrap items-start justify-center gap-x-1 gap-y-6 overflow-x-auto sm:gap-x-2"
            >
              {/* Left: outer column normal, inner column nudged toward the centre mark and dropped half a hex to interlock. */}
              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {leftOuter.map((inst) => (
                    <Hex key={inst.name} src={inst.src} name={inst.name} />
                  ))}
                </div>
                <div className="-ml-3 mt-9 flex flex-col gap-1.5 sm:-ml-4 sm:mt-11 sm:gap-2">
                  {leftInner.map((inst) => (
                    <Hex key={inst.name} src={inst.src} name={inst.name} />
                  ))}
                </div>
              </div>

              <Hex big name="techcadd" />

              {/* Right: mirror of the left — inner column first (dropped half a hex), outer column normal. */}
              <div className="flex items-start gap-1.5 sm:gap-2">
                <div className="-mr-3 mt-9 flex flex-col gap-1.5 sm:-mr-4 sm:mt-11 sm:gap-2">
                  {rightInner.map((inst) => (
                    <Hex key={inst.name} src={inst.src} name={inst.name} />
                  ))}
                </div>
                <div className="flex flex-col gap-1.5 sm:gap-2">
                  {rightOuter.map((inst) => (
                    <Hex key={inst.name} src={inst.src} name={inst.name} />
                  ))}
                </div>
              </div>
            </div>

            <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-up-muted">
              {[...leftInstitutions, ...rightInstitutions].map((i) => i.name).join(" · ")}
            </p>
          </div>
        </div>
      </section>

      {/* What we run */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="What we run"
            title="Six ways we work with institutions"
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p) => (
              <div key={p.title} className="card-hover rounded-3xl border border-line bg-white p-8">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-up-accent text-white">
                  <Icon name={p.icon} size={20} />
                </span>
                <h3 className="mt-5 text-base font-bold text-up-ink">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="How it works"
            title="From first call to a running programme"
          />

          <div data-anim="up" data-anim-stagger className="relative mt-16">
            <span aria-hidden className="absolute inset-x-0 top-5 hidden h-px bg-line sm:block" />
            <div className="relative grid gap-10 sm:grid-cols-4">
              {steps.map((s) => (
                <div key={s.n}>
                  <span className="relative z-10 grid h-10 w-10 place-items-center rounded-full bg-hero-950 font-display text-sm font-bold text-white">
                    {s.n}
                  </span>
                  <h3 className="mt-5 text-base font-bold text-up-ink">{s.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partner with us */}
      <section className="py-20 lg:py-24">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Partner with us"
            title="Tell us what your students need next."
            subtitle="Send us your department, student numbers and the semester you are planning for, and we will come back with a written proposal covering scope, duration, delivery mode and cost."
          >
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 rounded-full bg-up-accent px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                <Icon name="phone" size={16} /> Call {site.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-up-line px-7 py-3.5 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
              >
                Send an enquiry
              </Link>
            </div>
          </SectionHeading>
        </div>
      </section>

      <QuickCallbackBar />
      <CtaBanner />
    </>
  );
}
