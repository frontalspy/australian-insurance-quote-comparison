import { INSURERS } from './data/insurers';
import { useComparison } from './features/comparison/hooks/useComparison';
import Disclaimer from './features/comparison/components/Disclaimer';
import QuoteTable from './features/comparison/components/QuoteTable';
import WeightControls from './features/comparison/components/WeightControls';
import Results from './features/comparison/components/Results';

export default function App() {
  const { quotes, weights, results, setQuote, setWeights } = useComparison();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Aussie Home Insurance{' '}
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

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <QuoteTable insurers={INSURERS} quotes={quotes} onQuoteChange={setQuote} />
          <WeightControls weights={weights} onWeightsChange={setWeights} />
        </div>
        <Results results={results} />
      </div>

      <footer className="mt-10 border-t border-slate-200 pt-4 text-center text-xs text-slate-400">
        Curated comparison tool for educational use only · Not financial advice ·
        Verify all details in each insurer's PDS.
      </footer>
    </div>
  );
}
