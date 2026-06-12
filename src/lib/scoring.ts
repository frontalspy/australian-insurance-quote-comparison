import type {
  CoverageFeatures,
  Insurer,
  Quotes,
  RankedResult,
  ReputationScores,
  Weights,
} from "../types";

/**
 * Default weighting. Reputation is emphasised over coverage (70/30) because the
 * brief centres on user consensus / reviews, with coverage as a secondary
 * factor. Within reputation, claims experience and value-for-money carry the
 * most weight since those dominate review sentiment for insurers.
 *
 * Weights are relative — they are normalised at score time, so the absolute
 * numbers here only matter in proportion to each other.
 */
export const DEFAULT_WEIGHTS: Weights = {
  reputationVsCoverage: {
    reputation: 70,
    coverage: 30,
  },
  reputation: {
    claimsExperience: 30,
    customerService: 20,
    valueForMoney: 25,
    trustReputation: 15,
    digitalExperience: 10,
  },
};

/**
 * Coverage features and the points each contributes when present. Points are
 * relative; the coverage sub-score is normalised to 0–100 against the maximum
 * achievable. `floodOptOutAvailable` is valued lower as it is a flexibility
 * perk rather than core protection.
 */
export const COVERAGE_FEATURES: {
  key: keyof CoverageFeatures;
  label: string;
  points: number;
}[] = [
  {
    key: "floodCoverIncluded",
    label: "Flood cover included as standard",
    points: 5,
  },
  {
    key: "newForOldContents",
    label: "New-for-old contents replacement",
    points: 4,
  },
  {
    key: "temporaryAccommodation",
    label: "Temporary accommodation cover",
    points: 4,
  },
  {
    key: "emergencyRepairs",
    label: "Emergency repairs / make-safe",
    points: 3,
  },
  {
    key: "motorBurnoutDefault",
    label: "Motor burnout cover by default",
    points: 2,
  },
  { key: "flexibleExcessRange", label: "Flexible excess options", points: 2 },
  {
    key: "floodOptOutAvailable",
    label: "Option to opt out of flood cover",
    points: 1,
  },
];

const REPUTATION_KEYS: (keyof ReputationScores)[] = [
  "claimsExperience",
  "customerService",
  "valueForMoney",
  "trustReputation",
  "digitalExperience",
];

const sum = (nums: number[]) => nums.reduce((a, b) => a + b, 0);

/**
 * Reputation sub-score on a 0–100 scale. Weighted average of the five 0–10
 * metrics using the (normalised) reputation weights, then scaled by 10.
 */
export function reputationSubScore(
  reputation: ReputationScores,
  weights: Weights["reputation"]
): number {
  const totalWeight = sum(REPUTATION_KEYS.map((k) => weights[k]));
  if (totalWeight <= 0) return 0;
  const weighted = sum(REPUTATION_KEYS.map((k) => reputation[k] * weights[k]));
  // weighted/totalWeight is 0–10; scale to 0–100.
  return (weighted / totalWeight) * 10;
}

const MAX_COVERAGE_POINTS = sum(COVERAGE_FEATURES.map((f) => f.points));

/** Coverage sub-score on a 0–100 scale from the feature flags. */
export function coverageSubScore(coverage: CoverageFeatures): number {
  if (MAX_COVERAGE_POINTS <= 0) return 0;
  const earned = sum(
    COVERAGE_FEATURES.filter((f) => coverage[f.key]).map((f) => f.points)
  );
  return (earned / MAX_COVERAGE_POINTS) * 100;
}

/**
 * Composite 0–100 satisfaction score blending reputation and coverage
 * sub-scores by the (normalised) reputation-vs-coverage split.
 */
export function satisfactionScore(insurer: Insurer, weights: Weights): number {
  const rep = reputationSubScore(insurer.reputation, weights.reputation);
  const cov = coverageSubScore(insurer.coverage);
  const { reputation, coverage } = weights.reputationVsCoverage;
  const total = reputation + coverage;
  if (total <= 0) return 0;
  return (rep * reputation + cov * coverage) / total;
}

/**
 * Scaling factor for the price-to-value ratio. satisfactionScore/price tends
 * to be a tiny decimal (e.g. 78/1500). Multiplying by 1000 yields a readable
 * number without changing the ranking order.
 */
export const RATIO_SCALE = 1000;

/**
 * Rank insurers. Insurers with a price are ranked by price-to-value ratio
 * (descending — more value per dollar is better). Insurers without a price are
 * appended afterward, ordered by satisfaction score, so they remain visible.
 */
export function rankInsurers(
  insurers: Insurer[],
  quotes: Quotes,
  weights: Weights
): RankedResult[] {
  const results: RankedResult[] = insurers.map((insurer) => {
    const price = quotes[insurer.id] ?? null;
    const sScore = satisfactionScore(insurer, weights);
    const ratio =
      price != null && price > 0 ? (sScore / price) * RATIO_SCALE : null;
    return {
      insurer,
      satisfactionScore: sScore,
      reputationSubScore: reputationSubScore(
        insurer.reputation,
        weights.reputation
      ),
      coverageSubScore: coverageSubScore(insurer.coverage),
      price,
      ratio,
    };
  });

  return results.sort((a, b) => {
    // Both priced: higher ratio wins.
    if (a.ratio != null && b.ratio != null) return b.ratio - a.ratio;
    // Priced entries always rank above unpriced ones.
    if (a.ratio != null) return -1;
    if (b.ratio != null) return 1;
    // Neither priced: fall back to satisfaction score.
    return b.satisfactionScore - a.satisfactionScore;
  });
}
