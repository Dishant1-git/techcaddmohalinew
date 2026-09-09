/**
 * Pulls an index out of editor-written HTML, and gives each heading an anchor.
 *
 * The CMS emits bare `<h2>Something</h2>` with no `id`, so there is nothing for
 * a contents list to link to. This walks the markup once, slugifies each
 * heading's text into an id, writes that id back into the tag, and returns the
 * list alongside the rewritten HTML — so the anchors in the page and the links
 * in the index are generated from the same pass and cannot disagree.
 *
 * A regex rather than a DOM: this runs on the server during render, where
 * there is no `document`, and pulling in a parser to add one attribute per
 * heading would cost more than it settles. Headings are shallow, well-formed
 * fragments — the editor produces them, not a person typing raw HTML.
 */

export type Heading = {
  id: string;
  /** Heading text with any inline markup stripped. */
  text: string;
  /** 2 or 3. `h1` belongs to the page title, and h4+ is too deep to index. */
  level: 2 | 3;
};

/** `Why it matters` → `why-it-matters`. */
function slugify(text: string): string {
  return (
    text
      .toLowerCase()
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section"
  );
}

/** Inline tags and entities out, plain text in. */
function textOf(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;|&apos;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

export function withHeadings(html: string | undefined): {
  html: string;
  headings: Heading[];
} {
  if (!html) return { html: "", headings: [] };

  const headings: Heading[] = [];
  const used = new Set<string>();

  const rewritten = html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, levelText: string, attrs: string, inner: string) => {
      const text = textOf(inner);
      // A heading with no words is a spacer, not a section.
      if (!text) return match;

      // An id the editor set by hand wins — they may have linked to it.
      const existing = /\bid\s*=\s*["']([^"']+)["']/i.exec(attrs);

      let id = existing?.[1] ?? slugify(text);
      if (!existing) {
        // Two sections can share a title; the anchors cannot share an id.
        let n = 2;
        const base = id;
        while (used.has(id)) id = `${base}-${n++}`;
      }
      used.add(id);

      const level = Number(levelText) === 3 ? 3 : 2;
      headings.push({ id, text, level });

      // `scroll-mt` clears the fixed header when the anchor is jumped to.
      const cleaned = attrs.replace(/\s*\bid\s*=\s*["'][^"']*["']/i, "");
      return `<h${levelText}${cleaned} id="${id}" class="scroll-mt-28">${inner}</h${levelText}>`;
    },
  );

  return { html: rewritten, headings };
}

/**
 * The same index, for content that is already an array of paragraphs.
 *
 * The built-in blog posts are plain strings with no headings at all, so they
 * have nothing to index — returning an empty list lets the page decide not to
 * draw the rail rather than drawing an empty one.
 */
export const noHeadings: Heading[] = [];
