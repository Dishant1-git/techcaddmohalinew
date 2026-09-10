import type { Course } from "@/lib/courses";
import { contentKey } from "@/lib/coursePage";
import { mernCertificateTracks } from "@/lib/content/mernCertificate";
import { dataScienceCertificateTracks } from "@/lib/content/dataScienceCertificate";
import { agenticAiCertificateTracks } from "@/lib/content/agenticAiCertificate";
import { cyberSecurityCertificateTracks } from "@/lib/content/cyberSecurityCertificate";
import { basicComputerOfficeSkillsTracks } from "@/lib/content/basicComputerOfficeSkills";

/**
 * The three lengths a certificate programme can be taken at.
 *
 * Every course in the catalogue is offered at 3, 6 or 9 months — the subject is
 * the same, the depth and the paperwork are not. The wording deliberately
 * matches `trainingPrograms` in `@/lib/courses`, so a reader who saw the
 * durations on `/training` meets the same three tiers here rather than a second,
 * differently-named set.
 *
 * Content is derived from the course record (module count, tool stack) so each
 * page states its own numbers instead of a generic blurb repeated sixteen times.
 */

export type ProgrammeTrack = {
  key: "certificate" | "internship" | "expert";
  months: string;
  /** Ribbon on the recommended tier. */
  tag?: string;
  title: string;
  blurb: string;
  /** What the holder walks away with — printed on the card's footer line. */
  award: string;
  includes: string[];
  stats: { label: string; value: string }[];
};

/**
 * Tracks written for one programme, replacing the derived three.
 *
 * Keyed the same way every written block in `@/lib/coursePage` is — by the
 * record's `contentKey` — so a menu that gave a course its own brief can name
 * its own tiers, and every course without one keeps the derived set below.
 */
const tracksByKey: Record<string, ProgrammeTrack[]> = {
  "mern-full-stack--certificate": mernCertificateTracks,
  "data-science--certificate": dataScienceCertificateTracks,
  "agentic-ai--certificate": agenticAiCertificateTracks,
  "cyber-security--certificate": cyberSecurityCertificateTracks,
  // Not three lengths but three widths: this brief is five short courses, so
  // its tiers are how many of them you take.
  "basic-computer-office-skills--certificate": basicComputerOfficeSkillsTracks,
};

export function tracksFor(course: Course): ProgrammeTrack[] {
  const written = tracksByKey[contentKey(course)];
  if (written) return written;

  const modules = course.modules.length;
  const tools = course.tools.length;
  const field = course.title;

  return [
    {
      key: "certificate",
      months: "3 Months",
      title: "Certificate",
      blurb: `The core of ${field} at working pace — the modules an employer expects you to have used, closed with one guided project.`,
      award: "ISO-certified certificate",
      includes: [
        `${Math.max(2, modules - 1)} core modules`,
        "One guided project",
        "Weekday or weekend batch",
        "Recorded sessions for life",
      ],
      stats: [
        { label: "Projects", value: "1" },
        { label: "Modules", value: String(Math.max(2, modules - 1)) },
      ],
    },
    {
      key: "internship",
      months: "6 Months",
      tag: "Most chosen",
      title: "Certificate with Internship",
      blurb: `The complete ${field} stack, then a client-style live project run to real requirements and deadlines — the version built for placement season.`,
      award: "Certificate + internship letter",
      includes: [
        `All ${modules} modules, full stack`,
        "Live project with code review",
        "Internship letter",
        "Placement file & mock interviews",
      ],
      stats: [
        { label: "Projects", value: "2" },
        { label: "Tools", value: `${tools}+` },
      ],
    },
    {
      key: "expert",
      months: "9 Months",
      title: "Expert Track",
      blurb: `${field} plus a second specialisation, with a dedicated mentor and client-level project work — our deepest programme.`,
      award: "Advanced diploma + internship letter",
      includes: [
        "Two specialisations",
        "Client-level project work",
        "A dedicated mentor",
        "Priority placement support",
      ],
      stats: [
        { label: "Projects", value: "4+" },
        { label: "Tracks", value: "2" },
      ],
    },
  ];
}
