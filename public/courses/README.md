# Course photography

Photographs shown beside the overview on `/courses/<slug>`.

The site ships no photography yet, so every course currently falls back to
generated artwork built from its category gradient (see `CourseVisual.tsx`).

To use a real photo for a course:

1. Drop the file in this folder, named after the slug — e.g.
   `data-science.jpg` for `/courses/data-science`.
2. Register it in `src/lib/coursePage.ts`:

   ```ts
   export const courseImages: Record<string, CourseImage> = {
     "data-science": {
       src: "/courses/data-science.jpg",
       alt: "Students working through a dataset in the Mohali lab",
     },
   };
   ```

Paths are listed explicitly rather than guessed from the slug, so a photo that
has not been added yet can never render as a broken image.

**Guidance:** portrait or square crops work best — the frame is 4:5 on desktop
and 5:4 on mobile. Aim for roughly 1200×1500px, and always write a real `alt`
description of what is happening in the shot.
