// The filter panel (category, store, discount, verdict), the sort menu and the summary of active filters.
// Every chip shows how many deals it would leave, given the other filters, so no choice leads to an empty page.

import { escapeHtml } from '../lib/format.js';
import { VERDICTS, VERDICT_ORDER } from '../lib/rating.js';
import { DISCOUNT_STEPS, SORTS, facetCounts, isFiltered } from '../lib/query.js';

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

export function filterPanel(deals, query) {
  const cats = [...new Set(deals.map((d) => d.cat))].sort();
  const stores = [...new Set(deals.map((d) => d.store))].sort();
  const steps = DISCOUNT_STEPS.map((step) => {
    const on = query.off === step;
    return `<button type="button" class="step${on ? ' on' : ''}" data-off="${step}" aria-pressed="${on}">${step ? `${step}%+` : 'Any'}</button>`;
  }).join('');
  return `${chipGroup('Category', 'cats', cats, query.cats, facetCounts(deals, query, 'cats', 'cat'))}
${chipGroup('Store', 'stores', stores, query.stores, facetCounts(deals, query, 'stores', 'store'))}
<fieldset class="group"><legend>Discount</legend><div class="steps">${steps}</div></fieldset>
${chipGroup('Is it really a deal?', 'verdicts', VERDICT_ORDER, query.verdicts, facetCounts(deals, query, 'verdicts', 'verdict'), (v) => VERDICTS[v].label)}`;
}

export function sortMenu(query) {
  const options = Object.entries(SORTS)
    .map(([key, s]) => `<option value="${key}"${key === query.sort ? ' selected' : ''}>${s.label}</option>`)
    .join('');
  return `<label class="sort">Sort <select id="sort">${options}</select></label>`;
}

// "Showing 7 of 71 deals" and a removable tag for each active filter.
export function activeSummary(shown, total, query) {
  const tags = [];
  if (query.q.trim()) tags.push(['q', '', `“${query.q.trim()}”`]);
  for (const c of query.cats) tags.push(['cats', c, c]);
  for (const s of query.stores) tags.push(['stores', s, s]);
  if (query.off) tags.push(['off', '', `${query.off}%+ off`]);
  for (const v of query.verdicts) tags.push(['verdicts', v, VERDICTS[v].label]);
  const tagHtml = tags
    .map(([field, value, label]) => `<button type="button" class="tag" data-remove="${field}" data-value="${escapeHtml(value)}">${escapeHtml(label)} <span aria-hidden="true">×</span><span class="sr">remove</span></button>`)
    .join('');
  const clear = isFiltered(query) ? '<button type="button" class="clear" data-clear>Clear all</button>' : '';
  return `<p class="count"><strong>${shown}</strong> of ${total} deals</p>${tagHtml}${clear}`;
}

export function activeFilterCount(query) {
  return query.cats.length + query.stores.length + query.verdicts.length + (query.off ? 1 : 0);
}
