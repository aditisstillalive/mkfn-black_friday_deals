// The finder page: search box, filter panel, sort menu, results grid, and a hint when nothing matches.

import { escapeHtml } from '../lib/format.js';
import { VERDICTS, VERDICT_ORDER } from '../lib/rating.js';
import { activeFilterCount, filterPanel, sortMenu } from './controls.js';
import { dealCard } from './card.js';

export function listShell(query, total) {
  const legend = VERDICT_ORDER.map((v) => `<li class="v-${v}"><span class="pill">${VERDICTS[v].label}</span>${VERDICTS[v].blurb}</li>`).join('');
  const n = activeFilterCount(query);
  return `<section class="finder">
  <form class="searchbar" role="search" id="searchform">
    <label for="q" class="sr">Search deals</label>
    <input id="q" type="search" placeholder="Search ${total} checked deals: AirPods, MacBook, snow blower…" value="${escapeHtml(query.q)}" autocomplete="off">
    <span id="sortslot">${sortMenu(query)}</span>
  </form>
  <div class="layout">
    <details class="filters" id="filters" open>
      <summary>Filters<span class="badge" id="filtercount">${n || ''}</span></summary>
      <div id="panel"></div>
    </details>
    <div class="results">
      <div class="summary" id="summary"></div>
      <ul class="grid" id="grid"></ul>
      <details class="legend"><summary>How we judge a deal</summary><ul>${legend}</ul></details>
    </div>
  </div>
</section>`;
}

export function resultsGrid(shown) {
  if (shown.length) return shown.map(dealCard).join('');
  return `<li class="none"><strong>No deal matches all of that.</strong> Remove a filter above, or <button type="button" class="linkish" data-clear>clear them all</button>.</li>`;
}

export { filterPanel };
