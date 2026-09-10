/**
 * The portrait wall in `public/images/teamsimages/`.
 *
 * Two things about this list are deliberate:
 *
 *  • The paths are encoded rather than written raw. These are WhatsApp exports,
 *    so every filename carries spaces and dots, and an unencoded space is not a
 *    valid URL — the request fails and the image renders broken.
 *
 *  • No names are attached. The folder does not record who is in which
 *    photograph, and pairing them with the names in `team` below would put a
 *    real person's name on someone else's face. If you send the mapping, the
 *    wall can caption itself; until then it stays a wall of faces.
 */
const teamPhotoFiles = [
  "WhatsApp Image 2026-08-21 at 7.12.14 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 7.22.51 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.13.37 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.33.14 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.35.31 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.37.58 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.41.45 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.43.52 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 8.49.51 PM.jpeg",
  "WhatsApp Image 2026-08-21 at 9.12.04 PM.jpeg",
  "WhatsApp Image 2026-08-22 at 8.29.34 AM.jpeg",
];

export const teamPhotos = teamPhotoFiles.map(
  (file) => `/images/teamsimages/${encodeURIComponent(file)}`,
);

export type TeamMember = {
  name: string;
  role: string;
  photo: string;
};

export const team: TeamMember[] = [
  { name: "Gourav Gupta", role: "Founder & CEO", photo: "/founder/gouravsir.jpg" },
  { name: "Shilpa Gupta", role: "Team Member", photo: "/about/shilpa-mam.png" },
  { name: "Asmita Sehgal", role: "Team Member", photo: "/about/asmita-mam.png" },
  { name: "Daljeet Singh", role: "Team Member", photo: "/about/team.jpg" },
  { name: "Amit Sharma", role: "Team Member", photo: "/about/mentoring.webp" },
  { name: "Harrachneet Kaur", role: "Team Member", photo: "/about/richi-mam.png" },
  { name: "Alam", role: "Team Member", photo: "/about/alam-sir.png" },
  { name: "Tanisha", role: "Team Member", photo: "/about/mentoring.webp" },
  { name: "Sandeep Chugh", role: "Team Member", photo: "/about/sandeep-sir.png" },
  { name: "Anita Sharma", role: "Team Member", photo: "/about/anita-mam.png" },
  { name: "Shiv", role: "Team Member", photo: "/about/shiv-sir.png" },
  { name: "Aman Sharma", role: "Team Member", photo: "/about/aman-sir.png" },
];
