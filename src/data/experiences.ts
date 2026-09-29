export type Experience = {
  id: number;
  category: string;
  title: string;
  summary: string;
  tag: string;
  available?: boolean;
  demoUrl: string;
};

export const experiences: Experience[] = [
  {
    id: 1,
    category: "Engagement",
    title: "The Garden Edit",
    summary: "Botanical engagement invitation with a soft editorial feel.",
    tag: "Invitation",
    available: true,
    demoUrl: "/demo",
  },
  {
    id: 9,
    category: "Wedding",
    title: "Silver Vows",
    summary: "Elegant silver-toned celebration with a timeless romantic mood.",
    tag: "Luxury",
    available: true,
    demoUrl: "/demo/silver",
  },
  {
    id: 10,
    category: "Wedding",
    title: "Laylat Al-Omr",
    summary: "Arabic wedding experience built for a warm, intimate gathering.",
    tag: "Arabic",
    available: true,
    demoUrl: "/demo/arabic",
  },
  {
    id: 11,
    category: "Wedding",
    title: "The Storybook Edit",
    summary: "Story-led wedding invitation with handwritten details and a romantic feel.",
    tag: "Story-led",
    available: true,
    demoUrl: "/demo/mahmoud-shrouk",
  },
  {
    id: 2,
    category: "Engagement",
    title: "The Yes Moment",
    summary: "Interactive proposal story with a ring reveal, yes-or-no choice, and celebration.",
    tag: "Proposal",
    available: true,
    demoUrl: "/the-yes-moment.html",
  },
  {
    id: 3,
    category: "Birthday",
    title: "Birthday Surprise",
    summary: "An interactive birthday experience with a gift reveal, plans, missions, and a countdown.",
    tag: "Birthday",
    available: true,
    demoUrl: "/birthday-surprise-v3.html",
  },
  {
    id: 4,
    category: "Graduation",
    title: "The Next Chapter",
    summary: "A milestone moment with academic energy and celebratory style.",
    tag: "Milestone",
    available: false,
    demoUrl: "#",
  },
  {
    id: 5,
    category: "Events",
    title: "An Evening, Unfolded",
    summary: "A modern event page built around atmosphere and guest flow.",
    tag: "Event",
    available: false,
    demoUrl: "#",
  },
  {
    id: 6,
    category: "Surprise",
    title: "Just Because",
    summary: "A joyful surprise page designed for memorable little moments.",
    tag: "Surprise",
    available: false,
    demoUrl: "#",
  },
];