import { useState } from 'react';
import { DATA_COMPILED } from '../../../data/insurers';

const STORAGE_KEY = 'ahivc.disclaimer.dismissed';

export default function Disclaimer() {
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true',
  );

  if (dismissed) return null;

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setDismissed(true);
  };

  return (
    <div className="relative rounded-lg border border-amber-300 bg-amber-50 p-4 pr-10 text-sm text-amber-900">
      <p className="font-semibold">Heads up — this is a guide, not financial advice.</p>
      <p className="mt-1">
        Value scores are curated estimates blended from public sources
        (ProductReview, CHOICE, Canstar, Finder) as of <strong>{DATA_COMPILED}</strong>.
        They are a starting point for comparison only. Coverage flags reflect
        typical standard-policy inclusions and can change — always confirm
        details and pricing in each insurer's current Product Disclosure
        Statement (PDS) before buying.
      </p>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss disclaimer"
        className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded text-amber-600 hover:bg-amber-100 hover:text-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-400"
      >
        ✕
      </button>
    </div>
  );
}
