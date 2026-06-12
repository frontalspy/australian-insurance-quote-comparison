import { useEffect, useMemo, useState } from "react";
import { INSURERS } from "../../../data/insurers";
import { rankInsurers } from "../../../lib/scoring";
import {
  loadQuotes,
  loadWeights,
  saveQuotes,
  saveWeights,
} from "../../../lib/storage";
import type { Quotes, Weights } from "../../../types";

export function useComparison() {
  const [quotes, setQuotes] = useState<Quotes>(() => loadQuotes());
  const [weights, setWeights] = useState<Weights>(() => loadWeights());

  useEffect(() => saveQuotes(quotes), [quotes]);
  useEffect(() => saveWeights(weights), [weights]);

  const results = useMemo(
    () => rankInsurers(INSURERS, quotes, weights),
    [quotes, weights]
  );

  const setQuote = (id: string, value: number | null) =>
    setQuotes((prev) => ({ ...prev, [id]: value }));

  return { quotes, weights, results, setQuote, setWeights };
}
