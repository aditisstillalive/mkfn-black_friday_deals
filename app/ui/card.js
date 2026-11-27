// One deal as a card in the results grid: product, store, prices, discount, verdict, check time and store link.

import { escapeHtml, money, utcStamp } from '../lib/format.js';
import { VERDICTS, dealScore, percentOff, realPercentOff } from '../lib/rating.js';
import { sources } from '../data/sources.js';

export function storeLinkLabel(deal) {
  return deal.link === 'search' ? `Find at ${deal.store}` : `View at ${deal.store}`;
}

export function dealCard(deal) {
  const source = sources[deal.src];
  const verdict = VERDICTS[deal.verdict];
  const off = percentOff(deal);
  const real = realPercentOff(deal);
  const href = `#/deal/${encodeURIComponent(deal.id)}`;
  return `<li class="card v-${deal.verdict}">
  <div class="card-top">
    <span class="store">${escapeHtml(deal.store)}</span>
    <span class="cat">${escapeHtml(deal.cat)}</span>
    <span class="score" title="Tagtruth score out of 100: verdict plus real discount"><small>score</small> ${dealScore(deal)}</span>
  </div>
  <h3 class="card-name"><a href="${href}">${escapeHtml(deal.name)}</a></h3>
  <div class="prices">
    <strong class="now">${money(deal.price)}</strong>
    <s class="was">${money(deal.was)}</s>
    <span class="off">−${off}%</span>
  </div>
  <p class="verdict"><span class="pill">${verdict.label}</span>${deal.fair ? ` <span class="real">real −${real}%</span>` : ''}</p>
  <p class="why">${escapeHtml(deal.why)}</p>
  <div class="card-foot">
    <span class="checked">Checked via ${escapeHtml(source.name)}<br><b>${utcStamp(source.read)}</b></span>
    <a class="go" href="${escapeHtml(deal.url)}" target="_blank" rel="noopener nofollow">${storeLinkLabel(deal)} ↗</a>
  </div>
</li>`;
}
