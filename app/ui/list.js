// The finder page: search box, filter panel, sort menu, results grid, and a hint when nothing matches.

import { escapeHtml } from '../lib/format.js';
import { INFLATED, VERDICTS, VERDICT_ORDER, isInflated } from '../lib/rating.js';
import { sources } from '../data/sources.js';
import { activeFilterCount, filterPanel, sortMenu } from './controls.js';
import { dealCard } from './card.js';

// "9 of 10" style tallies for the line that says up front where the deals come from.
function tally(deals, keyOf) {
  const counts = new Map();
  for (const d of deals) counts.set(keyOf(d), (counts.get(keyOf(d)) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1]);
}

function disclosure(deals) {
  const bySource = tally(deals, (d) => sources[d.src].name).map(([name, n]) => `<b>${n}</b> from ${escapeHtml(name)}`).join(', ');
  const byStore = tally(deals, (d) => d.store).map(([name, n]) => `${n} ${escapeHtml(name)}`).join(', ');
  const confirmed = deals.filter((d) => d.confirm).length;
  return `<p class="disclose">Where these prices come from: ${bySource}, with ${confirmed} also confirmed at the same price in a second source. Stores: ${byStore}. Every store link is the product's own page.</p>`;
}

export function listShell(query, deals) {
  const total = deals.length;
  const present = VERDICT_ORDER.filter((v) => deals.some((d) => d.verdict === v));
  const legend = present.map((v) => `<li class="v-${v}"><span class="pill">${VERDICTS[v].label}</span>${VERDICTS[v].blurb}</li>`).join('')
    + (deals.some(isInflated) ? `<li><span class="flag">${INFLATED.label}</span>${INFLATED.blurb}</li>` : '');
  const n = activeFilterCount(query);
  return `<section class="finder">
  <form class="searchbar" role="search" id="searchform">
    <label for="q" class="sr">Search deals</label>
    <input id="q" type="search" placeholder="Search ${total} checked deals: AirPods, MacBook, Switch 2, all-time low…" value="${escapeHtml(query.q)}" autocomplete="off">
    <span id="sortslot">${sortMenu(query)}</span>
  </form>
  <div class="layout">
    <details class="filters" id="filters" open>
      <summary>Filters<span class="badge" id="filtercount">${n || ''}</span><span class="hint">category · store · price · % off · verdict</span></summary>
      <div id="panel"></div>
    </details>
    <div class="results">
      ${disclosure(deals)}
      <div class="summary" id="summary"></div>
      <ul class="grid" id="grid"></ul>
      <details class="legend"><summary>How we judge a deal</summary><ul>${legend}</ul></details>
    </div>
  </div>
</section>`;
}

export function resultsGrid(shown, all) {
  if (shown.length) return shown.map((d) => dealCard(d, all)).join('');
  return `<li class="none"><strong>No deal matches all of that.</strong> Remove a filter above, or <button type="button" class="linkish" data-clear>clear them all</button>.</li>`;
}

export { filterPanel };
