"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";
import Icon from "@/components/ui/Icon";

export default function Curriculum({ modules }: { modules: Course["modules"] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-3">
      {modules.map((m, i) => {
        const isOpen = open === i;
        return (
          <div
            key={m.title}
            data-anim="up"
            className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${
              isOpen ? "border-up-accent/30 bg-brand-50/40" : "border-line bg-white"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center gap-5 px-6 py-5 text-left"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl font-display text-sm font-extrabold transition-colors ${
                  isOpen ? "bg-up-accent text-white" : "bg-subtle text-up-accent"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1">
                <span className="block text-base font-bold text-up-ink">{m.title}</span>
                <span className="mt-0.5 block text-xs text-up-muted">{m.points.length} topics</span>
              </span>
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                  isOpen ? "rotate-45 bg-up-accent text-white" : "bg-subtle text-up-muted"
                }`}
              >
                <Icon name="plus" size={16} strokeWidth={2.4} />
              </span>
            </button>

            <div
              className={`grid transition-all duration-400 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <ul className="grid gap-2.5 px-6 pb-6 pl-[4.7rem] sm:grid-cols-2">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-up-ink/80">
                      <Icon
                        name="check"
                        size={14}
                        strokeWidth={3}
                        className="mt-1 shrink-0 text-up-accent"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
