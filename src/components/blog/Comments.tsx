"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import type { BlogComment } from "@/lib/cms/content";

/**
 * The comment thread under an article, and the form that adds to it.
 *
 * Everything shown here has already been approved in the CMS — the API only
 * ever returns approved comments, so a pending or hidden one cannot reach the
 * page even by mistake. A new comment is therefore *not* added to the list on
 * submit: it goes to a moderator, and pretending otherwise would have the
 * writer refresh the page and think their comment had vanished.
 */

function formatDate(iso: string) {
  const date = new Date(iso.replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** One comment, with its replies nested under it. */
function Comment({ comment, depth = 0 }: { comment: BlogComment; depth?: number }) {
  return (
    <li className={depth > 0 ? "mt-4 border-l-2 border-line pl-5" : ""}>
      <article className="rounded-2xl border border-line bg-white p-5">
        <div className="flex items-center gap-3">
          <span
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold ${
              comment.isStaff
                ? "bg-up-accent text-white"
                : "bg-gradient-to-br from-hero-600 to-hero-glow text-white"
            }`}
          >
            {initialsOf(comment.authorName)}
          </span>
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2">
              <span className="break-words text-sm font-bold text-up-ink">
                {comment.authorName}
              </span>
              {comment.isStaff && (
                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-up-accent">
                  techcadd
                </span>
              )}
            </span>
            <span className="block text-xs text-up-muted">{formatDate(comment.createdAt)}</span>
          </span>
        </div>

        <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-up-ink/85">
          {comment.body}
        </p>
      </article>

      {comment.replies.length > 0 && (
        <ul>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

type State = "idle" | "sending" | "sent" | "error";

export default function Comments({
  slug,
  comments,
}: {
  slug: string;
  comments: BlogComment[];
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  // Counted through the tree, so a reply is not invisible in the total.
  const total = comments.reduce(
    (sum, comment) => sum + 1 + comment.replies.length,
    0,
  );

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("sending");
    setError("");

    try {
      const response = await fetch(`/api/comments/${slug}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          authorName: String(data.get("authorName") ?? "").trim(),
          authorEmail: String(data.get("authorEmail") ?? "").trim(),
          body: String(data.get("body") ?? "").trim(),
          // The honeypot: hidden from people, irresistible to bots.
          website: String(data.get("website") ?? ""),
        }),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(payload?.error ?? "That comment could not be posted.");
        setState("error");
        return;
      }

      form.reset();
      setState("sent");
    } catch {
      setError("We could not post that just now. Please try again shortly.");
      setState("error");
    }
  }

  return (
    <section id="comments" className="mt-14 scroll-mt-28 border-t border-line pt-10">
      <h2 className="font-display text-2xl font-extrabold text-up-ink">
        {total > 0 ? `${total} ${total === 1 ? "comment" : "comments"}` : "Comments"}
      </h2>
      <div
        data-underline
        className="mt-3 h-[3px] w-16 rounded-full bg-gradient-to-r from-up-accent to-transparent"
      />

      {comments.length > 0 ? (
        <ul className="mt-8 space-y-5">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : (
        <p className="mt-6 text-sm text-up-muted">
          No comments yet — yours would be the first.
        </p>
      )}

      {/* ---- Add one ------------------------------------------------------- */}
      <div className="mt-10 rounded-3xl border border-line bg-subtle p-6 sm:p-8">
        {state === "sent" ? (
          <div className="flex items-start gap-3">
            <Icon name="checkCircle" size={20} className="mt-0.5 shrink-0 text-up-accent" />
            <div>
              <p className="font-display text-base font-bold text-up-ink">Thanks — that’s in.</p>
              <p className="mt-1 text-sm leading-relaxed text-up-muted">
                Comments are read before they appear, so yours will show here once it has been
                approved.
              </p>
              <button
                type="button"
                onClick={() => setState("idle")}
                className="mt-3 text-sm font-semibold text-up-accent hover:underline"
              >
                Write another
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <p className="font-display text-base font-bold text-up-ink">Leave a comment</p>
            <p className="mt-1 text-sm text-up-muted">
              Read before publishing. Your email is never shown.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-up-muted">
                  Name
                </span>
                <input
                  name="authorName"
                  required
                  maxLength={80}
                  autoComplete="name"
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-up-ink outline-none transition-colors focus:border-up-accent"
                />
              </label>
              <label className="block">
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-up-muted">
                  Email <span className="font-normal normal-case">(optional)</span>
                </span>
                <input
                  name="authorEmail"
                  type="email"
                  maxLength={190}
                  autoComplete="email"
                  className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-up-ink outline-none transition-colors focus:border-up-accent"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-up-muted">
                Comment
              </span>
              <textarea
                name="body"
                required
                rows={4}
                maxLength={4000}
                className="mt-2 w-full resize-y rounded-xl border border-line bg-white px-4 py-3 text-sm leading-relaxed text-up-ink outline-none transition-colors focus:border-up-accent"
              />
            </label>

            {/* Hidden from people and from screen readers; bots fill it in. */}
            <input
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />

            {state === "error" && (
              <p className="mt-4 flex items-start gap-2 text-sm text-red-600">
                <Icon name="close" size={15} className="mt-0.5 shrink-0" />
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-up-accent px-6 py-3 text-sm font-bold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {state === "sending" ? "Posting…" : "Post comment"}
              <Icon name="arrowRight" size={15} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
