# About photography

Photographs shown on the cards in the header's **About** dropdown — the `feature`
panel rendered by `src/components/layout/Navbar.tsx`.

The site ships no photography yet, so every card currently falls back to artwork
built from its own gradient (`art` on the entry). The cards look finished either
way; the fallback is not a placeholder to be embarrassed about.

To use a real photo:

1. Drop the file in this folder — e.g. `founder.jpg`.
2. Register it on the matching entry in the About item's `features` array in
   `src/lib/site.ts`:

   ```ts
   {
     title: "Our Founder",
     href: "/about#founder",
     kicker: "Profile",
     caption: "Gourav Gupta",
     art: "from-brand-900 via-hero-600 to-accent-400",
     photo: {
       src: "/about/founder.jpg",
       alt: "Gourav Gupta at the Sector 75 campus",
     },
   }
   ```

Keep `art` in place alongside `photo` — it costs nothing and stays the fallback if
the photo is ever pulled.

Paths are listed explicitly rather than guessed from the title, so a photo that has
not been added yet can never render as a broken image. The same convention covers
course photography (`public/courses/README.md`) and the About collage
(`collage` in `src/lib/about.ts`).

**Guidance:** the frame is 4:3 landscape — aim for roughly 800×600px. Cards are
about 18vw wide on a desktop, so detail beyond that is wasted bytes. Always write a
real `alt` describing what is happening in the shot, not the card's title.
