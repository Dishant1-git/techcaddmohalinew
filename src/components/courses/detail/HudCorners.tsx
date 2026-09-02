"use client";

/**
 * Four corner brackets, drawn just inside an element's edges.
 *
 * A registration-mark motif rather than a full border — it reads as
 * instrumentation on a panel without competing with the card's own rounded
 * outline. Purely decorative, so it is hidden from assistive tech.
 *
 * The parent needs `position: relative`; this fills it and never takes pointer
 * events.
 */
export default function HudCorners({
  className = "text-accent-glow/45",
  size = "1.1rem",
  inset = "0.5rem",
  /** Brackets brighten when an ancestor marked `group` is hovered. */
  onGroupHover = false,
}: {
  className?: string;
  size?: string;
  inset?: string;
  onGroupHover?: boolean;
}) {
  const base = "absolute h-[--hud-size] w-[--hud-size] border-current transition-opacity duration-500";
  const state = onGroupHover ? "opacity-0 group-hover:opacity-100" : "opacity-100";

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={
        { "--hud-size": size, "--hud-inset": inset } as React.CSSProperties
      }
    >
      <span
        className={`${base} ${state} left-[--hud-inset] top-[--hud-inset] rounded-tl-[3px] border-l border-t`}
      />
      <span
        className={`${base} ${state} right-[--hud-inset] top-[--hud-inset] rounded-tr-[3px] border-r border-t`}
      />
      <span
        className={`${base} ${state} bottom-[--hud-inset] left-[--hud-inset] rounded-bl-[3px] border-b border-l`}
      />
      <span
        className={`${base} ${state} bottom-[--hud-inset] right-[--hud-inset] rounded-br-[3px] border-b border-r`}
      />
    </span>
  );
}
