// The filter panel (category, store, price, discount, verdict), the sort menu and the summary of active filters.
// Every chip and step shows how many deals it would leave, given the other filters, and an option that would leave
// none is disabled, so no choice leads to an empty page.

import { escapeHtml } from '../lib/format.js';
import { VERDICTS, VERDICT_ORDER } from '../lib/rating.js';
import { DISCOUNT_STEPS, PRICE_CAPS, SORTS, facetCounts, isFiltered, stepCounts } from '../lib/query.js';

export function filterPanel(deals, query) {
  const cats = [...new Set(deals.map((d) => d.cat))].sort();
  const stores = [...new Set(deals.map((d) => d.store))].sort();
  const verdicts = VERDICT_ORDER.filter((v) => deals.some((d) => d.verdict === v));
  return `${chipGroup('Category', 'cats', cats, query.cats, facetCounts(deals, query, 'cats', 'cat'))}
${chipGroup('Store', 'stores', stores, query.stores, facetCounts(deals, query, 'stores', 'store'))}
${stepGroup('Price', 'max', PRICE_CAPS, query.max, stepCounts(deals, query, 'max'), (s) => (s ? `≤ $${s.toLocaleString('en-US')}` : 'Any'))}
${stepGroup('Real discount', 'off', DISCOUNT_STEPS, query.off, stepCounts(deals, query, 'off'), (s) => (s ? `${s}%+` : 'Any'))}
${chipGroup('Is it really a deal?', 'verdicts', verdicts, query.verdicts, facetCounts(deals, query, 'verdicts', 'verdict'), (v) => VERDICTS[v].label)}`;
}

function chipGroup(title, field, options, chosen, counts, labelOf = (v) => v) {
  const chips = options
    .map((value) => {
      const on = chosen.includes(value);
      const n = counts.get(value) ?? 0;
      return `<button type="button" class="chip${on ? ' on' : ''}" data-field="${field}" data-value="${escapeHtml(value)}" aria-pressed="${on}"${n || on ? '' : ' disabled'}>${escapeHtml(labelOf(value))}<span class="n">${n}</span></button>`;
    })
    .join('');
  return `<fieldset class="group"><legend>${title}</legend><div class="chips">${chips}</div></fieldset>`;
}

function stepGroup(title, field, steps, chosen, counts, labelOf) {
  const buttons = steps
    .map((value) => {
      const on = chosen === value;
      const n = counts.get(value) ?? 0;
      return `<button type="button" class="step${on ? ' on' : ''}" data-step="${field}" data-value="${value}" aria-pressed="${on}"${n || on ? '' : ' disabled'}>${labelOf(value)}<span class="n">${n}</span></button>`;
    })
    .join('');
  return `<fieldset class="group"><legend>${title}</legend><div class="steps">${buttons}</div></fieldset>`;
}

export function sortMenu(query) {
  const options = Object.entries(SORTS)
    .map(([key, s]) => `<option value="${key}"${key === query.sort ? ' selected' : ''}>${s.label}</option>`)
    .join('');
  return `<label class="sort">Sort <select id="sort">${options}</select></label>`;
}

// "7 of 50 deals" and a removable tag for each active filter.
export function activeSummary(shown, total, query) {
  const tags = [];
  if (query.q.trim()) tags.push(['q', '', `“${query.q.trim()}”`]);
  for (const c of query.cats) tags.push(['cats', c, c]);
  for (const s of query.stores) tags.push(['stores', s, s]);
  if (query.max) tags.push(['max', '', `≤ $${query.max.toLocaleString('en-US')}`]);
  if (query.off) tags.push(['off', '', `${query.off}%+ real off`]);
  for (const v of query.verdicts) tags.push(['verdicts', v, VERDICTS[v].label]);
  const tagHtml = tags
    .map(([field, value, label]) => `<button type="button" class="tag" data-remove="${field}" data-value="${escapeHtml(value)}">${escapeHtml(label)} <span aria-hidden="true">×</span><span class="sr">remove</span></button>`)
    .join('');
  const clear = isFiltered(query) ? '<button type="button" class="clear" data-clear>Clear all</button>' : '';
  return `<p class="count"><strong>${shown}</strong> of ${total} deals</p>${tagHtml}${clear}`;
}

export function activeFilterCount(query) {
  return query.cats.length + query.stores.length + query.verdicts.length + (query.off ? 1 : 0) + (query.max ? 1 : 0);
}
