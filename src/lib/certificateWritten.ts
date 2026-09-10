import type { Course } from "@/lib/courses";
import { contentKey } from "@/lib/coursePage";
import {
  mernCertificateCertification,
  mernCertificateClosing,
  mernCertificateComparison,
  mernCertificateHeadings,
  mernCertificateHero,
  mernCertificateInstitute,
  mernCertificateModes,
  mernCertificateProjects,
  mernCertificateScope,
  mernCertificateSections,
  type WrittenCertificateHero,
  type WrittenHeading,
} from "@/lib/content/mernCertificate";
import {
  dataScienceCertificateCertification,
  dataScienceCertificateClosing,
  dataScienceCertificateHeadings,
  dataScienceCertificateHero,
  dataScienceCertificateInstitute,
  dataScienceCertificateModes,
  dataScienceCertificateProjects,
  dataScienceCertificateScope,
  dataScienceCertificateSections,
} from "@/lib/content/dataScienceCertificate";
import {
  agenticAiCertificateCertification,
  agenticAiCertificateClosing,
  agenticAiCertificateHeadings,
  agenticAiCertificateHero,
  agenticAiCertificateInstitute,
  agenticAiCertificateModes,
  agenticAiCertificateProjects,
  agenticAiCertificateScope,
  agenticAiCertificateSections,
} from "@/lib/content/agenticAiCertificate";
import {
  cyberSecurityCertificateCertification,
  cyberSecurityCertificateClosing,
  cyberSecurityCertificateHeadings,
  cyberSecurityCertificateHero,
  cyberSecurityCertificateInstitute,
  cyberSecurityCertificateModes,
  cyberSecurityCertificateProjects,
  cyberSecurityCertificateScope,
  cyberSecurityCertificateSections,
} from "@/lib/content/cyberSecurityCertificate";
import {
  cloudComputingCertificateCertification,
  cloudComputingCertificateClosing,
  cloudComputingCertificateHeadings,
  cloudComputingCertificateHero,
  cloudComputingCertificateInstitute,
  cloudComputingCertificateModes,
  cloudComputingCertificateProjects,
  cloudComputingCertificateScope,
  cloudComputingCertificateSections,
} from "@/lib/content/cloudComputingCertificate";
import {
  digitalMarketingCertificateCertification,
  digitalMarketingCertificateClosing,
  digitalMarketingCertificateHeadings,
  digitalMarketingCertificateHero,
  digitalMarketingCertificateInstitute,
  digitalMarketingCertificateModes,
  digitalMarketingCertificateProjects,
  digitalMarketingCertificateScope,
  digitalMarketingCertificateSections,
} from "@/lib/content/digitalMarketingCertificate";
import {
  artificialIntelligenceCertificateCertification,
  artificialIntelligenceCertificateClosing,
  artificialIntelligenceCertificateHeadings,
  artificialIntelligenceCertificateHero,
  artificialIntelligenceCertificateInstitute,
  artificialIntelligenceCertificateModes,
  artificialIntelligenceCertificateProjects,
  artificialIntelligenceCertificateScope,
  artificialIntelligenceCertificateSections,
} from "@/lib/content/artificialIntelligenceCertificate";
import {
  dataAnalyticsCertificateCertification,
  dataAnalyticsCertificateClosing,
  dataAnalyticsCertificateHeadings,
  dataAnalyticsCertificateHero,
  dataAnalyticsCertificateInstitute,
  dataAnalyticsCertificateModes,
  dataAnalyticsCertificateProjects,
  dataAnalyticsCertificateScope,
  dataAnalyticsCertificateSections,
} from "@/lib/content/dataAnalyticsCertificate";
import {
  fullStackDevelopmentCertificateCertification,
  fullStackDevelopmentCertificateClosing,
  fullStackDevelopmentCertificateHeadings,
  fullStackDevelopmentCertificateHero,
  fullStackDevelopmentCertificateInstitute,
  fullStackDevelopmentCertificateModes,
  fullStackDevelopmentCertificateProjects,
  fullStackDevelopmentCertificateScope,
  fullStackDevelopmentCertificateSections,
} from "@/lib/content/fullStackDevelopmentCertificate";
import {
  flutterCertificateCertification,
  flutterCertificateClosing,
  flutterCertificateHeadings,
  flutterCertificateHero,
  flutterCertificateInstitute,
  flutterCertificateModes,
  flutterCertificateProjects,
  flutterCertificateScope,
  flutterCertificateSections,
} from "@/lib/content/flutterCertificate";
import {
  basicComputerOfficeSkillsCertification,
  basicComputerOfficeSkillsClosing,
  basicComputerOfficeSkillsHeadings,
  basicComputerOfficeSkillsHero,
  basicComputerOfficeSkillsInstitute,
  basicComputerOfficeSkillsModes,
  basicComputerOfficeSkillsProjects,
  basicComputerOfficeSkillsScope,
  basicComputerOfficeSkillsSections,
} from "@/lib/content/basicComputerOfficeSkills";

/**
 * A certificate programme written to its own brief.
 *
 * The credential design derives every section from the course record, which is
 * what fifteen of the sixteen programmes want. A programme handed a written
 * brief wants something else: its own headline, its own section titles, and
 * sections the derived design has no equivalent for — the award it hands over,
 * where the course leads, the projects that get shipped, how it compares to
 * the other institutes in town, and the ways it is taught.
 *
 * Registering a page here is what turns those on. A course with no entry
 * renders exactly what it rendered before: the same eight numbered sections,
 * derived, with nothing extra between them.
 *
 * Keyed by `contentKey`, like every other written block — so a menu that gave
 * a course its own brief gets this page at its own URL, and the same slug read
 * from another menu is untouched.
 */

export type WrittenCard = { icon: string; title: string; body: string };

export type WrittenCertificatePage = {
  /** Replaces the derived hero headline, lead, particulars and buttons. */
  hero: WrittenCertificateHero;
  /** Section headings by id — `overview`, `modules`, `learn`, and so on. */
  headings: Record<string, WrittenHeading>;
  /** The rail, in DOM order, including the sections only this page renders. */
  sections: { id: string; label: string }[];
  certification: WrittenCard[];
  scope: { q: string; a: string }[];
  projects: { label: string; title: string; body: string }[];
  institute: WrittenCard[];
  /**
   * Optional: only some briefs argue the point with a table. Without one the
   * "why this institute" section is the five differences and nothing else,
   * rather than a table invented to fill the space.
   */
  comparison?: {
    title: string;
    ours: string;
    theirs: string;
    rows: { feature: string; ours: string; theirs: string }[];
  };
  modes: WrittenCard[];
  closing: { title: string; body: string; primaryCta: string; secondaryCta: string };
};

const writtenPages: Record<string, WrittenCertificatePage> = {
  "mern-full-stack--certificate": {
    hero: mernCertificateHero,
    headings: mernCertificateHeadings,
    sections: mernCertificateSections,
    certification: mernCertificateCertification,
    scope: mernCertificateScope,
    projects: mernCertificateProjects,
    institute: mernCertificateInstitute,
    comparison: mernCertificateComparison,
    modes: mernCertificateModes,
    closing: mernCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "data-science--certificate": {
    hero: dataScienceCertificateHero,
    headings: dataScienceCertificateHeadings,
    sections: dataScienceCertificateSections,
    certification: dataScienceCertificateCertification,
    scope: dataScienceCertificateScope,
    projects: dataScienceCertificateProjects,
    institute: dataScienceCertificateInstitute,
    modes: dataScienceCertificateModes,
    closing: dataScienceCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "agentic-ai--certificate": {
    hero: agenticAiCertificateHero,
    headings: agenticAiCertificateHeadings,
    sections: agenticAiCertificateSections,
    certification: agenticAiCertificateCertification,
    scope: agenticAiCertificateScope,
    projects: agenticAiCertificateProjects,
    institute: agenticAiCertificateInstitute,
    modes: agenticAiCertificateModes,
    closing: agenticAiCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "cyber-security--certificate": {
    hero: cyberSecurityCertificateHero,
    headings: cyberSecurityCertificateHeadings,
    sections: cyberSecurityCertificateSections,
    certification: cyberSecurityCertificateCertification,
    scope: cyberSecurityCertificateScope,
    projects: cyberSecurityCertificateProjects,
    institute: cyberSecurityCertificateInstitute,
    modes: cyberSecurityCertificateModes,
    closing: cyberSecurityCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "cloud-computing--certificate": {
    hero: cloudComputingCertificateHero,
    headings: cloudComputingCertificateHeadings,
    sections: cloudComputingCertificateSections,
    certification: cloudComputingCertificateCertification,
    scope: cloudComputingCertificateScope,
    projects: cloudComputingCertificateProjects,
    institute: cloudComputingCertificateInstitute,
    modes: cloudComputingCertificateModes,
    closing: cloudComputingCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "digital-marketing--certificate": {
    hero: digitalMarketingCertificateHero,
    headings: digitalMarketingCertificateHeadings,
    sections: digitalMarketingCertificateSections,
    certification: digitalMarketingCertificateCertification,
    scope: digitalMarketingCertificateScope,
    projects: digitalMarketingCertificateProjects,
    institute: digitalMarketingCertificateInstitute,
    modes: digitalMarketingCertificateModes,
    closing: digitalMarketingCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "artificial-intelligence--certificate": {
    hero: artificialIntelligenceCertificateHero,
    headings: artificialIntelligenceCertificateHeadings,
    sections: artificialIntelligenceCertificateSections,
    certification: artificialIntelligenceCertificateCertification,
    scope: artificialIntelligenceCertificateScope,
    projects: artificialIntelligenceCertificateProjects,
    institute: artificialIntelligenceCertificateInstitute,
    modes: artificialIntelligenceCertificateModes,
    closing: artificialIntelligenceCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "flutter--certificate": {
    hero: flutterCertificateHero,
    headings: flutterCertificateHeadings,
    sections: flutterCertificateSections,
    certification: flutterCertificateCertification,
    scope: flutterCertificateScope,
    projects: flutterCertificateProjects,
    institute: flutterCertificateInstitute,
    modes: flutterCertificateModes,
    closing: flutterCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "data-analytics--certificate": {
    hero: dataAnalyticsCertificateHero,
    headings: dataAnalyticsCertificateHeadings,
    sections: dataAnalyticsCertificateSections,
    certification: dataAnalyticsCertificateCertification,
    scope: dataAnalyticsCertificateScope,
    projects: dataAnalyticsCertificateProjects,
    institute: dataAnalyticsCertificateInstitute,
    modes: dataAnalyticsCertificateModes,
    closing: dataAnalyticsCertificateClosing,
  },

  // No `comparison`: this brief argues the point in prose only.
  "full-stack-development--certificate": {
    hero: fullStackDevelopmentCertificateHero,
    headings: fullStackDevelopmentCertificateHeadings,
    sections: fullStackDevelopmentCertificateSections,
    certification: fullStackDevelopmentCertificateCertification,
    scope: fullStackDevelopmentCertificateScope,
    projects: fullStackDevelopmentCertificateProjects,
    institute: fullStackDevelopmentCertificateInstitute,
    modes: fullStackDevelopmentCertificateModes,
    closing: fullStackDevelopmentCertificateClosing,
  },

  /**
   * The one written page here for a programme that is not a catalogue course
   * at all — a track of five short office courses this menu carries alone. No
   * `comparison`: like the three above, this brief argues the point in prose.
   */
  "basic-computer-office-skills--certificate": {
    hero: basicComputerOfficeSkillsHero,
    headings: basicComputerOfficeSkillsHeadings,
    sections: basicComputerOfficeSkillsSections,
    certification: basicComputerOfficeSkillsCertification,
    scope: basicComputerOfficeSkillsScope,
    projects: basicComputerOfficeSkillsProjects,
    institute: basicComputerOfficeSkillsInstitute,
    modes: basicComputerOfficeSkillsModes,
    closing: basicComputerOfficeSkillsClosing,
  },
};

/** The written page for a course, or `undefined` when it derives its own. */
export function certificateWritten(course: Course): WrittenCertificatePage | undefined {
  return writtenPages[contentKey(course)];
}

/**
 * One section's heading, written or derived.
 *
 * Every `Cert*` section takes its heading as an optional prop and falls back to
 * the one it has always rendered, so this returns `undefined` freely — a
 * written page that names only some of its sections still gets the derived
 * heading for the rest.
 */
export function writtenHeading(
  written: WrittenCertificatePage | undefined,
  id: string,
): WrittenHeading | undefined {
  return written?.headings[id];
}
