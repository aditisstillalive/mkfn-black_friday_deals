// The shopper's search: read it from the address, write it back, and apply it to the deals.
// A search lives in the hash (#/?q=mac&cat=Laptops&off=20&sort=off), so any view can be bookmarked or shared.

import { dealScore, percentOff, realPercentOff } from './rating.js';

export const SORTS = {
  score: { label: 'Best deal first', compare: (a, b) => dealScore(b) - dealScore(a) || percentOff(b) - percentOff(a) },
  off: { label: 'Biggest % off', compare: (a, b) => percentOff(b) - percentOff(a) },
  real: { label: 'Biggest real % off', compare: (a, b) => realPercentOff(b) - realPercentOff(a) },
  saved: { label: 'Most $ saved', compare: (a, b) => b.was - b.price - (a.was - a.price) },
  low: { label: 'Lowest price', compare: (a, b) => a.price - b.price },
};

export const DISCOUNT_STEPS = [0, 10, 20, 30, 40, 50];

const list = (value) => (value ? value.split(',').filter(Boolean) : []);

export function readQuery(hash) {
  const at = hash.indexOf('?');
  const params = new URLSearchParams(at === -1 ? '' : hash.slice(at + 1));
  const off = Number(params.get('off'));
  const sort = params.get('sort');
  return {
    q: params.get('q') ?? '',
    cats: list(params.get('cat')),
    stores: list(params.get('store')),
    verdicts: list(params.get('v')),
    off: DISCOUNT_STEPS.includes(off) ? off : 0,
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
  if (query.sort !== 'score') params.set('sort', query.sort);
  const text = params.toString();
  return text ? `#/?${text}` : '#/';
}

export function isFiltered(query) {
  return Boolean(query.q.trim() || query.cats.length || query.stores.length || query.verdicts.length || query.off);
}

// Every word of the search must appear in the deal's name, store or category.
function matchesText(deal, q) {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  const hay = `${deal.name} ${deal.store} ${deal.cat}`.toLowerCase();
  return words.every((w) => hay.includes(w));
}

function matches(deal, query, skip) {
  return (
    (skip === 'q' || matchesText(deal, query.q)) &&
    (skip === 'cats' || !query.cats.length || query.cats.includes(deal.cat)) &&
    (skip === 'stores' || !query.stores.length || query.stores.includes(deal.store)) &&
    (skip === 'verdicts' || !query.verdicts.length || query.verdicts.includes(deal.verdict)) &&
    (skip === 'off' || percentOff(deal) >= query.off)
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
