import type { Insurer, Quotes } from '../../../types';
import QuoteRow from './QuoteRow';

interface Props {
  insurers: Insurer[];
  quotes: Quotes;
  onQuoteChange: (id: string, value: number | null) => void;
}

export default function QuoteTable({ insurers, quotes, onQuoteChange }: Props) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">Enter your quotes</h2>
      <p className="mt-1 text-sm text-slate-500">
        Pop in the annual premium each insurer quoted you. Leave blank to skip —
        only quoted insurers are ranked by value for money.
      </p>
      <ul className="mt-3">
        {insurers.map((insurer) => (
          <QuoteRow
            key={insurer.id}
            insurer={insurer}
            quotedPrice={quotes[insurer.id] ?? null}
            onPriceChange={onQuoteChange}
          />
        ))}
      </ul>
    </section>
  );
}
