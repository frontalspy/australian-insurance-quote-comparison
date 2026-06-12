# Aussie Home Insurance Value Compare

A simple, static single-page web app that helps you compare major Australian
home & contents insurers by **value for money**. You enter the annual premium
each insurer quoted you, and the app ranks them — blending review-based
reputation with policy coverage.

**Live app:** https://frontalspy.github.io/australian-insurance-quote-comparison/

> ⚠️ **Not financial advice.** Satisfaction scores are curated estimates compiled
> by hand from public sources. They are a starting point for comparison only.
> Always confirm cover and pricing in each insurer's current Product Disclosure
> Statement (PDS) before buying.

## How it works

1. **Satisfaction score (0–100)** per insurer is a blend of two sub-scores:
   - **Reputation** — a weighted average of five 0–10 metrics (claims
     experience, customer service, value for money, trust/reputation, digital
     experience).
   - **Coverage** — points from standard-policy feature flags (flood cover,
     new-for-old contents, temporary accommodation, emergency repairs, etc.).
   - Default blend is **70% reputation / 30% coverage**, both adjustable.
2. **Value tier** is derived from `satisfactionScore / yourQuote × 1000`. Higher
   means more satisfaction per dollar. Tiers:
   | Tier | Ratio |
   |---|---|
   | Bargain | ≥ 65 |
   | Great Deal | 45–64 |
   | Good Value | 28–44 |
   | Fair | 12–27 |
   | Not Worth It | < 12 |
3. Insurers you entered a quote for are ranked by ratio (best value first) and
   display their value tier prominently. Insurers left blank are shown in a
   separate section below, ordered by satisfaction score alone.

All weighting is adjustable live via sliders, and your quotes + weights are
saved to `localStorage` so they persist between visits.

## Where the data comes from

`src/data/insurers.ts` is a hand-curated dataset. The `reputation` scores are
blended estimates informed by:

- **ProductReview.com.au** aggregate star ratings
- **CHOICE** customer-satisfaction and claims surveys
- **Canstar** Outstanding Value / Most Satisfied Customers awards
- **Finder** awards

ProductReview scores skew negative (people tend to review after a bad claim), so
they're tempered against satisfaction surveys and value awards rather than used
raw. Each insurer entry links its sources.

**Everything is meant to be edited.** Adjust any score, coverage flag, or add /
remove insurers in `src/data/insurers.ts`; the scoring engine and UI react
automatically. Default weights live in `DEFAULT_WEIGHTS` in `src/lib/scoring.ts`.

## Project structure

```
src/
  data/insurers.ts                    # curated insurer dataset (edit me)
  features/
    comparison/
      components/                     # InsurerCard, QuoteTable, Results, WeightControls, Disclaimer
      data/reputationLabels.ts        # weight slider labels
      hooks/useComparison.ts          # state + ranking logic
  lib/scoring.ts                      # pure scoring/ranking engine + default weights
  lib/scoring.test.ts                 # unit tests for the scoring engine
  lib/storage.ts                      # localStorage persistence helpers
  components/                         # shared UI primitives (ScoreBar, Slider)
  App.tsx                             # shell layout and routing
  types.ts                            # shared domain types
```

## Develop

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm test         # run the scoring engine unit tests
npm run build    # type-check + build static output to dist/
npm run preview  # preview the production build
```

## Deploy

`npm run build` produces a fully static site in `dist/` — host it free on
Netlify, GitHub Pages, Vercel, or any static host. No backend required.

## Stack

Vite · React · TypeScript · Tailwind CSS · Vitest
