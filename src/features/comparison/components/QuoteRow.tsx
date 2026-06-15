import { useState } from "react";
import type { Insurer } from "../../../types";
import ProsCons from "./ProsCons";

interface Props {
  insurer: Insurer;
  quotedPrice: number | null;
  onPriceChange: (id: string, value: number | null) => void;
}

export default function QuoteRow({
  insurer,
  quotedPrice,
  onPriceChange,
}: Props) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li className="border-b border-slate-100 py-3 last:border-b-0">
      <div className="flex flex-col gap-2 min-[400px]:flex-row min-[400px]:items-center min-[400px]:gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-medium text-slate-800">{insurer.name}</p>
          {insurer.underwriter && (
            <p className="text-xs text-slate-400">
              Underwritten by {insurer.underwriter}
            </p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 min-[400px]:justify-start">
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-slate-400">
              $
            </span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              placeholder="Annual"
              value={quotedPrice ?? ""}
              aria-label={`Annual premium for ${insurer.name}`}
              onChange={(e) =>
                onPriceChange(
                  insurer.id,
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className="w-24 rounded-md border border-slate-300 py-1.5 pl-5 pr-2 text-right tabular-nums focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand sm:w-28"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            aria-expanded={showDetails}
            aria-label={`${showDetails ? "Hide" : "Show"} pros and cons for ${insurer.name}`}
            className="text-sm text-brand hover:text-brand-dark"
          >
            {showDetails ? "Hide" : "Pros/cons"}
          </button>
        </div>
      </div>
      {showDetails && <ProsCons insurer={insurer} />}
    </li>
  );
}
