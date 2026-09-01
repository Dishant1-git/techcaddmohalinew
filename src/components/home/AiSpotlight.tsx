import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import Icon from "@/components/ui/Icon";

const pillars = [
  {
    title: "AI Fundamentals",
    body: "Python, mathematics, machine learning and the vocabulary you need before anything else makes sense.",
    tag: "For beginners",
  },
  {
    title: "AI Development",
    body: "Deep learning, LLM applications, RAG pipelines and agents — built, evaluated and deployed.",
    tag: "For developers",
  },
  {
    title: "AI for Business",
    body: "Prompt engineering, AI-assisted marketing and analytics workflows that save teams real hours.",
    tag: "For professionals",
  },
];

export default function AiSpotlight() {
  return (
    <section className="relative overflow-hidden bg-hero-950 py-24 text-white lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_10%,#123285_0%,transparent_60%),radial-gradient(ellipse_60%_50%_at_90%_80%,#1c53d1_0%,transparent_55%)]" />
      <div className="absolute inset-0 grid-lines" />
      <div className="glow-blob left-[-5%] top-[20%] h-[400px] w-[400px] animate-pulse-glow bg-accent-glow/20" />

      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionHeading
              tone="dark"
              eyebrow="AI at techcadd Mohali"
              title={
                <>
                  The skills every job description now asks for
                </>
              }
              subtitle="Artificial intelligence stopped being a specialisation — it is becoming baseline literacy. Our AI tracks are rebuilt every quarter so what you learn matches what is shipping right now."
            />

            <div data-anim="up" data-anim-delay="0.15" className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/courses/artificial-intelligence"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-glow to-hero-glow px-7 py-3.5 text-sm font-bold text-hero-950 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-accent-glow/30"
              >
                Explore AI courses
                <Icon name="arrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
              >
                Talk to a counsellor
              </Link>
            </div>
          </div>

          <div data-anim="right" data-anim-stagger className="space-y-4">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500 hover:border-accent-glow/40 hover:bg-white/[0.08]"
              >
                <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-gradient-to-b from-accent-glow to-hero-glow transition-transform duration-500 group-hover:scale-y-100" />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-accent-yellow">
                      {p.tag}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">{p.title}</h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-up-soft/70">{p.body}</p>
                  </div>
                  <span className="font-display text-3xl font-extrabold text-white/10 transition-colors group-hover:text-accent-glow/30">
                    0{i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
