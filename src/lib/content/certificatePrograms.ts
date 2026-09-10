import { courses, getCourse, type Course } from "@/lib/courses";
import { withOverride, withOverrides, type CourseOverrides } from "@/lib/content/overrides";
import { mernCertificateOverride } from "@/lib/content/mernCertificate";
import { dataScienceCertificateOverride } from "@/lib/content/dataScienceCertificate";
import { agenticAiCertificateOverride } from "@/lib/content/agenticAiCertificate";
import { cyberSecurityCertificateOverride } from "@/lib/content/cyberSecurityCertificate";
import { basicComputerOfficeSkillsCourse } from "@/lib/content/basicComputerOfficeSkills";

/**
 * Content for the Certificate Programs menu, behind
 * `/courses/certificate-programs/[slug]`.
 *
 * The route is the credential presentation of the same catalogue records the
 * other menus use, so this module names the twelve slugs the menu lists and
 * fetches the records by slug. Nothing is copied.
 *
 * Slugs are listed in menu order, matching the Certificate Programs panel in
 * `@/lib/site`.
 */
export const certificateSlugs = [
  "cloud-computing",
  "mern-full-stack",
  "artificial-intelligence",
  "generative-ai",
  "digital-marketing",
  "data-analytics",
  "data-science",
  "cyber-security",
  "python-programming",
  "web-designing",
  "ethical-hacking",
  "autocad",
  // The menu's own track of five short office courses — a record this menu
  // carries alone, not a catalogue course. See `certificateExclusiveCourses`.
  "basic-computer-office-skills",
];

/**
 * Courses that belong to the Certificate Programs menu alone and are not in
 * the catalogue.
 *
 * `/courses/certificate-programs/[slug]` serves these in addition to the
 * catalogue records the menu lists, so this menu can carry a programme the
 * other three menus never show.
 */
export const certificateExclusiveCourses: Course[] = [basicComputerOfficeSkillsCourse];

/**
 * What this menu says differently about a course the other menus also list.
 *
 * All twelve slugs above are catalogue courses the Courses menu lists too, so
 * by default `/courses/certificate-programs/data-science` and
 * `/courses/course/data-science` say the same things in two designs. An entry
 * here changes that for this route only: the fields it names are merged over
 * the catalogue record — a credential-facing overview, an outcome list written
 * around what the certificate attests — and the other menus are untouched.
 *
 * See `@/lib/content/overrides` for the merge and for what `contentKey` does —
 * in short, add one when this menu's version of a course should also get its
 * own FAQs, reviews, why-choose cards and SEO rather than inherit the ones
 * written for the catalogue slug in `@/lib/coursePage`.
 */
export const certificateOverrides: CourseOverrides = {
  /**
   * MERN and Data Science are the courses this menu has been written its own
   * briefs for — their own hero lines, their own three named tracks, a
   * stage-based syllabus and a documented internship letter as the headline
   * credential. The `contentKey` each override carries is what switches every
   * written block in `@/lib/coursePage` over to it, and what
   * `@/lib/certificateWritten` keys the extra sections on; the Courses, AI and
   * After 12th menus keep the catalogue copy at their own URLs.
   */
  "mern-full-stack": mernCertificateOverride,
  "data-science": dataScienceCertificateOverride,
  "cyber-security": cyberSecurityCertificateOverride,

  /**
   * Agentic AI is the one written brief here for a course this menu does not
   * list in `certificateSlugs` — it sits in the AI menu. The route prerenders
   * every course, so `/courses/certificate-programs/agentic-ai` resolves and
   * now renders this brief; add the slug above if the menu should link to it
   * as well.
   */
  "agentic-ai": agenticAiCertificateOverride,
};

/** The records behind those links, fetched from the catalogue by slug. */
export const certificateCourses: Course[] = certificateSlugs
  .map((slug) => certificateCourse(slug))
  .filter((c): c is Course => Boolean(c));

/** True when a course is one the Certificate Programs menu lists. */
export const isCertificateCourse = (slug: string) => certificateSlugs.includes(slug);

/**
 * The record a page renders, by slug.
 *
 * Falls back to the full catalogue on purpose. The route prerenders every
 * course, not only the twelve the menu features, so a certificate URL that
 * resolves today keeps resolving.
 */
export function certificateCourse(slug: string): Course | undefined {
  const base =
    certificateExclusiveCourses.find((c) => c.slug === slug) ?? getCourse(slug);
  return withOverride(base, certificateOverrides[slug]);
}

/**
 * Every course `/courses/certificate-programs/[slug]` serves, unchanged — for
 * generateStaticParams.
 */
export const certificateRouteCourses = [
  ...withOverrides(courses, certificateOverrides),
  ...certificateExclusiveCourses,
];
