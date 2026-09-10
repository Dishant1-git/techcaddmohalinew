/**
 * The photographs on the gallery wall — the drifting marquee at the top of
 * /gallery.
 *
 * These are the centre's own event photographs, kept as files in `public/`
 * rather than pulled from the CMS: the wall is the page's opening image and
 * should never depend on the CMS being reachable to render. Albums, which are
 * editorial and change often, still come from the CMS below it.
 */

export type GalleryWallTile = {
  /** Path under `public/`. */
  image: string;
  /** Doubles as the alt text and the caption in the viewer. */
  title: string;
};

export const galleryWallTiles: GalleryWallTile[] = [
  { image: "/gallery/wall/ai-robotics-future.jpg", title: "Exploring the Future of AI & Robotics" },
  { image: "/gallery/wall/ai-robotics-future-skills.jpg", title: "AI. Robotics. Future Skills" },
  { image: "/gallery/wall/innovation-starts-with-curiosity.jpg", title: "Innovation Starts with Curiosity" },
  { image: "/gallery/wall/learning-today-building-tomorrow.jpg", title: "Learning Today, Building Tomorrow" },
  { image: "/gallery/wall/inspiring-future-innovators.jpg", title: "Inspiring Future Innovators" },
  {
    image: "/gallery/wall/gndec-seminar-careers.jpg",
    title: "Inspiring students, sharing knowledge, and building brighter careers at GNDEC",
  },
  {
    image: "/gallery/wall/industry-insights-career-guidance.jpg",
    title: "Empowering the next generation with industry insights and career guidance",
  },
  {
    image: "/gallery/wall/gndec-seminar-learning-connecting.jpg",
    title: "Learning. Connecting. Growing. A memorable seminar with the students of GNDEC",
  },
  {
    image: "/gallery/wall/gndec-industry-ready-skills.jpg",
    title: "Classroom learning to industry-ready skills — an insightful session at GNDEC",
  },
  {
    image: "/gallery/wall/shaping-future-professionals.jpg",
    title: "Shaping future professionals through knowledge, interaction, and industry exposure",
  },
  { image: "/gallery/wall/shaping-careers-inspiring-success.jpg", title: "Shaping Careers, Inspiring Success" },
  { image: "/gallery/wall/turning-skills-into-opportunities.jpg", title: "Turning Skills into Opportunities" },
  { image: "/gallery/wall/building-future-ready-careers.jpg", title: "Building Future-Ready Careers" },
  { image: "/gallery/wall/talent-meets-opportunity.jpg", title: "Talent Meets Opportunity" },
  { image: "/gallery/wall/career-opportunities-begin-here.jpg", title: "Career Opportunities Begin Here" },
  { image: "/gallery/wall/time-management-matters.jpg", title: "Time Management Matters!" },
  { image: "/gallery/wall/learning-beyond-the-classroom.jpg", title: "Learning Beyond the Classroom!" },
  { image: "/gallery/wall/ideas-interaction-learning.jpg", title: "Ideas. Interaction. Learning." },
  { image: "/gallery/wall/think-better-decide-smarter.jpg", title: "Think Better. Decide Smarter." },
  { image: "/gallery/wall/building-future-ready-students.jpg", title: "Building Future-Ready Students!" },
];
