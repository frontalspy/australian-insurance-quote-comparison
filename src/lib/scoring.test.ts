import { describe, expect, it } from "vitest";
import type { CoverageFeatures, Insurer, ReputationScores } from "../types";
import {
  COVERAGE_FEATURES,
  coverageSubScore,
  DEFAULT_WEIGHTS,
  RATIO_SCALE,
  rankInsurers,
  reputationSubScore,
  satisfactionScore,
} from "./scoring";

const flatReputation: ReputationScores = {
  claimsExperience: 8,
  customerService: 8,
  valueForMoney: 8,
  trustReputation: 8,
  digitalExperience: 8,
};

const allCoverage: CoverageFeatures = {
  floodCoverIncluded: true,
  floodOptOutAvailable: true,
  newForOldContents: true,
  temporaryAccommodation: true,
  motorBurnoutDefault: true,
  emergencyRepairs: true,
  flexibleExcessRange: true,
};

const noCoverage: CoverageFeatures = {
  floodCoverIncluded: false,
  floodOptOutAvailable: false,
  newForOldContents: false,
  temporaryAccommodation: false,
  motorBurnoutDefault: false,
  emergencyRepairs: false,
  flexibleExcessRange: false,
};

function makeInsurer(
  id: string,
  reputation: ReputationScores,
  coverage: CoverageFeatures
): Insurer {
  return {
    id,
    name: id,
    reputation,
    coverage,
    pros: [],
    cons: [],
    sources: [],
  };
}

describe("reputationSubScore", () => {
  it("scales a flat 8/10 across all metrics to 80/100", () => {
    expect(
      reputationSubScore(flatReputation, DEFAULT_WEIGHTS.reputation)
    ).toBeCloseTo(80);
  });

  it("respects relative weights", () => {
    const rep: ReputationScores = {
      claimsExperience: 10,
      customerService: 0,
      valueForMoney: 0,
      trustReputation: 0,
      digitalExperience: 0,
    };
    // Only claims weight (30 of 100) is non-zero contributor -> 10*30/100 = 3 (0-10) -> 30/100
    expect(reputationSubScore(rep, DEFAULT_WEIGHTS.reputation)).toBeCloseTo(30);
  });

  it("returns 0 when all weights are 0", () => {
    const zero = { ...DEFAULT_WEIGHTS.reputation };
    for (const k of Object.keys(zero) as (keyof ReputationScores)[]) {
      zero[k] = 0;
    }
    expect(reputationSubScore(flatReputation, zero)).toBe(0);
  });
});

describe("coverageSubScore", () => {
  it("is 100 with all features and 0 with none", () => {
    expect(coverageSubScore(allCoverage)).toBeCloseTo(100);
    expect(coverageSubScore(noCoverage)).toBe(0);
  });

  it("reflects partial coverage proportionally to points", () => {
    const max = COVERAGE_FEATURES.reduce((a, f) => a + f.points, 0);
    const single: CoverageFeatures = {
      ...noCoverage,
      floodCoverIncluded: true,
    };
    const expected = (5 / max) * 100;
    expect(coverageSubScore(single)).toBeCloseTo(expected);
  });
});

describe("satisfactionScore", () => {
  it("blends reputation and coverage by the split", () => {
    const insurer = makeInsurer("x", flatReputation, allCoverage);
    // reputation 80, coverage 100, split 70/30 -> 0.7*80 + 0.3*100 = 86
    expect(satisfactionScore(insurer, DEFAULT_WEIGHTS)).toBeCloseTo(86);
  });
});

describe("rankInsurers", () => {
  const high = makeInsurer("high", flatReputation, allCoverage); // value 86
  const low = makeInsurer(
    "low",
    { ...flatReputation, claimsExperience: 2, valueForMoney: 2 },
    noCoverage
  );

  it("ranks by price-to-value ratio, best value first", () => {
    // Give the lower-value insurer a much cheaper price so it should win on ratio.
    const ranked = rankInsurers(
      [high, low],
      { high: 2000, low: 500 },
      DEFAULT_WEIGHTS
    );
    expect(ranked[0].insurer.id).toBe("low");
    expect(ranked[0].ratio).toBeGreaterThan(ranked[1].ratio ?? 0);
  });

  it("prefers the better-value insurer when prices are equal", () => {
    const ranked = rankInsurers(
      [low, high],
      { high: 1500, low: 1500 },
      DEFAULT_WEIGHTS
    );
    expect(ranked[0].insurer.id).toBe("high");
  });

  it("excludes blank quotes from ratio ranking but keeps them after priced ones", () => {
    const ranked = rankInsurers(
      [high, low],
      { high: null, low: 1000 },
      DEFAULT_WEIGHTS
    );
    expect(ranked[0].insurer.id).toBe("low");
    expect(ranked[0].ratio).not.toBeNull();
    expect(ranked[1].insurer.id).toBe("high");
    expect(ranked[1].ratio).toBeNull();
  });

  it("computes ratio as scaled satisfactionScore / price", () => {
    const ranked = rankInsurers([high], { high: 1000 }, DEFAULT_WEIGHTS);
    expect(ranked[0].ratio).toBeCloseTo((86 / 1000) * RATIO_SCALE);
  });
});
