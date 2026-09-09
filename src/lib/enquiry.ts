/**
 * A tiny handle on the enquiry modal, so anything on the page can open it
 * without threading a prop through the layout — the same approach `@/lib/lenis`
 * uses for the scroll instance.
 *
 * The modal itself is mounted once in the root layout and subscribes here.
 */

type Listener = () => void;

const listeners = new Set<Listener>();

/** Opens the enquiry modal. No-op if it is not mounted yet. */
export function openEnquiry() {
  listeners.forEach((l) => l());
}

/** Subscribe the modal. Returns an unsubscribe for effect cleanup. */
export function onOpenEnquiry(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * The modal also opens itself once a visit, a few seconds after a page load.
 *
 * The key lives in sessionStorage, so it is scoped to one browsing session: a
 * visitor who reads five pages in a sitting is asked once, not five times, and
 * someone who comes back tomorrow is asked again. It used to be localStorage,
 * which meant once ever — a single view during development suppressed the
 * prompt on that browser permanently, with no way to tell it apart from a bug.
 *
 * The Book Demo button is unaffected either way; that always opens it on demand.
 *
 * To see the timed open again inside the current session, load any page with
 * `?enquiry=1`, or just open a new tab.
 */
export const AUTO_KEY = "techcadd:enquiry-autoshown";

/** Delay before the modal offers itself unprompted. */
export const AUTO_DELAY_MS = 10_000;
