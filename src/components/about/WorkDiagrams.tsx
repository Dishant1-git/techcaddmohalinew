import Icon from "@/components/ui/Icon";
import TechMark from "@/components/ui/TechMark";

/**
 * Wireframe primitives for the "How we work" deck.
 *
 * Everything is drawn with hairlines on a near-black canvas: flat cards for
 * readouts, isometric boxes for the things that hold them, and a small set of
 * fills — bars, seats, chips, hatched tiles. Each accent colour belongs to one
 * step, so a diagram only ever carries its own step's colour.
 *
 * Motion is not owned here. Pieces are tagged and the section's scrubbed
 * timeline plays them: `hww-rise` (a whole box arriving), `hww-pop` (small
 * items), `hww-bar` (scaleX fills), `hww-draw` (stroke draw). Rendered cold —
 * no JS, or reduced motion — every piece is already in its finished state.
 */

/** Depth of the isometric faces, in px. */
const DEPTH = 16;

/* Hairlines and faces are tinted with the theme's navy/periwinkle rather than
   neutral grey, so the deck sits in the same light as the rest of the site. */
const LINE = "rgba(169,196,255,0.2)";
const LINE_SOFT = "rgba(169,196,255,0.13)";

/** Card faces: the theme's deep panel navy, lifted a few percent toward the
 *  soft periwinkle so a face reads clearly against the hero-950 canvas. */
const FACE =
  "linear-gradient(rgba(169,196,255,0.05), rgba(169,196,255,0.05)), var(--color-panel)";

export const hatch = (color: string) =>
  `repeating-linear-gradient(45deg, ${color}66 0 1px, transparent 1px 7px)`;

/* -------------------------------------------------------------------------- *
 * Containers
 * -------------------------------------------------------------------------- */

/** A flat readout panel with the thin ledge the reference draws beneath it. */
export function FlatCard({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`hww-rise ${className}`}>
      <div className="border px-4 py-3.5" style={{ borderColor: LINE, background: FACE }}>
        <p className="text-[0.72rem] font-semibold text-up-soft/75">{label}</p>
        <div className="mt-3">{children}</div>
      </div>
      {/* The ledge: reads as the panel standing slightly off the canvas. */}
      <div
        className="mx-3 h-1.5 border-x border-b"
        style={{ borderColor: LINE_SOFT }}
      />
    </div>
  );
}

/**
 * An isometric wireframe box — a filled front face with two outlined faces
 * skewed up and to the right, exactly as the reference draws them.
 */
export function IsoBox({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`hww-rise relative ${className}`} style={{ marginTop: DEPTH }}>
      {/* Top face */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 origin-bottom-left -translate-y-full border border-b-0 skew-x-[-45deg]"
        style={{ height: DEPTH, borderColor: LINE_SOFT }}
      />
      {/* Right face */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 origin-top-left translate-x-full border border-l-0 skew-y-[-45deg]"
        style={{ width: DEPTH, borderColor: LINE_SOFT }}
      />
      <div
        className="relative border px-4 py-3.5"
        style={{ borderColor: LINE, background: FACE }}
      >
        <p className="text-[0.72rem] font-semibold text-up-soft/75">{label}</p>
        <div className="mt-3.5">{children}</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- *
 * Contents
 * -------------------------------------------------------------------------- */

/** Ring readout. Three arcs on one circle, drawn in as the step arrives. */
export function Donut({
  accent,
  segments,
  centre,
}: {
  accent: string;
  segments: number[];
  centre: string;
}) {
  // Two clear tones plus a faint one, the way the reference splits a ring.
  const alpha = ["", "99", "40"];
  // Where each arc starts on the ring, so they sit end to end.
  const offsets = segments.map((_, i) => segments.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[9.5rem]">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="36" fill="none" stroke="rgba(169,196,255,0.15)" strokeWidth="13" />
        {segments.map((seg, i) => (
          <circle
            key={i}
            className="hww-draw"
            cx="50"
            cy="50"
            r="36"
            pathLength="1"
            fill="none"
            stroke={`${accent}${alpha[i] ?? ""}`}
            strokeWidth="13"
            strokeDasharray={`${seg} ${1 - seg}`}
            strokeDashoffset={-offsets[i]}
            data-dash={`${seg} ${1 - seg}`}
          />
        ))}
      </svg>
      <span className="absolute inset-0 grid place-items-center text-[0.78rem] font-medium text-white">
        {centre}
      </span>
    </div>
  );
}

/** Horizontal bar readout with a value column, like the reference's balances. */
export function Bars({
  accent,
  rows,
}: {
  accent: string;
  rows: { label: string; value: number; note: string }[];
}) {
  return (
    <div className="space-y-2.5">
      {rows.map((r, i) => (
        <div key={r.label} className="flex items-center gap-3">
          <span className="w-5 shrink-0 text-[0.62rem] text-up-soft/55">{r.label}</span>
          <span className="h-4 flex-1">
            <span
              style={{
                width: `${r.value}%`,
                background: i === 0 ? accent : "transparent",
                backgroundImage: i === 0 ? undefined : hatch(accent),
                borderColor: accent,
              }}
              className="hww-bar block h-full origin-left border"
            />
          </span>
          <span className="w-14 shrink-0 text-right text-[0.62rem] tabular-nums text-up-soft/65">
            {r.note}
          </span>
        </div>
      ))}
    </div>
  );
}

/** Seat map — filled seats against dashed empties. */
export function Seats({ accent, filled = 14 }: { accent: string; filled?: number }) {
  return (
    <div className="grid grid-cols-6 gap-1.5">
      {Array.from({ length: 18 }).map((_, i) => (
        <span
          key={i}
          className="hww-pop h-4 border"
          style={
            i < filled
              ? { background: `${accent}33`, borderColor: `${accent}99` }
              : { borderColor: LINE, borderStyle: "dashed" }
          }
        />
      ))}
    </div>
  );
}

/** Pill chips with a glyph — the reference's "Bank Feeds / ERP" cluster. */
export function Chips({
  items,
  accent,
}: {
  items: { label: string; icon: string }[];
  accent: string;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {items.map((it) => (
        <span
          key={it.label}
          className="hww-pop inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.66rem] text-white/90"
          style={{ borderColor: LINE, background: "rgba(11,26,77,0.75)" }}
        >
          <Icon name={it.icon} size={11} strokeWidth={2.5} style={{ color: accent }} />
          {it.label}
        </span>
      ))}
    </div>
  );
}

/** Four tiles split by a connector rail — one solid, the rest hatched. */
export function TileGrid({ accent }: { accent: string }) {
  return (
    <div className="relative">
      <div className="grid grid-cols-2 gap-3">
        <span className="hww-pop h-9" style={{ background: accent }} />
        <span
          className="hww-pop h-9 border"
          style={{ borderColor: `${accent}99`, backgroundImage: hatch(accent) }}
        />
      </div>
      <div className="relative my-3 h-2">
        <span className="absolute inset-x-0 top-1/2 h-px" style={{ background: accent }} />
        {[0, 50, 100].map((x) => (
          <span
            key={x}
            className="hww-pop absolute top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
            style={{
              left: `${x}%`,
              borderColor: accent,
              background: x === 50 ? accent : FACE,
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="hww-pop h-9 border"
            style={{ borderColor: `${accent}99`, backgroundImage: hatch(accent) }}
          />
        ))}
      </div>
    </div>
  );
}

/** Three stages wired in a row, the last one solid — the reference's pipeline. */
export function Chain({ accent, labels }: { accent: string; labels: string[] }) {
  return (
    <div className="flex items-center gap-1.5">
      {labels.map((label, i) => (
        <span key={label} className="contents">
          {i > 0 && (
            <span className="flex flex-1 items-center">
              <span className="h-px flex-1" style={{ background: `${accent}80` }} />
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full border"
                style={{ borderColor: accent }}
              />
              <span className="h-px flex-1" style={{ background: `${accent}80` }} />
            </span>
          )}
          <span
            className="hww-pop grid h-11 flex-1 place-items-center border px-1 text-center text-[0.58rem] leading-tight text-up-soft/80"
            style={
              i === labels.length - 1
                ? { background: accent, borderColor: accent, color: "var(--color-hero-950)" }
                : { borderColor: `${accent}99`, backgroundImage: hatch(accent) }
            }
          >
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}

/** The tools box — real marks, the way the reference shows ERP logos. */
export function Logos({ marks }: { marks: string[] }) {
  return (
    <div className="grid grid-cols-3 place-items-center gap-x-2 gap-y-3.5">
      {marks.map((m) => (
        <span key={m} className="hww-pop opacity-90">
          <TechMark name={m} size={24} />
        </span>
      ))}
    </div>
  );
}
