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
 * The modal also opens itself once, a few seconds after a page load.
 *
 * Both keys live in localStorage, not sessionStorage: a session key resets in a
 * new tab or after the browser restarts, so the prompt would come back at people
 * who had already seen it. Once means once. The Book Demo button is unaffected —
 * that always opens it on demand.
 *
 * To see the timed open again once your browser has recorded it, load any page
 * with `?enquiry=1`, or clear these two keys from localStorage.
 */
export const AUTO_KEY = "techcadd:enquiry-autoshown";
export const SENT_KEY = "techcadd:enquiry-sent";

/** Delay before the modal offers itself unprompted. */
export const AUTO_DELAY_MS = 10_000;
