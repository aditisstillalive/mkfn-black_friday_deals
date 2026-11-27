// The shopper's search: read it from the address, write it back, and apply it to the deals.
// A search lives in the hash (#/?q=mac&cat=Laptops&off=20&max=500&sort=off), so any view can be bookmarked or shared.
// Anything in the address that is not a real category, store, verdict or step is dropped, never shown.

import { VERDICTS, dealScore, realPercentOff, savings } from './rating.js';

export const SORTS = {
  score: { label: 'Best deal first', compare: (a, b) => dealScore(b) - dealScore(a) || realPercentOff(b) - realPercentOff(a) },
  real: { label: 'Biggest real % off', compare: (a, b) => realPercentOff(b) - realPercentOff(a) || dealScore(b) - dealScore(a) },
  saved: { label: 'Most $ saved', compare: (a, b) => savings(b) - savings(a) },
  low: { label: 'Lowest price', compare: (a, b) => a.price - b.price },
  high: { label: 'Highest price', compare: (a, b) => b.price - a.price },
};

// Minimum real % off, and maximum price (0 means any).
export const DISCOUNT_STEPS = [0, 10, 20, 30, 40, 50];
export const PRICE_CAPS = [0, 50, 100, 250, 500, 1000];

const list = (value) => (value ? value.split(',').filter(Boolean) : []);
const step = (value, steps) => (steps.includes(Number(value)) ? Number(value) : 0);

export function readQuery(hash, deals = []) {
  const at = hash.indexOf('?');
  const params = new URLSearchParams(at === -1 ? '' : hash.slice(at + 1));
  const cats = new Set(deals.map((d) => d.cat));
  const stores = new Set(deals.map((d) => d.store));
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? '',
    cats: [...new Set(list(params.get('cat')))].filter((c) => cats.has(c)),
    stores: [...new Set(list(params.get('store')))].filter((s) => stores.has(s)),
    verdicts: [...new Set(list(params.get('v')))].filter((v) => v in VERDICTS),
    off: step(params.get('off'), DISCOUNT_STEPS),
    max: step(params.get('max'), PRICE_CAPS),
    sort: sort in SORTS ? sort : 'score',
  };
}

export function writeQuery(query) {
  const params = new URLSearchParams();
  if (query.q.trim()) params.set('q', query.q.trim());
  if (query.cats.length) params.set('cat', query.cats.join(','));
  if (query.stores.length) params.set('store', query.stores.join(','));
  if (query.verdicts.length) params.set('v', query.verdicts.join(','));
  if (query.off) params.set('off', String(query.off));
  if (query.max) params.set('max', String(query.max));
  if (query.sort !== 'score') params.set('sort', query.sort);
  const text = params.toString();
  return text ? `#/?${text}` : '#/';
}

export function isFiltered(query) {
  return Boolean(query.q.trim() || query.cats.length || query.stores.length || query.verdicts.length || query.off || query.max);
}

// Every word of the search must appear somewhere in the deal: name, store, category, the evidence or the terms.
function matchesText(deal, q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = `${deal.name} ${deal.store} ${deal.cat} ${deal.why} ${deal.terms ?? ''}`.toLowerCase();
  return words.every((w) => hay.includes(w));
}

function matches(deal, query, skip) {
  return (
    (skip === 'q' || matchesText(deal, query.q)) &&
    (skip === 'cats' || !query.cats.length || query.cats.includes(deal.cat)) &&
    (skip === 'stores' || !query.stores.length || query.stores.includes(deal.store)) &&
    (skip === 'verdicts' || !query.verdicts.length || query.verdicts.includes(deal.verdict)) &&
    (skip === 'off' || realPercentOff(deal) >= query.off) &&
    (skip === 'max' || !query.max || deal.price <= query.max)
  );
}

export function applyQuery(deals, query) {
  return deals.filter((d) => matches(d, query)).sort(SORTS[query.sort].compare);
}

// How many deals each option of one filter would show, given every other filter: the counts beside the chips.
export function facetCounts(deals, query, field, key) {
  const counts = new Map();
  for (const d of deals) {
    if (!matches(d, query, field)) continue;
    counts.set(d[key], (counts.get(d[key]) ?? 0) + 1);
  }
  return counts;
}

// The same for a stepped filter: how many deals each step would show.
export function stepCounts(deals, query, field) {
  const others = deals.filter((d) => matches(d, query, field));
  if (field === 'off') return new Map(DISCOUNT_STEPS.map((s) => [s, others.filter((d) => realPercentOff(d) >= s).length]));
  return new Map(PRICE_CAPS.map((s) => [s, others.filter((d) => !s || d.price <= s).length]));
}
