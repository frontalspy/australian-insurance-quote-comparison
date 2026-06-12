import Slider from "../../../components/Slider";
import { DEFAULT_WEIGHTS } from "../../../lib/scoring";
import type { ReputationScores, Weights } from "../../../types";
import { REPUTATION_LABELS } from "../data/reputationLabels";

interface Props {
  weights: Weights;
  onWeightsChange: (weights: Weights) => void;
}

export default function WeightControls({ weights, onWeightsChange }: Props) {
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
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Adjust the weighting
        </h2>
        <button
          type="button"
          onClick={() => onWeightsChange(DEFAULT_WEIGHTS)}
          className="text-sm font-medium text-brand hover:text-brand-dark"
        >
          Reset to defaults
        </button>
      </div>
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
    </section>
  );
}
