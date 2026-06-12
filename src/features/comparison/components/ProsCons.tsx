import type { Insurer } from '../../../types';

interface Props {
  insurer: Insurer;
}

export default function ProsCons({ insurer }: Props) {
  return (
    <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <p className="font-medium text-emerald-700">Pros</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-slate-600">
          {insurer.pros.map((pro) => (
            <li key={pro}>{pro}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="font-medium text-rose-700">Cons</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-slate-600">
          {insurer.cons.map((con) => (
            <li key={con}>{con}</li>
          ))}
        </ul>
      </div>
      <div className="sm:col-span-2">
        <p className="text-xs text-slate-400">
          Sources:{' '}
          {insurer.sources.map((source, i) => (
            <span key={source.url}>
              {i > 0 && ' · '}
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand hover:underline"
              >
                {source.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
