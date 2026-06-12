import { useState } from "react";
import Slider from "../../../components/Slider";
import { DEFAULT_WEIGHTS } from "../../../lib/scoring";
import type { ReputationScores, Weights } from "../../../types";
import { REPUTATION_LABELS } from "../data/reputationLabels";

interface Props {
  weights: Weights;
  onWeightsChange: (weights: Weights) => void;
}

export default function WeightControls({ weights, onWeightsChange }: Props) {
  const [expanded, setExpanded] = useState(false);

  const { reputation, coverage } = weights.reputationVsCoverage;
  const total = reputation + coverage || 1;
  const repPct = Math.round((reputation / total) * 100);

  const setSplit = (reputationPct: number) =>
    onWeightsChange({
      ...weights,
      reputationVsCoverage: {
        reputation: reputationPct,
        coverage: 100 - reputationPct,
      },
    });

  const setReputationMetric = (key: keyof ReputationScores, value: number) =>
    onWeightsChange({
      ...weights,
      reputation: { ...weights.reputation, [key]: value },
    });

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-800">
          Adjust the weighting
        </h2>
        <button
          type="button"
          onClick={() => setExpanded((p) => !p)}
          aria-expanded={expanded}
          className="flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-dark lg:hidden"
        >
          {expanded ? "Hide" : "Customise"}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div className={expanded ? undefined : "hidden lg:block"}>
        <p className="mt-1 text-sm text-slate-500">
          Tune what "value" means to you. Results update instantly.
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm font-medium text-slate-700">
            <span>Reputation {repPct}%</span>
            <span>Coverage {100 - repPct}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={repPct}
            onChange={(e) => setSplit(Number(e.target.value))}
            className="mt-1 w-full accent-brand"
            aria-label="Reputation vs coverage balance"
          />
        </div>

        <div className="mt-5">
          <h3 className="text-sm font-semibold text-slate-700">
            Reputation breakdown
          </h3>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {REPUTATION_LABELS.map(({ key, label }) => (
              <Slider
                key={key}
                label={label}
                value={weights.reputation[key]}
                max={50}
                onChange={(value) => setReputationMetric(key, value)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => onWeightsChange(DEFAULT_WEIGHTS)}
            className="text-sm font-medium text-brand hover:text-brand-dark"
          >
            Reset to defaults
          </button>
        </div>
      </div>
    </section>
  );
}
