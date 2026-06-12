import { useState } from "react";
import type { Insurer, Quotes } from "../../../types";
import QuoteRow from "./QuoteRow";

interface Props {
  insurers: Insurer[];
  quotes: Quotes;
  onQuoteChange: (id: string, value: number | null) => void;
}

export default function QuoteTable({ insurers, quotes, onQuoteChange }: Props) {
  const [search, setSearch] = useState("");

  const term = search.trim().toLowerCase();
  const visible = term
    ? insurers.filter((i) => i.name.toLowerCase().includes(term))
    : insurers;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-800">
        Enter your quotes
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Pop in the annual premium each insurer quoted you. Leave blank to skip —
        only quoted insurers are ranked by value for money.
      </p>

      <div className="relative mt-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search insurers…"
          aria-label="Filter insurers by name"
          className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
        />
      </div>

      <ul className="mt-2">
        {visible.length > 0 ? (
          visible.map((insurer) => (
            <QuoteRow
              key={insurer.id}
              insurer={insurer}
              quotedPrice={quotes[insurer.id] ?? null}
              onPriceChange={onQuoteChange}
            />
          ))
        ) : (
          <li className="py-6 text-center text-sm text-slate-400">
            No insurers match "{search.trim()}"
          </li>
        )}
      </ul>
    </section>
  );
}
