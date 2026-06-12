import type { Quotes, Weights } from '../types';
import { DEFAULT_WEIGHTS } from './scoring';

const QUOTES_KEY = 'ahivc.quotes.v1';
const WEIGHTS_KEY = 'ahivc.weights.v1';

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return { ...fallback, ...(JSON.parse(raw) as T) };
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota / private-mode errors — persistence is best-effort.
  }
}

export const loadQuotes = (): Quotes => read<Quotes>(QUOTES_KEY, {});
export const saveQuotes = (quotes: Quotes): void => write(QUOTES_KEY, quotes);

export const loadWeights = (): Weights =>
  read<Weights>(WEIGHTS_KEY, DEFAULT_WEIGHTS);
export const saveWeights = (weights: Weights): void =>
  write(WEIGHTS_KEY, weights);
