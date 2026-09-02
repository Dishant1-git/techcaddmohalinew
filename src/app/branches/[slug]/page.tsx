import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";
import { site } from "@/lib/site";
import { branches, getBranch, headOffice } from "@/lib/branches";

const branchCourses = [
  { title: "Artificial Intelligence & Machine Learning", href: "/courses/artificial-intelligence" },
  { title: "Data Science & Analytics", href: "/courses/data-science" },
  { title: "Full-Stack Web Development", href: "/courses/mern-full-stack" },
  { title: "Python Programming", href: "/courses/python-programming" },
  { title: "Digital Marketing & SEO", href: "/courses/digital-marketing" },
  { title: "Cybersecurity & Ethical Hacking", href: "/courses/cyber-security" },
  { title: "Cloud Computing & DevOps", href: "/courses/cloud-computing" },
  { title: "Web Designing & UI", href: "/courses/web-designing" },
];

const studentBenefits = [
  {
    title: "The same syllabus everywhere",
    body: "A branch is not a lighter version of the centre. The syllabus, the project requirement and the assessment are the ones written at Jalandhar, so a certificate means the same thing whichever centre issues it.",
  },
  {
    title: "Practitioners, not lecturers",
    body: "Trainers stay on live delivery work instead of moving into full-time teaching, which is why the examples in class come from this quarter's work rather than a textbook edition.",
  },
  {
    title: "Work an employer can open",
    body: "Every course ends in something inspectable — a deployed site, a repository, a dashboard, a campaign with real spend behind it. Marks are not evidence; the work is.",
  },
  {
    title: "Batches that fit a working week",
    body: "Morning, evening and weekend batches, with the weekend slots kept for students already in a job or finishing a degree elsewhere.",
  },
  {
    title: "Internship letters that stand up",
    body: "Six-week and six-month industrial training carry documentation a university or an employer can verify, because the project behind them was real.",
  },
  {
    title: "Placement support that repeats",
    body: "CV reviews, mock interviews and hiring drives run again after a rejection rather than abandoned. No training provider can honestly guarantee a job; be careful of anyone who claims one.",
  },
];

export function generateStaticParams() {
  return branches.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) return { title: "Branch not found" };
  return {
    title: `techcadd ${branch.name}`,
    description: `${branch.intro} Courses, timings and contact details for the techcadd ${branch.name} centre.`,
  };
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const branch = getBranch(slug);
  if (!branch) notFound();

  const otherBranches = [
    { slug: "mohali", name: "Mohali", href: "/" },
    ...branches
      .filter((b) => b.slug !== branch.slug)
      .map((b) => ({ slug: b.slug, name: b.name, href: `/branches/${b.slug}` })),
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Branches", href: "/contact" }, { label: branch.name }]}
        title={`techcadd ${branch.name}`}
        subtitle={branch.tagline}
      >
        <p
          data-anim="up"
          data-anim-delay="0.2"
          className="mt-6 max-w-2xl text-base leading-relaxed text-up-soft/80"
        >
          {branch.intro}
        </p>
        <div data-anim="fade" data-anim-delay="0.3" className="mt-9 flex flex-wrap items-center gap-4">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-hero-900 shadow-xl transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            Book a free demo class
            <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/5"
          >
            <Icon name="phone" size={16} /> Call {site.phone}
          </a>
        </div>
      </PageHero>

      {/* Courses */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            title={`Courses at the ${branch.name} centre`}
            subtitle={`Every course below runs at ${branch.name} in morning, evening and weekend batches. Syllabus, project work and certification are the same at every techcadd centre.`}
          />
          <div data-anim="up" data-anim-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {branchCourses.map((c) => (
              <div key={c.title} className="card-hover rounded-2xl border border-line bg-white p-6">
                <p className="text-sm font-bold leading-snug text-up-ink">{c.title}</p>
                <Link
                  href={c.href}
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent"
                >
                  View syllabus
                  <Icon name="arrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
          <Link
            href="/courses"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-up-accent hover:underline"
          >
            View all courses
            <Icon name="arrowRight" size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* What students get */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading title={`What ${branch.name} students get`} />
          <div data-anim="up" data-anim-stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studentBenefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-line bg-white p-6">
                <p className="text-sm font-bold text-up-ink">{b.title}</p>
                <p className="mt-2.5 text-sm leading-relaxed text-up-muted">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1fr_22rem] lg:gap-14">
            <div>
              <SectionHeading title={`Visit the ${branch.name} centre`} />
              <dl data-anim="up" data-anim-stagger className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">Phone</dt>
                  <dd className="mt-1.5">
                    <a href={site.phoneHref} className="text-sm font-semibold text-up-ink hover:text-up-accent">
                      {site.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">Email</dt>
                  <dd className="mt-1.5">
                    <a href={site.emailHref} className="text-sm font-semibold text-up-ink hover:text-up-accent">
                      {site.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">Timings</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-up-ink">{site.hours}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">Areas served</dt>
                  <dd className="mt-1.5 text-sm font-semibold text-up-ink">{branch.areasServed.join(" · ")}</dd>
                </div>
              </dl>
              <Link
                href="/contact"
                className="group mt-9 inline-flex items-center gap-2 rounded-full bg-hero-950 px-7 py-3.5 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-hero-900"
              >
                Enquire about {branch.name} batches
              </Link>
            </div>

            <div
              data-anim="up"
              data-anim-delay="0.15"
              className="h-fit rounded-[1.75rem] border border-line bg-subtle p-7"
            >
              {branch.isHeadOffice ? (
                <>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-up-accent">Head office</p>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-up-ink">
                    This is the flagship campus
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-up-muted">
                    {headOffice.address.line1}, {headOffice.address.line2}, {headOffice.address.line3}. Every
                    other centre&apos;s curriculum, trainer standards and counsellor training trace back here.
                  </p>
                </>
              ) : (
                <>
                  <p className="font-display text-base font-extrabold text-up-ink">Head office — Jalandhar</p>
                  <p className="mt-3 text-sm leading-relaxed text-up-muted">
                    {headOffice.address.line1}, {headOffice.address.line2}, {headOffice.address.line3}.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-up-muted">
                    Counsellors at head office handle enquiries for every centre, so a call to {site.phone}{" "}
                    reaches the {branch.name} team as well.
                  </p>
                </>
              )}
              <a
                href={headOffice.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-up-accent"
              >
                Open the Jalandhar campus in Maps
                <Icon
                  name="arrowUpRight"
                  size={14}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Other centres */}
      <section className="pb-24 lg:pb-32">
        <div className="container-x">
          <h3 className="font-display text-xl font-extrabold text-up-ink">Other techcadd centres</h3>
          <div data-anim="up" data-anim-stagger className="mt-6 flex flex-wrap gap-3">
            {otherBranches.map((b) => (
              <Link
                key={b.slug}
                href={b.href}
                className="rounded-full border border-up-line bg-white px-5 py-2.5 text-sm font-semibold text-up-ink transition-all hover:-translate-y-0.5 hover:border-up-accent hover:text-up-accent"
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
