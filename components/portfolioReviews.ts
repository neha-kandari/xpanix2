export type PortfolioReview = {
  company: string;
  category: string;
  quote: string;
  initials: string;
  /** gradient stops for the avatar chip */
  from: string;
  to: string;
};

/** Genuine sounding reviews from the brands whose projects appear in the
    Xpanix portfolio. Company name only, no individual person names. */
export const portfolioReviews: PortfolioReview[] = [
  {
    company: "Rudraksh Travels",
    category: "Travel Agency",
    quote:
      "Our new website finally reflects the quality of our tour packages. Booking enquiries have gone up since it went live, and travellers often mention how easy it is to use.",
    initials: "RT",
    from: "#F59E0B",
    to: "#EA580C",
  },
  {
    company: "Tripsee",
    category: "Travel Platform",
    quote:
      "The platform is fast, clean, and genuinely easy for our users. From destination pages to the booking flow, everything just works the way we hoped it would.",
    initials: "TS",
    from: "#06B6D4",
    to: "#2563EB",
  },
  {
    company: "Ruhani Trips",
    category: "Travel Agency",
    quote:
      "They delivered a website that looks premium and loads quickly. Communication stayed smooth from the first call to launch, exactly the partner we needed.",
    initials: "RH",
    from: "#10B981",
    to: "#0EA5E9",
  },
  {
    company: "Perfect Plastotech",
    category: "Manufacturing",
    quote:
      "A professional corporate website that represents our brand the right way. The team was responsive and shipped on time, with no back and forth.",
    initials: "PP",
    from: "#764BA2",
    to: "#667EEA",
  },
  {
    company: "Nagpal Tours & Travels",
    category: "Travel Agency",
    quote:
      "We needed an online presence that tells our story, and that is exactly what we got. The design is clean and the enquiries keep coming in.",
    initials: "NT",
    from: "#6366F1",
    to: "#8B5CF6",
  },
  {
    company: "Rajasthan Auto Distributors",
    category: "Auto Distribution",
    quote:
      "The website actually brings in leads. Straightforward process, clear communication, and a result that feels solid and reliable for our business.",
    initials: "RA",
    from: "#F59E0B",
    to: "#D97706",
  },
  {
    company: "WoodyPolo",
    category: "Ecommerce",
    quote:
      "Our online store looks premium and the shopping experience is smooth. Sales have grown steadily since launch and the site has been rock solid.",
    initials: "WP",
    from: "#EF4444",
    to: "#B91C1C",
  },
  {
    company: "Chinar Logistics",
    category: "Logistics",
    quote:
      "The quote request flow they designed made it far easier for clients to reach us. Fast, conversion focused, and exactly what our business needed.",
    initials: "CL",
    from: "#10B981",
    to: "#059669",
  },
  {
    company: "Opal Institute",
    category: "Education",
    quote:
      "Course discovery and admissions are so much simpler now. Student enquiries have increased and the whole site feels modern and trustworthy.",
    initials: "OI",
    from: "#EC4899",
    to: "#A855F7",
  },
  {
    company: "Pmake",
    category: "Brand Studio",
    quote:
      "A clean, fast website that gave our brand instant credibility. The team was easy to work with from start to finish, highly recommended.",
    initials: "PM",
    from: "#0EA5E9",
    to: "#6366F1",
  },
];
