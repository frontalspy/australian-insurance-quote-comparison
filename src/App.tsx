import { INSURERS } from "./data/insurers";
import Disclaimer from "./features/comparison/components/Disclaimer";
import QuoteTable from "./features/comparison/components/QuoteTable";
import Results from "./features/comparison/components/Results";
import WeightControls from "./features/comparison/components/WeightControls";
import { useComparison } from "./features/comparison/hooks/useComparison";

export default function App() {
  const { quotes, weights, results, setQuote, setWeights } = useComparison();

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 lg:py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Aussie Home Insurance{" "}
          <span className="text-brand">Value Compare</span>
        </h1>
        <p className="mt-1 max-w-2xl text-slate-600">
          Enter the prices you were quoted across Australia's major home
          insurers and see which gives you the best bang for buck — blending
          review-based reputation with policy coverage.
        </p>
      </header>

      <div className="mb-6">
        <Disclaimer />
      </div>

      {/*
        Mobile order: QuoteTable → Results → WeightControls
        Desktop: QuoteTable + WeightControls in left column, Results spans right column
      */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="lg:col-start-1 lg:row-start-1">
          <QuoteTable
            insurers={INSURERS}
            quotes={quotes}
            onQuoteChange={setQuote}
          />
        </div>
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <Results results={results} />
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <WeightControls weights={weights} onWeightsChange={setWeights} />
        </div>
      </div>

      <footer className="mt-10 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
        Curated comparison tool for educational use only · Not financial advice
        · Verify all details in each insurer's PDS.
      </footer>
    </div>
  );
}
