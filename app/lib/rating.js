// How good each deal is. Two separate questions, each answered only from what the source reports:
//   the verdict   where this price sits in the item's price history (a new low, near its best, a fair cut, routine)
//   the flag      whether the "was" price overstates the saving, because the source says the item has lately sold
//                 for less (its going rate, `fair`)
// Every discount, saving, filter and sort measures against the honest price: the going rate where there is one.

export const VERDICTS = {
  low: { label: 'New low', blurb: 'The source calls it the lowest price it has tracked', weight: 40 },
  match: { label: 'Near best', blurb: 'The source puts it at or within a few dollars of its best price', weight: 26 },
  fair: { label: 'Fair cut', blurb: 'A real discount, but the source gives no history to call it a low', weight: 12 },
  routine: { label: 'Routine sale', blurb: 'The source says this price keeps coming back; no need to rush', weight: 0 },
};

export const VERDICT_ORDER = ['low', 'match', 'fair', 'routine'];

export const INFLATED = { label: 'Inflated “was”', blurb: 'The source says it has lately sold for less than the “was” price, so we measure against that going rate' };

// The price the discount is honestly measured against.
export const honestBase = (deal) => deal.fair ?? deal.was;

export const isInflated = (deal) => deal.fair != null && deal.fair < deal.was;

// Percent off the "was" price, as the two prices give it (what the store's tag says).
export function percentOff(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

// Percent off the honest price.
export function realPercentOff(deal) {
  return Math.max(0, Math.round((1 - deal.price / honestBase(deal)) * 100));
}

// Dollars saved against the honest price.
export function savings(deal) {
  return Math.max(0, Math.round((honestBase(deal) - deal.price) * 100) / 100);
}

// 1 to 99: the verdict carries most of the weight and the real discount the rest, so a fair 60% off ranks below a
// new low at 30% off. The store plays no part: the same price at two stores with the same evidence scores the same.
export function dealScore(deal) {
  const raw = VERDICTS[deal.verdict].weight + realPercentOff(deal) * 0.6 + (deal.confirm ? 4 : 0);
  return Math.max(1, Math.min(99, Math.round(raw + 20)));
}
