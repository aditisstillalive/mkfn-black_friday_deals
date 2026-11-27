// How good each deal is: its discount off the source's usual price, its real discount where the source says the
// item has been selling for less than that, the verdict's label, and one score that sorts the best deals first.

export const VERDICTS = {
  low: { label: 'New low', blurb: 'Lowest price the source has ever tracked', weight: 40 },
  match: { label: 'Near best', blurb: 'Ties or sits within a few dollars of its best price', weight: 26 },
  fair: { label: 'Fair cut', blurb: 'A real discount, but no price history to call it a low', weight: 12 },
  routine: { label: 'Routine sale', blurb: 'This price keeps coming back; no need to rush', weight: 0 },
  inflated: { label: 'Inflated "was"', blurb: 'The usual price overstates the saving', weight: -8 },
};

export const VERDICT_ORDER = ['low', 'match', 'fair', 'routine', 'inflated'];

// Percent off the usual price, as the two prices give it.
export function percentOff(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

// Percent off the honest comparison price: the going rate where the source gives one, else the usual price.
export function realPercentOff(deal) {
  const base = deal.fair ?? deal.was;
  return Math.max(0, Math.round((1 - deal.price / base) * 100));
}

export function savings(deal) {
  return deal.was - deal.price;
}

// 0 to 100: the verdict carries most of the weight, the real discount the rest, so a routine 60% off ranks
// below a new low at 30% off.
export function dealScore(deal) {
  const raw = VERDICTS[deal.verdict].weight + realPercentOff(deal) * 0.6 + (deal.confirm ? 4 : 0);
  return Math.max(1, Math.min(99, Math.round(raw + 20)));
}
