import ScoreBar from "../../../components/ScoreBar";
import type { RankedResult } from "../../../types";

interface Props {
  result: RankedResult;
  rank: number;
  isBest: boolean;
}

interface ValueTier {
  label: string;
  badgeClasses: string;
}

function getValueTier(ratio: number): ValueTier {
  if (ratio >= 65)
    return {
      label: "Bargain",
      badgeClasses: "bg-emerald-100 text-emerald-700",
    };
  if (ratio >= 45)
    return {
      label: "Great Deal",
      badgeClasses: "bg-emerald-100 text-emerald-700",
    };
  if (ratio >= 28)
    return { label: "Good Value", badgeClasses: "bg-amber-100 text-amber-700" };
  if (ratio >= 12)
    return { label: "Fair", badgeClasses: "bg-amber-100 text-amber-700" };
  return { label: "Not Worth It", badgeClasses: "bg-rose-100 text-rose-700" };
}

function satisfactionTextColor(score: number): string {
  if (score >= 70) return "text-emerald-600";
  if (score >= 50) return "text-amber-500";
  return "text-rose-500";
}

function satisfactionBadgeClasses(score: number): string {
  if (score >= 70) return "bg-emerald-100 text-emerald-700";
  if (score >= 50) return "bg-amber-100 text-amber-700";
  return "bg-rose-100 text-rose-700";
}

export default function InsurerCard({ result, rank, isBest }: Props) {
  const {
    insurer,
    satisfactionScore,
    reputationSubScore,
    coverageSubScore,
    price,
    ratio,
  } = result;

  return (
    <li
      className={`rounded-xl border p-5 shadow-sm transition ${
        isBest
          ? "border-brand bg-teal-50 ring-2 ring-brand"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-white">
              {rank}
            </span>
            <h3 className="text-base font-semibold text-slate-800">
              {insurer.name}
            </h3>
            {isBest && (
              <span className="flex items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.166 2.621v.858c-1.035.148-2.059.33-3.075.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.798 49.798 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Best value</span>
              </span>
            )}
          </div>
          {insurer.underwriter && (
            <p className="mt-0.5 text-xs text-slate-400">
              Underwritten by {insurer.underwriter}
            </p>
          )}
        </div>

        <div className="shrink-0 text-right">
          {ratio != null ? (
            (() => {
              const tier = getValueTier(ratio);
              return (
                <span
                  className={`inline-block rounded-full px-3 py-1 text-sm font-bold ${tier.badgeClasses}`}
                >
                  {tier.label}
                </span>
              );
            })()
          ) : (
            <>
              <p
                className={`text-2xl font-bold tabular-nums ${satisfactionTextColor(satisfactionScore)}`}
              >
                {satisfactionScore.toFixed(0)}
                <span className="text-sm font-normal text-slate-400">/100</span>
              </p>
              <p className="text-xs text-slate-400">satisfaction</p>
            </>
          )}
        </div>
      </div>

      {price != null && (
        <div className="mt-3 text-sm">
          <p className="text-slate-600">
            Quote:{" "}
            <strong className="tabular-nums">
              ${price.toLocaleString()}/yr
            </strong>
          </p>
          <p className="mt-1 text-right">
            <span
              className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${satisfactionBadgeClasses(satisfactionScore)}`}
            >
              {satisfactionScore.toFixed(0)}/100 satisfaction
            </span>
          </p>
        </div>
      )}

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <ScoreBar label="Reputation" value={reputationSubScore} />
        <ScoreBar label="Coverage" value={coverageSubScore} />
      </div>
    </li>
  );
}
