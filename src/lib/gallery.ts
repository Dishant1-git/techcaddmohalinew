export type GalleryTile = {
  id: string;
  src: string;
  alt: string;
  span: string;
};

const spans = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
];

const photos: { file: string; alt: string }[] = [
  { file: "campus-classrooms-01.png", alt: "Techcadd campus — classrooms & learning environment" },
  { file: "industry-expert-session.png", alt: "Industry expert session at techcadd Mohali" },
  { file: "classroom-learning-experience.png", alt: "Classroom learning experience — faculty & group activities" },
  { file: "digital-marketing-lab.png", alt: "Digital Marketing lab — practical computer lab" },
  { file: "career-guidance-session.png", alt: "Career guidance session — placement & interview preparation" },
  { file: "certification-ceremony.png", alt: "Certification ceremony — student success celebration" },
  { file: "student-achievement-gallery.png", alt: "Student achievement gallery — success stories" },
  { file: "workshop-seminars-01.png", alt: "Workshop & seminar — expert session" },
  { file: "workshop-seminars-02.png", alt: "Workshop & seminar" },
  { file: "canva-creative-training.png", alt: "Canva & creative marketing training" },
  { file: "email-marketing-training.png", alt: "Email marketing training — campaign creation & automation" },
  { file: "content-marketing-workshop.png", alt: "Content marketing workshop — blog writing & strategy" },
  { file: "google-analytics-training.png", alt: "Google Analytics & marketing tools training" },
  { file: "internship-program.png", alt: "Digital Marketing internship program" },
  { file: "live-client-projects.png", alt: "Live client marketing projects" },
  { file: "student-projects.png", alt: "Digital Marketing student projects" },
  { file: "ai-marketing-training.png", alt: "AI Digital Marketing training" },
  { file: "social-media-training.png", alt: "Social media marketing training — Facebook & Instagram Ads" },
  { file: "google-ads-session.png", alt: "Google Ads practical session — live campaign creation" },
  { file: "seo-training-workshop.png", alt: "SEO training workshop" },
  { file: "digital-marketing-training.png", alt: "Digital Marketing training" },
];

export const galleryTiles: GalleryTile[] = photos.map((photo, i) => ({
  id: `tile-${i + 1}`,
  src: `/gallery/${photo.file}`,
  alt: photo.alt,
  span: spans[i % spans.length],
}));
