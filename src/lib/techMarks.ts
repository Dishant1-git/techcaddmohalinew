import type { Course } from "@/lib/courses";

/**
 * Maps a tool name from the course catalogue onto a <TechMark/> brand mark.
 *
 * `TechMark` silently falls back to the React logo for a name it does not
 * know, which would put the wrong logo beside a tool — so callers must check
 * here first and render plain text when there is no match. Coverage is
 * deliberately partial: only the marks that have actually been drawn.
 */

const BY_NORMALISED: Record<string, string> = {
  react: "react",
  python: "python",
  node: "node",
  nodejs: "node",
  express: "node",
  mongodb: "mongodb",
  mongo: "mongodb",
  tensorflow: "tensorflow",
  pytorch: "pytorch",
  docker: "docker",
  kubernetes: "kubernetes",
  figma: "figma",
  tailwind: "tailwind",
  tailwindcss: "tailwind",
  pandas: "pandas",
  jupyter: "jupyter",
  jupyternotebook: "jupyter",
  git: "git",
  github: "git",
  powerbi: "powerbi",
  tableau: "tableau",
};

const normalise = (tool: string) => tool.toLowerCase().replace(/[^a-z0-9]/g, "");

/** The brand mark for a tool, or undefined when none has been drawn for it. */
export function techMarkFor(tool: string): string | undefined {
  return BY_NORMALISED[normalise(tool)];
}

/**
 * The distinct brand marks a course's tool list can show, in catalogue order.
 *
 * Several courses (CAD, cyber security, marketing) match nothing at all, so
 * anything built on this has to look right with an empty array.
 */
export function courseMarks(course: Course, limit = 6): string[] {
  const seen = new Set<string>();

  for (const tool of course.tools) {
    const mark = techMarkFor(tool);
    if (mark) seen.add(mark);
    if (seen.size >= limit) break;
  }

  return [...seen];
}
