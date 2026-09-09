export type GoogleReview = {
  name: string;
  rating: number;
  tag: string;
  quote: string;
  /**
   * A link to this exact review on Google.
   *
   * Optional: the built-in reviews below were transcribed as a set and only
   * have the one listing URL between them, so a card without this falls back
   * to `googleReviewsUrl`. A review entered in the CMS can carry its own.
   */
  url?: string;
};

export const googleReviewsUrl =
  "https://www.google.com/maps/place/techcadd+-+6+Months+%26+Weeks+industrial%2Finternship+Training+Company+in+Chandigarh+%26+Mohali/data=!4m2!3m1!1s0x0:0x31b60594997d5d5b?sa=X&ved=1t:2428&ictx=111";

export const googleRating = { average: "4.9", count: 226 };
export const studentsTrained = "10,000+";

export const avatarArt = [
  "from-hero-600 to-hero-glow",
  "from-brand-400 to-hero-900",
  "from-accent-yellow to-hero-glow",
  "from-accent-glow to-hero-glow",
  "from-hero-glow to-brand-700",
  "from-accent-yellow to-accent-500",
  "from-up-soft to-hero-600",
  "from-accent-400 to-hero-800",
];

export const googleReviews: GoogleReview[] = [
  {
    name: "Neha Gupta",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "I learned how to research keywords, create optimized content, and analyze website performance. The practical work helped me understand how digital marketing is actually done.",
  },
  {
    name: "Simran Kaur",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "A useful learning experience for anyone looking to build skills in online marketing. The training covered important areas like SEO, social media marketing, PPC, and analytics.",
  },
  {
    name: "Amanpreet Singh",
    rating: 5,
    tag: "SEO",
    quote:
      "The course provided a good combination of theory and hands-on learning. I particularly enjoyed working on SEO tasks and understanding how websites can improve their search visibility.",
  },
  {
    name: "Kulwinder",
    rating: 5,
    tag: "SEO",
    quote:
      "I joined the course as a beginner and gradually became comfortable with keyword research, on-page SEO, Google Search Console, and website optimization. The practical approach was very helpful.",
  },
  {
    name: "Harcharan",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "The digital marketing training was very useful for understanding how SEO, social media, and paid advertising work together. The practical assignments made the concepts easier to understand.",
  },
  {
    name: "Veena",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "The practical projects helped me understand how to create customer personas and analyze competitors. The training at Techcadd gave me useful knowledge that I can apply to digital marketing projects.",
  },
  {
    name: "Sunita",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "I found the Digital Audience Research Training useful for understanding target customers, search intent, social media audiences, and marketing data. A good learning experience for beginners.",
  },
  {
    name: "Rekha",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "Techcadd offers a structured learning environment with practical digital marketing activities. The audience research concepts were explained clearly and helped me develop more confidence.",
  },
  {
    name: "Diksha",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "My experience at Techcadd was very good. I especially liked the practical approach to competitor research, customer analysis, and audience profiling. It helped me understand real marketing requirements.",
  },
  {
    name: "Rajni",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "Great course for beginners who want to understand customer research and digital marketing strategy. The trainers explained buyer personas, audience segmentation, and search intent clearly.",
  },
  {
    name: "Manisha",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "I learned how audience research connects with SEO, social media, content marketing, and paid advertising. The training at Techcadd was informative and useful for building digital marketing skills.",
  },
  {
    name: "Riya",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "The Digital Audience Research Training at Techcadd helped me understand how to identify the right target audience for a campaign. The practical activities made the concepts easier to apply.",
  },
  {
    name: "Vanshika",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "Techcadd provided a practical learning experience for digital audience research. I learned about audience segmentation, buyer personas, competitor research, and customer behaviour.",
  },
  {
    name: "Ritu",
    rating: 5,
    tag: "SEO",
    quote:
      "The SEO course at Techcadd helped me build a foundation in search engine optimization. I learned about keywords, content optimization, Google Search Console, website audits, and local SEO.",
  },
  {
    name: "Babli",
    rating: 5,
    tag: "SEO",
    quote:
      "I enrolled in the SEO course at Techcadd for career development. The course introduced me to keyword research, on-page optimization, off-page SEO, technical SEO, and reporting.",
  },
  {
    name: "Sanjana",
    rating: 5,
    tag: "SEO",
    quote:
      "The SEO course at Techcadd was helpful for improving my digital marketing skills. I learned how SEO works with content, websites, analytics, and local search.",
  },
  {
    name: "Charan",
    rating: 5,
    tag: "SEO",
    quote:
      "The SEO course gave me practical exposure to important tools and techniques — keyword planning, meta tags, internal linking, technical SEO, and local SEO.",
  },
  {
    name: "Anjana",
    rating: 5,
    tag: "SEO",
    quote:
      "I joined the SEO course as a beginner and gradually learned different concepts. The training covered keyword research, website optimization, content SEO, and Google Search Console.",
  },
  {
    name: "Kajal",
    rating: 5,
    tag: "SEO",
    quote:
      "The SEO course helped me develop a better understanding of how search engine optimization works — on-page, off-page, technical, and local SEO. The practical approach helped a lot.",
  },
  {
    name: "Anjali Thakur",
    rating: 5,
    tag: "SEO",
    quote:
      "The SEO course provided a good introduction to practical SEO — keyword research, Google Search Console, Google Analytics, content optimization, and local SEO.",
  },
  {
    name: "Shubhdeep",
    rating: 5,
    tag: "General Training",
    quote:
      "My training at Techcadd was a valuable learning experience. The instructors were knowledgeable and explained concepts clearly with practical examples and hands-on projects.",
  },
  {
    name: "Krishh Jaittly",
    rating: 5,
    tag: "Web Development",
    quote:
      "I had a great experience with Techcadd Mohali for Web Development training. The teaching was clear, practical, and easy to understand, and the trainers were supportive.",
  },
  {
    name: "Prabhjit Singh",
    rating: 5,
    tag: "General Training",
    quote:
      "Great experience with the company! Special thanks to the teacher for being supportive, patient, and explaining everything clearly. Highly recommended.",
  },
  {
    name: "Rohit",
    rating: 5,
    tag: "Internship",
    quote:
      "I recently completed my 45-day internship here, and it was a great learning experience. I gained practical knowledge and received valuable guidance throughout the program.",
  },
  {
    name: "Baljinder Kaur",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "The best part of the course was learning SEO, Google Ads, Meta Ads, and AI marketing tools through live projects. I gained practical experience that boosted my confidence.",
  },
  {
    name: "Jaswinder",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "The Digital Marketing Course with Placement at Techcadd was a useful learning experience. I gained knowledge of different tools and career opportunities in this field.",
  },
  {
    name: "Kavita",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "I was looking for a job-oriented digital marketing course and found the training at Techcadd useful. The course helped me understand which specialization interests me.",
  },
  {
    name: "Thabani Jason",
    rating: 5,
    tag: "DevOps",
    quote:
      "A great training institute with knowledgeable instructors and a well-structured curriculum — the 6-month DevOps engineering course is supportive and practical.",
  },
  {
    name: "Arun Bhardwaj",
    rating: 5,
    tag: "AI & ML",
    quote:
      "I am currently doing training in AI/ML. I've seen such experienced trainers with good teaching standards — talented, helpful, and an exciting road to experience.",
  },
  {
    name: "Atish Chand",
    rating: 5,
    tag: "Cyber Security",
    quote:
      "I'm doing the best 6-month cyber security course in Mohali — trained teachers, good environment, I learn a lot and the classes are very interesting.",
  },
  {
    name: "Mohit Solanki",
    rating: 5,
    tag: "Cloud Computing",
    quote:
      "I'm learning Cloud Computing and the teachers are very good at teaching — my favourite is Ragni Ma'am. Thank you Techcadd Mohali.",
  },
  {
    name: "Jatin Saini",
    rating: 5,
    tag: "Flutter App Development",
    quote:
      "Currently learning Flutter App Development here, and my experience has been very good so far. My trainer explains concepts very clearly and patiently.",
  },
  {
    name: "Ydush Sanyal",
    rating: 5,
    tag: "Cloud Computing",
    quote:
      "I am pursuing cloud computing training under Ragini Ma'am. The overall experience is very good and the staff is very cooperative.",
  },
  {
    name: "Gursheam Singh",
    rating: 5,
    tag: "General Training",
    quote:
      "Techcadd is a great platform for learning technical skills and improving career opportunities — industry-focused courses with hands-on, real-time projects.",
  },
  {
    name: "Ramanveer Kaur",
    rating: 5,
    tag: "Full Stack Web Development",
    quote:
      "About the full stack web development course — every topic is explained clearly, making learning easy, and we're always encouraged to ask questions.",
  },
  {
    name: "Nav Khanna",
    rating: 5,
    tag: "CAD / CAM",
    quote:
      "Techcadd is a well-known IT training company recognized for its practical, industry-focused courses in CAD, CAM, CAE, and software technologies.",
  },
  {
    name: "Mukesh Kumar",
    rating: 5,
    tag: "General Training",
    quote:
      "Techcadd is an IT training and skill-development institute with branches across the Punjab & Chandigarh region, offering hands-on, job-ready tech training.",
  },
  {
    name: "Rimpy Arora",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "I liked the combination of traditional digital marketing and AI tools like ChatGPT. The practical learning environment made every session engaging and informative.",
  },
  {
    name: "Kamalpreet",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "Joining Techcadd was a great decision for my career. The structured curriculum, practical sessions, and AI-powered marketing tools helped me build job-ready skills.",
  },
  {
    name: "Harman Kaur",
    rating: 5,
    tag: "Digital Marketing",
    quote:
      "Mohali has a strong learning environment for digital marketing — supportive classroom culture, practical learning, and good student feedback.",
  },
  {
    name: "Eeshu",
    rating: 5,
    tag: "General Training",
    quote: "Very good trainers and the atmosphere here is also great. They teach every concept in a very easy way.",
  },
  {
    name: "Vipul Sharma",
    rating: 5,
    tag: "General Training",
    quote:
      "The trainers here are very humble and kind. They teach concepts in a very easy way, which makes it easier to understand.",
  },
];
