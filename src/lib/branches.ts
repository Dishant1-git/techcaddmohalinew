export type Branch = {
  slug: string;
  name: string;
  tagline: string;
  intro: string;
  areasServed: string[];
  isHeadOffice?: boolean;
};

export const headOffice = {
  name: "Jalandhar",
  address: {
    line1: "2nd Floor, Crystal Plaza, SCS 78",
    line2: "Opposite PIMS Hospital, Jalandhar",
    line3: "Punjab 144001",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Crystal+Plaza+SCS+78+Opposite+PIMS+Hospital+Jalandhar+Punjab+144001",
};

export const branches: Branch[] = [
  {
    slug: "jalandhar",
    name: "Jalandhar",
    tagline: "The flagship campus — where techcadd started",
    intro:
      "Every curriculum update, trainer standard and counsellor script techcadd runs on is written and tested here first, then rolled out to every other centre. The Jalandhar campus is the largest, with the widest range of live batches running at any one time.",
    areasServed: ["Jalandhar Cantt", "Model Town", "Urban Estate", "Adampur"],
    isHeadOffice: true,
  },
  {
    slug: "ludhiana",
    name: "Ludhiana",
    tagline: "Career-track courses close to home",
    intro:
      "Students from Ludhiana have long had to choose between a local course with no project work and a trip to Jalandhar. The Ludhiana centre removes the choice: the full course catalogue, small batches, and trainers who are still doing delivery work rather than teaching full time.",
    areasServed: ["Ludhiana", "Jagraon", "Khanna", "Samrala"],
  },
  {
    slug: "phagwara",
    name: "Phagwara",
    tagline: "Career-track courses close to home",
    intro:
      "Students from Phagwara have long had to choose between a local course with no project work and a trip to Jalandhar. The Phagwara centre removes the choice: the full course catalogue, small batches, and trainers who are still doing delivery work rather than teaching full time.",
    areasServed: ["Phagwara", "Nakodar", "Nawanshahr", "Goraya"],
  },
  {
    slug: "maqsudan",
    name: "Maqsudan",
    tagline: "Career-track courses close to home",
    intro:
      "Students from Maqsudan and the surrounding colonies have long had to cross the city for a course with real project work. The Maqsudan centre removes the trip: the full course catalogue, small batches, and trainers who are still doing delivery work rather than teaching full time.",
    areasServed: ["Maqsudan", "Basti Sheikh", "Adarsh Nagar", "Model Town"],
  },
  {
    slug: "hoshiarpur",
    name: "Hoshiarpur",
    tagline: "Career-track courses close to home",
    intro:
      "Students from Hoshiarpur have long had to choose between a local course with no project work and an hour on the road to Jalandhar. The Hoshiarpur centre removes the choice: the full course catalogue, small batches, and trainers who are still doing delivery work rather than teaching full time.",
    areasServed: ["Hoshiarpur", "Dasuya", "Mukerian", "Garhshankar", "Tanda"],
  },
  {
    slug: "amritsar",
    name: "Amritsar",
    tagline: "Career-track courses close to home",
    intro:
      "Students from Amritsar have long had to choose between a local course with no project work and a trip to Jalandhar. The Amritsar centre removes the choice: the full course catalogue, small batches, and trainers who are still doing delivery work rather than teaching full time.",
    areasServed: ["Amritsar", "Tarn Taran", "Beas", "Rayya"],
  },
];

export const getBranch = (slug: string) => branches.find((b) => b.slug === slug);
