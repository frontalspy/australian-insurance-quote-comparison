// Core domain types for the insurance comparison app.

/** The five review/reputation metrics, each scored 0–10. */
export interface ReputationScores {
  claimsExperience: number;
  customerService: number;
  valueForMoney: number;
  trustReputation: number;
  digitalExperience: number;
}

/**
 * Coverage feature flags. Each true flag contributes points to the coverage
 * sub-score (see COVERAGE_FEATURES in scoring.ts for weights/labels).
 */
export interface CoverageFeatures {
  /** Flood cover automatically included in standard policy. */
  floodCoverIncluded: boolean;
  /** Customer can opt out of flood cover to reduce premium. */
  floodOptOutAvailable: boolean;
  /** Contents replaced new-for-old rather than depreciated value. */
  newForOldContents: boolean;
  /** Temporary accommodation paid if home is uninhabitable. */
  temporaryAccommodation: boolean;
  /** Motor burnout / fusion of electric motors covered by default. */
  motorBurnoutDefault: boolean;
  /** Emergency repairs / make-safe covered after an insured event. */
  emergencyRepairs: boolean;
  /** Flexible/adjustable excess to tune the premium. */
  flexibleExcessRange: boolean;
}

export interface Source {
  label: string;
  url: string;
}

export interface Insurer {
  id: string;
  name: string;
  /** Underwriter / parent group, disclosed for transparency. */
  underwriter?: string;
  reputation: ReputationScores;
  coverage: CoverageFeatures;
  pros: string[];
  cons: string[];
  sources: Source[];
}

export type ReputationWeights = ReputationScores;

/** All user-adjustable weighting knobs. */
export interface Weights {
  /** Reputation vs coverage split. The two are normalised so they sum to 1. */
  reputationVsCoverage: {
    reputation: number;
    coverage: number;
  };
  /** Relative weight of each reputation metric (normalised internally). */
  reputation: ReputationWeights;
}

/** Map of insurer id -> quoted annual premium in AUD (or null if blank). */
export type Quotes = Record<string, number | null>;

export interface RankedResult {
  insurer: Insurer;
  /** 0–100 composite satisfaction score (reputation + coverage blend). */
  satisfactionScore: number;
  reputationSubScore: number; // 0–100
  coverageSubScore: number; // 0–100
  /** Quoted price in AUD, or null if the user left it blank. */
  price: number | null;
  /**
   * Price-to-value ratio = satisfactionScore / price, scaled for readability.
   * null when no price was entered.
   */
  ratio: number | null;
}
