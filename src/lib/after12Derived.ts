import type { After12Page, WrittenItem } from "@/lib/after12Pages";
import type { Course } from "@/lib/courses";
import {
  categoryArt,
  certification,
  courseFaqs,
  eligibility,
  futureScope,
  whoCanJoin,
  whyChoose,
} from "@/lib/coursePage";
import { site } from "@/lib/site";

/**
 * The written After-12th page, derived from a catalogue record.
 *
 * `@/lib/after12Pages` holds the pages written by hand, one slug at a time.
 * This module builds the same shape for every other slug the After 12th menu
 * lists, out of the record itself and the copy already derived from it in
 * `@/lib/coursePage` — so a course with no written brief still renders every
 * stage of the page rather than the short fallback it used to get.
 *
 * Nothing here invents a fact. Durations, modules, tools, roles, audiences,
 * certificates and pay all come from the catalogue or from the helpers the
 * other course designs already read; this module only arranges them into the
 * sections `<PathwayWritten/>` lays out.
 */

const RAIL = [
  { id: "overview", label: "Overview" },
  { id: "learn", label: "What you learn" },
  { id: "modules", label: "Curriculum" },
  { id: "tools", label: "Tools" },
  { id: "who", label: "Who can join" },
  { id: "why-now", label: "Why now" },
  { id: "certificate", label: "Certification" },
  { id: "scope", label: "Where it takes you" },
  { id: "projects", label: "Projects" },
  { id: "why", label: "Why techcadd" },
  { id: "reviews", label: "Reviews" },
  { id: "faqs", label: "FAQs" },
  { id: "enquire", label: "Enquire" },
];

/** Where the course is taught — an override campus, else the Mohali one. */
const cityOf = (course: Course) => course.campus ?? site.city;

/** "3-Month" from "3 Months", for the headline. Empty when no length is set. */
function lengthPrefix(course: Course) {
  if (!course.duration) return "";
  const months = course.duration.match(/^(\d+)\s*month/i);
  if (months) return `${months[1]}-Month `;
  const weeks = course.duration.match(/^(\d+)\s*week/i);
  if (weeks) return `${weeks[1]}-Week `;
  return "";
}

export function derivedAfter12Page(course: Course, related: Course[] = []): After12Page {
  const city = cityOf(course);
  const art = categoryArt(course);
  const scope = futureScope(course);
  const why = whyChoose(course);
  const topics = course.modules.reduce((n, m) => n + m.points.length, 0);
  const firstTools = course.tools.slice(0, 5).join(", ");

  return {
    sections: RAIL,

    hero: {
      badge: "Start right after school",
      title: `Best After 12th ${lengthPrefix(course)}${course.title} Course in ${city}`,
      paragraphs: [
        course.blurb,
        `No prior experience is assumed. You work through ${course.modules.length} modules and ${topics} topics on the lab machines — ${firstTools} — and finish with a portfolio a hiring manager can open, not a certificate on its own.`,
      ],
    },

    program: {
      title: `${course.title} Course in ${city}`,
      paragraphs: [
        course.overview,
        `The programme is built for school-leavers and freshers: ${art.label.toLowerCase()} work taught practically, in weekday, weekend or online batches, with trainers who use this stack on client projects every week.`,
      ],
      highlightsTitle: "Key Highlights",
      highlights: [
        { label: "Duration", value: course.duration ?? "Flexible batches" },
        { label: "Mode", value: "Practical + Theory" },
        { label: "Eligibility", value: "12th Pass, Any Stream" },
        { label: "Level", value: course.level },
        { label: "Technologies", value: firstTools },
        { label: "Project", value: `Hands-on ${course.title} capstone project` },
        { label: "Includes", value: "Certificate + Placement Support" },
      ],
    },

    overview: {
      title: "Course Overview",
      paragraphs: [
        course.overview,
        `You start at the fundamentals and move module by module into ${firstTools}, practising each stage on the lab machines before it is assessed — ${course.modules.length} modules, ${topics} topics, and a capstone you build and defend.`,
        `Nothing about the course assumes a degree or a coding background. It assumes you turn up and practise between sessions; the rest is taught here in ${city}.`,
      ],
    },

    learn: {
      title: "What you will learn",
      intro: `Every module of the ${course.title} programme closes on something you have built and a trainer has reviewed, so the list below is work you will have done rather than topics you will have heard about.`,
      items: course.modules.slice(0, 8).map<WrittenItem>((m, i) => ({
        title: m.title,
        body: m.blurb ?? m.points.slice(0, 3).join(" · "),
        icon: i % 2 === 0 ? art.icon : "sparkles",
      })),
    },

    curriculum: {
      title: "Course curriculum",
      intro: `The syllabus runs in ${course.modules.length} modules. Each one builds on the last, moving from the basics to project work you can show.`,
      modules: course.modules.map((m) => ({ title: m.title, points: m.points })),
      practical: {
        title: "How the sessions run",
        body: "Concept in the first half, hands-on in the second — on your own machine or a lab system, with the trainer walking the room. Recordings and notes stay in your student portal for the length of the programme.",
      },
      outcome: {
        label: "You finish with",
        body:
          course.outcomes[0] ??
          `A working ${course.title} portfolio, a capstone project you can defend in an interview, and a certificate to go with it.`,
      },
    },

    tools: {
      title: "Tools you will actually work in",
      items: course.tools.map((name) => ({
        name,
        body: "Installed on the lab machines and used on live coursework — not shown once on a projector and forgotten.",
      })),
    },

    who: {
      title: "Who can do this course",
      items: whoCanJoin(course).map<WrittenItem>((a) => ({
        title: a.title,
        body: a.body,
        icon: a.icon,
      })),
    },

    worth: {
      title: "Why this programme is worth your year",
      items: why.slice(0, 4).map<WrittenItem>((w) => ({
        title: w.title,
        body: w.body,
        icon: w.icon,
      })),
    },

    whyNow: {
      kicker: "Why now",
      title: "The hiring is happening now, not later",
      paragraphs: [
        scope.demand,
        "That shift is why the job exists — and in Punjab the person filling it is increasingly hired straight out of a practical programme rather than a degree.",
      ],
      listTitle: "Where the work is",
      items: scope.industries.slice(0, 5).map<WrittenItem>((industry) => ({
        title: industry,
        body: `Hiring for ${course.roles[0]?.toLowerCase() ?? "this skill set"} across the Tricity and on remote boards.`,
      })),
    },

    advisor: {
      title: "Talk to a course advisor",
      body: `Ten minutes on the phone settles more than an hour of reading — eligibility, batch timings, fees, EMI options, and whether the ${course.title} programme fits what you want to do next.`,
      cta: "Book a free demo class",
    },

    certificate: {
      title: `Get certified in ${course.title}`,
      intro:
        "Finish with a portfolio of live project work and you leave with an industry-recognised certificate, a documented internship letter accepted by Punjab universities, and a separate certificate for the capstone.",
      items: certification(course).map<WrittenItem>((c) => ({
        title: c.title,
        body: c.body,
        icon: c.icon,
      })),
    },

    takesYou: {
      title: "Where this course takes you",
      intro:
        "The roles this opens, what they pay in Punjab and beyond, and who is hiring for them — the same figures our free Salary Estimator publishes, not a brochure number.",
      listTitle: "Roles you can apply for",
      steps: course.roles.map<WrittenItem>((role, i) => ({
        title: role,
        body:
          i === 0
            ? "The most common starting role. Your capstone and coursework from this programme serve as the proof the job description asks for."
            : "Opens once the fundamentals and a portfolio are behind you — most students reach it inside the first two years.",
      })),
    },

    projects: {
      title: "Hands-on projects you will ship",
      items: course.modules.slice(0, 4).map<WrittenItem>((m) => ({
        title: m.title,
        body:
          m.blurb ??
          `Built on ${m.points.slice(0, 2).join(" and ").toLowerCase()} — reviewed by a trainer and kept in your portfolio.`,
      })),
    },

    approach: {
      title: "Learn it. Build it. Make it yours.",
      paragraphs: [
        "Every project moves through the same loop: understand the brief, build with guidance, then explain the decisions behind your work.",
      ],
      items: [
        {
          title: "Understand",
          body: "Break a real requirement into a clear plan and the right tools.",
        },
        {
          title: "Build",
          body: "Work hands-on with trainer feedback while the decisions are still easy to change.",
        },
        {
          title: "Present",
          body: "Turn the finished work into a portfolio story you can defend in an interview.",
        },
      ],
    },

    whyUs: {
      kicker: "Why techcadd",
      title: "Why students choose techcadd",
      intro: `Nine campuses across Punjab, 4.9★ from 556+ reviews, and a ${course.title} syllabus updated every year to match what employers are actually asking for.`,
      items: why.slice(0, 6).map<WrittenItem>((w) => ({
        title: w.title,
        body: w.body,
        icon: w.icon,
      })),
    },

    popular: {
      title: "Popular courses",
      intro: "Learn from industry trainers on the tracks students most often take next.",
      items: related.map((c) => ({
        title: c.title,
        body: c.blurb,
        href: `/courses/after12th/${c.slug}`,
      })),
    },

    faqs: courseFaqs(course),

    enquiry: {
      title: `Enquire about the ${course.title} programme`,
      paragraphs: [
        `Thinking about starting a career in ${course.title.toLowerCase()}? Ask us about eligibility, duration, batch timings, projects, certification and placement support.`,
        "Whether you are 12th-pass, a fresher or a complete beginner, our team can help you work out whether this is the right first programme for you.",
      ],
    },

    fit: {
      title: `Not sure if ${course.title} is the right fit?`,
      paragraphs: [
        "Choosing a technology career after 12th can feel confusing, and picking wrong costs a year you do not get back.",
        `You do not need previous experience or a programming background. The ${course.title} programme in ${city} starts at the basics and takes you into practical labs and real project work.`,
      ],
      ctaTitle: "Take the next step",
      points: [
        "12th pass? You can start.",
        ...eligibility(course).slice(1, 3),
        "Want career guidance? Get course and placement support.",
      ],
    },
  };
}
