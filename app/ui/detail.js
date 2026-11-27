// The page for one deal: its price against the usual and the honest price, the verdict and its evidence,
// where and when the price was read, the same product at other stores, and more deals like it.

import { ageBetween, escapeHtml, hostOf, money, utcStamp } from '../lib/format.js';
import { VERDICTS, dealScore, percentOff, realPercentOff, savings } from '../lib/rating.js';
import { sources } from '../data/sources.js';
import { dealCard, storeLinkLabel } from './card.js';

// A bar from $0 to the usual price, marking the sale price and, where given, the going rate.
function priceScale(deal) {
  const at = (n) => `${Math.max(0, Math.min(100, (n / deal.was) * 100)).toFixed(1)}%`;
  const fair = deal.fair
    ? `<span class="mark fair" style="left:${at(deal.fair)}"><b>${money(deal.fair)}</b>going rate</span>`
    : '';
  return `<div class="scale" role="img" aria-label="Sale price ${money(deal.price)} against usual ${money(deal.was)}">
  <span class="fill" style="width:${at(deal.price)}"></span>
  <span class="mark now" style="left:${at(deal.price)}"><b>${money(deal.price)}</b>now</span>
  ${fair}
  <span class="mark was" style="left:100%"><b>${money(deal.was)}</b>usual</span>
</div>`;
}

function sourceTrail(deal) {
  const source = sources[deal.src];
  const posted = deal.posted ?? source.posted;
  const age = ageBetween(posted, source.read);
  const stale = new Date(source.read) - new Date(posted) > 48 * 3.6e6;
  const confirm = deal.confirm
    ? `<li><span>Also seen</span>${money(deal.confirm.price)} on ${escapeHtml(sources[deal.confirm.src].name)}, ${utcStamp(deal.confirm.at)}</li>`
    : '';
  return `<ul class="trail">
  <li><span>Price read in</span><a href="${escapeHtml(source.url)}" target="_blank" rel="noopener">${escapeHtml(source.name)}</a> (${escapeHtml(hostOf(source.url))}), which names ${escapeHtml(deal.store)} as the seller</li>
  <li><span>Source posted</span>${utcStamp(posted)}</li>
  <li><span>We checked it</span>${utcStamp(source.read)}, ${age} after it was posted${stale ? ' <em class="stale">older report: prices may have moved</em>' : ''}</li>
  ${confirm}
  <li><span>Store link</span>${deal.link === 'search' ? `The source linked only to ${escapeHtml(deal.store)}'s sale page, so this opens a ${escapeHtml(deal.store)} search for the exact product` : `The product's own page at ${escapeHtml(deal.store)}`}</li>
</ul>`;
}

function otherStores(deal, deals) {
  if (!deal.group) return '';
  const rows = deals
    .filter((d) => d.group === deal.group)
    .sort((a, b) => a.price - b.price)
    .map((d) => `<tr${d.id === deal.id ? ' class="here"' : ''}><td>${escapeHtml(d.store)}</td><td>${money(d.price)}</td><td>${escapeHtml(d.terms ?? '')}</td><td><a href="${escapeHtml(d.url)}" target="_blank" rel="noopener nofollow">${storeLinkLabel(d)} ↗</a></td></tr>`)
    .join('');
  return `<section class="compare"><h2>Same product, other stores</h2><table><thead><tr><th>Store</th><th>Price</th><th>Extras</th><th></th></tr></thead><tbody>${rows}</tbody></table></section>`;
}

function related(deal, deals) {
  const picks = deals
    .filter((d) => d.cat === deal.cat && d.id !== deal.id && (!deal.group || d.group !== deal.group))
    .sort((a, b) => dealScore(b) - dealScore(a))
    .slice(0, 3);
  if (!picks.length) return '';
  return `<section class="related"><h2>More ${escapeHtml(deal.cat.toLowerCase())} deals</h2><ul class="grid">${picks.map(dealCard).join('')}</ul></section>`;
}

export function dealPage(deal, deals) {
  const verdict = VERDICTS[deal.verdict];
  const conflict = deal.conflict ? `<p class="conflict"><strong>Prices disagree.</strong> ${escapeHtml(deal.conflict)}</p>` : '';
  const terms = deal.terms ? `<p class="terms"><strong>Conditions:</strong> ${escapeHtml(deal.terms)}</p>` : '';
  const real = deal.fair
    ? `<p class="realnote">Against its ${money(deal.fair)} going rate the real saving is <strong>${realPercentOff(deal)}%</strong>, not ${percentOff(deal)}%.</p>`
    : '';
  return `<nav class="crumbs"><a href="#/">All deals</a> › <a href="#/?cat=${encodeURIComponent(deal.cat)}">${escapeHtml(deal.cat)}</a></nav>
<article class="deal v-${deal.verdict}">
  <div class="deal-main">
    <p class="deal-store">${escapeHtml(deal.store)} · ${escapeHtml(deal.cat)}</p>
    <h1>${escapeHtml(deal.name)}</h1>
    <div class="prices big">
      <strong class="now">${money(deal.price)}</strong>
      <s class="was">${money(deal.was)}</s>
      <span class="off">−${percentOff(deal)}%</span>
      <span class="saved">you save ${money(savings(deal))}</span>
    </div>
    ${priceScale(deal)}
    ${conflict}
    <a class="go big" href="${escapeHtml(deal.url)}" target="_blank" rel="noopener nofollow">${storeLinkLabel(deal)} ↗</a>
    ${terms}
  </div>
  <aside class="verdict-box">
    <p class="verdict"><span class="pill">${verdict.label}</span><span class="score big" title="Tagtruth score">${dealScore(deal)}</span></p>
    <p class="blurb">${verdict.blurb}.</p>
    <p class="why">${escapeHtml(deal.why)}</p>
    ${real}
  </aside>
</article>
<section class="evidence"><h2>Where this price comes from</h2>${sourceTrail(deal)}</section>
${otherStores(deal, deals)}
${related(deal, deals)}`;
}

export function missingPage() {
  return `<section class="empty"><h1>No deal here</h1><p>That address does not match a deal we checked. <a href="#/">See every deal</a>.</p></section>`;
}
