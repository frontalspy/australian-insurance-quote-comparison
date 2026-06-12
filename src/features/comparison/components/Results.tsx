import { useState } from "react";
import type { RankedResult } from "../../../types";
import InsurerCard from "./InsurerCard";

interface Props {
  results: RankedResult[];
}

const FOLD_COUNT = 9;

export default function Results({ results }: Props) {
  const [expanded, setExpanded] = useState(false);

  const pricedResults = results.filter((r) => r.ratio != null);
  const unpricedResults = results.filter((r) => r.ratio == null);

  const anyPriced = pricedResults.length > 0;

  // Always show all priced. Fold applies only to the unpriced group, keeping
  // combined visible count around FOLD_COUNT.
  const unpricedFoldCount = Math.max(3, FOLD_COUNT - pricedResults.length);
  const hasMore = unpricedResults.length > unpricedFoldCount;
  const hiddenCount = unpricedResults.length - unpricedFoldCount;
  const unpricedAboveFold = unpricedResults.slice(0, unpricedFoldCount);
  const unpricedPeek = unpricedResults[unpricedFoldCount] ?? null;
  const unpricedBelowFold = unpricedResults.slice(unpricedFoldCount + 1);

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-800">Results</h2>
      <p className="mt-1 text-sm text-slate-500">
        {anyPriced
          ? "Ranked by value — satisfaction score shown for comparison."
          : "Enter at least one quote above to rank by value. Insurers below are sorted by satisfaction score."}
      </p>

      {anyPriced && (
        <ol className="mt-3 space-y-3">
          {pricedResults.map((result, i) => (
            <InsurerCard
              key={result.insurer.id}
              result={result}
              rank={i + 1}
              isBest={i === 0}
            />
          ))}
        </ol>
      )}

      {unpricedResults.length > 0 && (
        <>
          <div className="relative my-5 flex items-center">
            <div className="flex-grow border-t border-slate-200" />
            <span className="mx-3 whitespace-nowrap text-xs text-slate-400">
              No quote entered — sorted by satisfaction
            </span>
            <div className="flex-grow border-t border-slate-200" />
          </div>

          <ol className="space-y-3">
            {unpricedAboveFold.map((result, i) => (
              <InsurerCard
                key={result.insurer.id}
                result={result}
                rank={pricedResults.length + i + 1}
                isBest={false}
              />
            ))}
            {expanded &&
              unpricedBelowFold.map((result, i) => (
                <InsurerCard
                  key={result.insurer.id}
                  result={result}
                  rank={pricedResults.length + unpricedFoldCount + 1 + i + 1}
                  isBest={false}
                />
              ))}
          </ol>

          {!expanded && hasMore && unpricedPeek && (
            <>
              <div
                className="relative mt-3 overflow-hidden"
                style={{ maxHeight: "3.5rem" }}
              >
                <ol>
                  <InsurerCard
                    result={unpricedPeek}
                    rank={pricedResults.length + unpricedFoldCount + 1}
                    isBest={false}
                  />
                </ol>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-[#f8fafc]" />
              </div>
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="mt-3 w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand"
              >
                Show {hiddenCount} more insurer result
                {hiddenCount !== 1 ? "s" : ""}
              </button>
            </>
          )}
        </>
      )}
    </section>
  );
}
