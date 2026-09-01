import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Durations from "@/components/home/Durations";
import Process from "@/components/home/Process";
import Faq from "@/components/home/Faq";
import CtaBanner from "@/components/home/CtaBanner";
import Icon from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Industrial Training & Internship in Mohali",
  description:
    "45 days, 6 weeks, 6 months and 9 months industrial training with internship in Mohali. University-aligned, live projects, internship letter and placement assistance at techcadd Mohali.",
};

const audiences = [
  {
    icon: "certificate",
    title: "College students",
    body: "Meet your 6-week or 6-month university training requirement with documentation your department accepts — project report, attendance and a verified certificate.",
    points: ["AICTE / university aligned", "Project report & viva prep", "Attendance records"],
  },
  {
    icon: "briefcase",
    title: "Final-year & graduates",
    body: "Convert a degree into a hireable profile. Six or nine months of stack training, live project work and continuous placement drives.",
    points: ["Internship letter", "Portfolio projects", "Interview preparation"],
  },
  {
    icon: "bolt",
    title: "Working professionals",
    body: "Add a stack without leaving your job. Evening and weekend batches, recorded sessions, and modules you can take one at a time.",
    points: ["Evening & weekend slots", "Recorded sessions", "Modular pacing"],
  },
];

const deliverables = [
  { title: "Live project experience", body: "Real requirements, code review and deadlines — the part a certificate cannot fake." },
  { title: "Internship letter", body: "Issued on the 6-month and 9-month tracks, documenting your project role and duration." },
  { title: "ISO-certified certificate", body: "Recognised training certificate issued on completion of every programme." },
  { title: "Project report & viva prep", body: "For university-mandated training, prepared in the format your college expects." },
  { title: "Placement file", body: "Rebuilt resume, project write-ups and mock interview feedback, shared with hiring partners." },
  { title: "Lifetime session access", body: "Every class is recorded and stays in your student portal after the course ends." },
];

export default function TrainingPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Training" }]}
        eyebrow="Industrial training & internships"
        title="Training that your university accepts and employers respect"
        subtitle="Summer and winter industrial training, university-mandated 6-week programmes, and full 6- or 9-month tracks with internship — all taught at our Sector 75 campus in Mohali or live online."
      >
        <div data-anim="up" data-anim-delay="0.25" className="mt-10 flex flex-wrap gap-3">
          {["45 Days", "6 Weeks", "6 Months", "9 Months"].map((d) => (
            <span
              key={d}
              className="rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-up-soft backdrop-blur-sm"
            >
              {d}
            </span>
          ))}
        </div>
      </PageHero>

      <Durations />

      {/* Who it is for */}
      <section className="py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            align="center"
            eyebrow="Who joins these programmes"
            title="Three very different reasons, one workshop"
            subtitle="The batches mix college students, fresh graduates and working professionals. The project teams are better for it."
          />

          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 lg:grid-cols-3">
            {audiences.map((a) => (
              <div key={a.title} className="card-hover rounded-3xl border border-line bg-white p-8">
                <span className="grid h-13 w-13 place-items-center rounded-2xl bg-brand-50 p-3.5 text-up-accent">
                  <Icon name={a.icon} size={24} />
                </span>
                <h3 className="mt-6 text-xl font-bold text-up-ink">{a.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-up-muted">{a.body}</p>
                <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                  {a.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-sm text-up-ink/80">
                      <Icon name="check" size={14} strokeWidth={3} className="shrink-0 text-up-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Process />

      {/* Deliverables */}
      <section className="bg-subtle py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            eyebrow="What you leave with"
            title="Paperwork and proof, not just a syllabus"
            subtitle="Everything below is included in the programme fee — nothing here is a paid add-on."
          />
          <div data-anim="up" data-anim-stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deliverables.map((d, i) => (
              <div key={d.title} className="group relative overflow-hidden rounded-3xl border border-line bg-white p-7">
                <span className="absolute right-6 top-5 font-display text-4xl font-extrabold text-brand-50 transition-colors group-hover:text-brand-100">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative text-base font-bold text-up-ink">{d.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-up-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </>
  );
}
