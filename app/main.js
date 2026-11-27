// Tagtruth: routes between the finder (#/ with an optional ?search) and a deal's page (#/deal/<id>), and keeps
// the finder's results, chips and address in step as the shopper searches and filters. Everything it shows is
// in app/data, so it runs with no network at all.
//
// window.__shotReady is false while a page renders and true once it is on screen, for the screenshot script.

import { deals } from './data/deals.js';
import { applyQuery, readQuery, writeQuery } from './lib/query.js';
import { activeFilterCount, activeSummary, filterPanel, sortMenu } from './ui/controls.js';
import { listShell, resultsGrid } from './ui/list.js';

const app = document.getElementById('app');
const phone = window.matchMedia('(max-width: 760px)');
let query = readQuery(location.hash);

// Redraw what depends on the query, leaving the search box alone so typing never loses focus.
function refreshResults() {
  const shown = applyQuery(deals, query);
  app.querySelector('#grid').innerHTML = resultsGrid(shown, deals);
  app.querySelector('#panel').innerHTML = filterPanel(deals, query);
  app.querySelector('#summary').innerHTML = activeSummary(shown.length, deals.length, query);
  app.querySelector('#filtercount').textContent = activeFilterCount(query) || '';
}

function commit(next) {
  query = next;
  history.replaceState(null, '', writeQuery(query));
  refreshResults();
}

function toggle(list, value) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

function onClick(event) {
  const el = event.target.closest('button');
  if (!el) return;
  if (el.dataset.field) commit({ ...query, [el.dataset.field]: toggle(query[el.dataset.field], el.dataset.value) });
  else if (el.dataset.off !== undefined) commit({ ...query, off: Number(el.dataset.off) });
  else if (el.dataset.remove) {
    const field = el.dataset.remove;
    if (field === 'q') {
      app.querySelector('#q').value = '';
      commit({ ...query, q: '' });
    } else if (field === 'off') commit({ ...query, off: 0 });
    else commit({ ...query, [field]: query[field].filter((v) => v !== el.dataset.value) });
  } else if (el.dataset.clear !== undefined) {
    app.querySelector('#q').value = '';
    commit(readQuery('#/'));
  }
}

function showList() {
  document.title = 'Tagtruth: Black Friday deals, price-checked';
  app.innerHTML = listShell(query, deals.length);
  app.querySelector('#filters').open = !phone.matches;
  app.querySelector('#q').addEventListener('input', (e) => commit({ ...query, q: e.target.value }));
  app.querySelector('#searchform').addEventListener('submit', (e) => e.preventDefault());
  app.querySelector('#sortslot').addEventListener('change', (e) => {
    commit({ ...query, sort: e.target.value });
    app.querySelector('#sortslot').innerHTML = sortMenu(query);
  });
  refreshResults();
}

// The deal page's code loads only when a deal is opened, keeping the finder's first load small.
async function showDeal(id) {
  const { dealPage, missingPage } = await import('./ui/detail.js');
  const deal = deals.find((d) => d.id === id);
  document.title = `${deal ? deal.name : 'Not found'} | Tagtruth`;
  app.innerHTML = deal ? dealPage(deal, deals) : missingPage();
}

async function route() {
  window.__shotReady = false;
  const match = location.hash.match(/^#\/deal\/([^/?]+)/);
  if (match) await showDeal(decodeURIComponent(match[1]));
  else {
    query = readQuery(location.hash);
    showList();
  }
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

app.addEventListener('click', onClick);
window.addEventListener('hashchange', route);
route();
