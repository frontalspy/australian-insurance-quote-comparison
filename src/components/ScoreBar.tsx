interface Props {
  label: string;
  value: number;
}

export default function ScoreBar({ label, value }: Props) {
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500">
        <span>{label}</span>
        <span className="tabular-nums">{value.toFixed(0)}</span>
      </div>
      <div className="mt-0.5 h-1.5 w-full rounded-full bg-slate-100">
        <div
          className="h-1.5 rounded-full bg-brand"
          style={{ width: `${Math.min(100, value)}%` }}
        />
      </div>
    </div>
  );
}
