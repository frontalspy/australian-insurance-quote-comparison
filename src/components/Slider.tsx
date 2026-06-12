interface Props {
  label: string;
  value: number;
  max: number;
  onChange: (value: number) => void;
}

export default function Slider({ label, value, max, onChange }: Props) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-700">{label}</span>
        <span className="tabular-nums font-medium text-slate-500">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-brand"
      />
    </label>
  );
}
