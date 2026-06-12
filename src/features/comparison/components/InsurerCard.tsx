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
              <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
                Best value
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
