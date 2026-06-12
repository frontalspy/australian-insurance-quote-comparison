import type { Insurer } from "../types";

/**
 * Date this dataset was compiled. Shown in the UI so users know how fresh the
 * curated scores are.
 */
export const DATA_COMPILED = "June 2026";

/**
 * Curated dataset of major Australian home & contents insurers.
 *
 * IMPORTANT — how to read (and edit) these scores:
 *  - `reputation` metrics are 0–10 ESTIMATES blended by hand from several public
 *    sources: ProductReview.com.au aggregate star ratings, CHOICE customer
 *    satisfaction surveys, Canstar Outstanding Value / Most Satisfied Customers
 *    awards, and Finder awards. They are a starting point for comparison, NOT
 *    authoritative ratings and NOT financial advice.
 *  - ProductReview scores skew negative (people review after a bad claim), so
 *    they are tempered against satisfaction surveys and value awards rather than
 *    used raw.
 *  - `coverage` flags reflect typical standard-policy inclusions and may change;
 *    always confirm against the current Product Disclosure Statement (PDS).
 *  - Every number here is meant to be edited. Adjust to taste — the scoring
 *    engine and UI react automatically.
 */
export const INSURERS: Insurer[] = [
  {
    id: "aami",
    name: "AAMI",
    underwriter: "Suncorp Group",
    reputation: {
      claimsExperience: 7,
      customerService: 6,
      valueForMoney: 7.5,
      trustReputation: 7.5,
      digitalExperience: 7,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Among the best for claims experience in CHOICE surveys",
      'Canstar/Finder "best value" award winner',
      "Good digital tools and broad availability",
    ],
    cons: [
      "Customer service ratings only middling",
      "Some optional extras cost more",
    ],
    sources: [
      {
        label: "ProductReview — AAMI Home",
        url: "https://www.productreview.com.au/listings/aami-home-building-insurance",
      },
      {
        label: "Canstar Home & Contents Awards",
        url: "https://www.canstar.com.au/star-ratings-awards/home-and-contents-insurance/",
      },
    ],
  },
  {
    id: "allianz",
    name: "Allianz",
    underwriter: "Allianz Australia",
    reputation: {
      claimsExperience: 5.5,
      customerService: 5,
      valueForMoney: 6.5,
      trustReputation: 7.5,
      digitalExperience: 6,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      'Canstar "best comprehensive" / Outstanding Value winner',
      "Large global insurer with strong financial backing",
    ],
    cons: [
      "Lowest customer satisfaction of the big brands in CHOICE survey",
      "Lower ProductReview sentiment",
    ],
    sources: [
      {
        label: "ProductReview — Allianz Home",
        url: "https://www.productreview.com.au/listings/allianz-home-insurance",
      },
      {
        label: "CHOICE big-insurer comparison",
        url: "https://www.choice.com.au/money/insurance/insurance-advice/articles/allianz-nrma-qbe-aami-gio-and-suncorp-insurance-compared",
      },
    ],
  },
  {
    id: "apia",
    name: "APIA",
    underwriter: "Suncorp Group",
    reputation: {
      claimsExperience: 7,
      customerService: 6.5,
      valueForMoney: 5.5,
      trustReputation: 7,
      digitalExperience: 5.5,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Top-rated for claims expectations met in CHOICE survey",
      "Tailored to over-50s with relevant benefits",
    ],
    cons: [
      "Eligibility skewed to over-50s",
      "Low raw ProductReview score; pricing not the cheapest",
    ],
    sources: [
      {
        label: "ProductReview — APIA Home",
        url: "https://www.productreview.com.au/listings/apia-home-insurance",
      },
      {
        label: "CHOICE claims satisfaction",
        url: "https://www.choice.com.au/money/insurance/insurance-advice/articles/allianz-nrma-qbe-aami-gio-and-suncorp-insurance-compared",
      },
    ],
  },
  {
    id: "australia-post",
    name: "Australia Post Home Insurance",
    underwriter: "Auto & General",
    reputation: {
      claimsExperience: 6.5,
      customerService: 7,
      valueForMoney: 7,
      trustReputation: 7,
      digitalExperience: 7,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Trusted Australia Post brand with decent ProductReview score",
      "Competitive pricing (underwritten by Auto & General)",
    ],
    cons: [
      "Cover is essentially a re-badged budget product",
      "Limited differentiation on features",
    ],
    sources: [
      {
        label: "ProductReview — Australia Post Home",
        url: "https://www.productreview.com.au/listings/australia-post-home-insurance",
      },
      {
        label: "Finder best home insurance",
        url: "https://www.finder.com.au/home-insurance/best-home-insurance",
      },
    ],
  },
  {
    id: "budget-direct",
    name: "Budget Direct",
    underwriter: "Auto & General",
    reputation: {
      claimsExperience: 6.5,
      customerService: 7,
      valueForMoney: 8.5,
      trustReputation: 6.5,
      digitalExperience: 7.5,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Consistently among the cheapest full-cover policies",
      "Finder Customer Satisfaction award winner",
      "Higher ProductReview rating than most big brands",
    ],
    cons: [
      "No-frills brand — fewer branches / face-to-face support",
      "Add-ons needed for some cover others include",
    ],
    sources: [
      {
        label: "ProductReview — Budget Direct",
        url: "https://www.productreview.com.au/listings/budget-direct-home-contents-insurance",
      },
      {
        label: "Finder cheapest home insurance",
        url: "https://www.finder.com.au/home-insurance/cheap-home-insurance",
      },
    ],
  },
  {
    id: "coles",
    name: "Coles Insurance",
    underwriter: "IAG",
    reputation: {
      claimsExperience: 5.5,
      customerService: 5,
      valueForMoney: 6.5,
      trustReputation: 6,
      digitalExperience: 6,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: false,
    },
    pros: [
      "Flybuys points and supermarket discounts",
      "Backed by IAG underwriting",
    ],
    cons: [
      "Low ProductReview score",
      "Service and claims sentiment below average",
    ],
    sources: [
      {
        label: "ProductReview — Coles Home",
        url: "https://www.productreview.com.au/listings/coles-home-building-and-contents",
      },
      {
        label: "Finder best home insurance",
        url: "https://www.finder.com.au/home-insurance/best-home-insurance",
      },
    ],
  },
  {
    id: "commbank",
    name: "CommBank Home Insurance",
    underwriter: "Hollard Insurance Partners",
    reputation: {
      claimsExperience: 3,
      customerService: 3.5,
      valueForMoney: 4,
      trustReputation: 7,
      digitalExperience: 6.5,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Backed by the trusted CommBank brand and easy to bundle with CBA banking",
      "Some customers report quick payouts when claims are straightforward",
    ],
    cons: [
      "Very low ProductReview score (1.3/5 from ~500 reviews) — among the worst of major insurers",
      "Widespread complaints of claims delays and difficulty reaching Hollard (the actual underwriter)",
      "Significant premium increases reported in recent years",
    ],
    sources: [
      {
        label: "ProductReview — CBA Home Insurance",
        url: "https://www.productreview.com.au/listings/cbainsurance-home-insurance",
      },
      {
        label: "CommBank Home Insurance page",
        url: "https://www.commbank.com.au/insurance/home-insurance.html",
      },
    ],
  },
  {
    id: "everyday",
    name: "Everyday Insurance (Woolworths)",
    underwriter: "Hollard",
    reputation: {
      claimsExperience: 5,
      customerService: 5,
      valueForMoney: 6.5,
      trustReputation: 6,
      digitalExperience: 6,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: false,
    },
    pros: [
      "Everyday Rewards points and supermarket-linked discounts",
      "Often competitively priced",
    ],
    cons: [
      "Low ProductReview score",
      "Claims and service sentiment below average",
    ],
    sources: [
      {
        label: "ProductReview — Everyday Home",
        url: "https://www.productreview.com.au/listings/everyday-home-and-contents-insurance",
      },
      {
        label: "Finder best home insurance",
        url: "https://www.finder.com.au/home-insurance/best-home-insurance",
      },
    ],
  },
  {
    id: "gio",
    name: "GIO",
    underwriter: "Suncorp Group",
    reputation: {
      claimsExperience: 6,
      customerService: 6,
      valueForMoney: 6,
      trustReputation: 7,
      digitalExperience: 6,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Second-highest customer satisfaction in CHOICE survey (76%)",
      "Solid comprehensive cover from a major group",
    ],
    cons: [
      "Low raw ProductReview score",
      "Less competitive on price than budget insurers",
    ],
    sources: [
      {
        label: "ProductReview — GIO Home",
        url: "https://www.productreview.com.au/listings/gio-home-and-contents",
      },
      {
        label: "CHOICE big-insurer comparison",
        url: "https://www.choice.com.au/money/insurance/insurance-advice/articles/allianz-nrma-qbe-aami-gio-and-suncorp-insurance-compared",
      },
    ],
  },
  {
    id: "honey",
    name: "Honey Insurance",
    underwriter: "RACQ / Honey",
    reputation: {
      claimsExperience: 5.5,
      customerService: 5.5,
      valueForMoney: 6.5,
      trustReputation: 5.5,
      digitalExperience: 8,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Free smart home sensors and a premium discount for using them",
      "Modern, fully digital onboarding experience",
    ],
    cons: [
      "Newer insurtech with a shorter track record",
      "Mixed early ProductReview sentiment",
    ],
    sources: [
      {
        label: "ProductReview — Honey Insurance",
        url: "https://www.productreview.com.au/listings/honey-insurance",
      },
      {
        label: "Finder best home insurance",
        url: "https://www.finder.com.au/home-insurance/best-home-insurance",
      },
    ],
  },
  {
    id: "nrma",
    name: "NRMA Insurance",
    underwriter: "IAG",
    reputation: {
      claimsExperience: 6,
      customerService: 5.5,
      valueForMoney: 6,
      trustReputation: 8,
      digitalExperience: 6.5,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: true,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Strong, trusted brand especially in NSW/ACT",
      "Comprehensive standard cover and flexible excess",
      'Finder "most loved" for customer satisfaction',
    ],
    cons: [
      "Premiums trend higher than budget insurers",
      "Mixed online review sentiment around claims delays",
    ],
    sources: [
      {
        label: "ProductReview — NRMA Home",
        url: "https://www.productreview.com.au/listings/nrma-home-insurance",
      },
      {
        label: "CHOICE insurer trust survey",
        url: "https://www.choice.com.au/money/insurance/insurance-advice/articles/which-insurers-do-australians-trust-the-most",
      },
    ],
  },
  {
    id: "qbe",
    name: "QBE",
    underwriter: "QBE Insurance",
    reputation: {
      claimsExperience: 7,
      customerService: 7.5,
      valueForMoney: 7.5,
      trustReputation: 7.5,
      digitalExperience: 6.5,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: false,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "High ProductReview rating (~4.5/5) — rare among big insurers",
      "Canstar Outstanding Value winner across several states",
    ],
    cons: [
      "Less of a household consumer brand",
      "Quotes can vary widely by region",
    ],
    sources: [
      {
        label: "ProductReview — QBE Home",
        url: "https://www.productreview.com.au/listings/qbe-home-and-contents-insurance",
      },
      {
        label: "Canstar Home & Contents Awards",
        url: "https://www.canstar.com.au/star-ratings-awards/home-and-contents-insurance/",
      },
    ],
  },
  {
    id: "qantas",
    name: "Qantas Home Insurance",
    underwriter: "Auto & General",
    reputation: {
      claimsExperience: 3,
      customerService: 3.5,
      valueForMoney: 5,
      trustReputation: 6.5,
      digitalExperience: 6.5,
    },
    coverage: {
      floodCoverIncluded: false,
      floodOptOutAvailable: false,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Earn Qantas Points on your premium — appealing for frequent flyers",
      "Up to 30% discount when buying online and bundling building + contents",
      "Underwritten by Auto & General (same as Budget Direct)",
    ],
    cons: [
      "Very low ProductReview score (1.2/5) with near-universal negative sentiment",
      "Flood cover is NOT included as standard — costs extra",
      "Customer service representatives are offshore; claims described as slow and adversarial",
    ],
    sources: [
      {
        label: "ProductReview — Qantas Home Insurance",
        url: "https://www.productreview.com.au/listings/qantas-home-insurance",
      },
      {
        label: "Finder — Qantas Home Insurance review",
        url: "https://www.finder.com.au/home-insurance/qantas-home-insurance",
      },
    ],
  },
  {
    id: "racv",
    name: "RACV",
    underwriter: "IAG",
    reputation: {
      claimsExperience: 6,
      customerService: 6,
      valueForMoney: 5.5,
      trustReputation: 7.5,
      digitalExperience: 6,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Strong member trust and brand reputation in Victoria",
      "Member benefits and multi-policy discounts",
    ],
    cons: [
      "Best value mainly for Victorians / members",
      "Premiums not the cheapest",
    ],
    sources: [
      {
        label: "ProductReview — RACV Home",
        url: "https://www.productreview.com.au/listings/racv-home-and-contents",
      },
      {
        label: "Canstar Home & Contents Awards",
        url: "https://www.canstar.com.au/star-ratings-awards/home-and-contents-insurance/",
      },
    ],
  },
  {
    id: "suncorp",
    name: "Suncorp",
    underwriter: "Suncorp Group",
    reputation: {
      claimsExperience: 6.5,
      customerService: 6.5,
      valueForMoney: 6,
      trustReputation: 7.5,
      digitalExperience: 6.5,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: false,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Highest overall customer satisfaction in CHOICE survey (77%)",
      "Strong presence in QLD and comprehensive cover",
    ],
    cons: [
      "Low raw ProductReview score",
      "Premiums can be high in disaster-prone areas",
    ],
    sources: [
      {
        label: "ProductReview — Suncorp Home",
        url: "https://www.productreview.com.au/listings/suncorp-home-insurance",
      },
      {
        label: "CHOICE satisfaction survey",
        url: "https://www.choice.com.au/money/insurance/insurance-advice/articles/allianz-nrma-qbe-aami-gio-and-suncorp-insurance-compared",
      },
    ],
  },
  {
    id: "youi",
    name: "Youi",
    underwriter: "Youi Australia",
    reputation: {
      claimsExperience: 7,
      customerService: 7.5,
      valueForMoney: 6.5,
      trustReputation: 6.5,
      digitalExperience: 8,
    },
    coverage: {
      floodCoverIncluded: true,
      floodOptOutAvailable: true,
      newForOldContents: true,
      temporaryAccommodation: true,
      motorBurnoutDefault: true,
      emergencyRepairs: true,
      flexibleExcessRange: true,
    },
    pros: [
      "Canstar 2025 Most Satisfied Customers award winner",
      "Tailored, personalised quotes and strong service reputation",
      "Good ProductReview score relative to peers",
    ],
    cons: ["Detailed quote process takes longer", "Not always the cheapest"],
    sources: [
      {
        label: "ProductReview — Youi Home",
        url: "https://www.productreview.com.au/listings/youi-home-and-contents",
      },
      {
        label: "Canstar Most Satisfied Customers",
        url: "https://www.canstar.com.au/star-ratings-awards/most-satisfied-customers-home-insurer-awards/",
      },
    ],
  },
];
