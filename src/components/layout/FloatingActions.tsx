"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import Icon from "@/components/ui/Icon";

export default function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`grid h-11 w-11 place-items-center rounded-full border border-up-line bg-white text-up-accent shadow-lg transition-all duration-400 hover:-translate-y-1 ${
          show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <Icon name="arrowRight" size={18} className="-rotate-90" />
      </button>

      <a
        href={site.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with techcadd Mohali on WhatsApp"
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/35 transition-transform hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40" />
        <Icon name="whatsapp" size={28} strokeWidth={0.9} className="relative fill-white stroke-white" />
      </a>
    </div>
  );
}
