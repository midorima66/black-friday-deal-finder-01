// Rendering for the deal list and the per-deal detail view.
// A deal card shows everything a shopper needs at a glance: product,
// store, sale price, usual price, discount, dollars saved, the verdict
// badge with its evidence, when the price was checked, and the store link.

import { CHECKED_ON, DEALS } from './deals.js';
import { savedAmount } from './filters.js';

export function money(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const VERDICT_CLASS = { 'NEW LOW': 'v-low', 'STRONG': 'v-strong', 'ROUTINE': 'v-routine' };

function verdictBadge(deal) {
  return `<span class="verdict ${VERDICT_CLASS[deal.verdict]}">${deal.verdict}</span>`;
}

export function dealCard(deal) {
  const saved = savedAmount(deal);
  return `<article class="card" data-id="${deal.id}">
    <div class="card-top">
      <span class="cat">${deal.category}</span>
      <span class="store">${deal.store}</span>
      ${verdictBadge(deal)}
    </div>
    <h3><a href="#/deal/${deal.id}">${deal.name}</a></h3>
    <div class="prices">
      <span class="sale">${money(deal.sale)}</span>
      <span class="usual"><s>${money(deal.usual)}</s></span>
      <span class="pct">-${deal.pct}%</span>
    </div>
    <p class="saved">You save ${money(saved)}</p>
    <p class="evidence">${deal.evidence}</p>
    ${deal.alsoAt ? `<p class="also">${deal.alsoAt}</p>` : ''}
    <p class="checked">Checked ${CHECKED_ON} · Source: ${deal.source}</p>
    <a class="cta" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} ↗</a>
  </article>`;
}

export function dealDetail(deal) {
  const saved = savedAmount(deal);
  const siblings = DEALS.filter((d) => d.category === deal.category && d.id !== deal.id).slice(0, 4);
  return `<section class="detail">
    <p><a class="back" href="#/">← All deals</a></p>
    <div class="card-top">
      <span class="cat">${deal.category}</span>
      <span class="store">${deal.store}</span>
      ${verdictBadge(deal)}
    </div>
    <h2>${deal.name}</h2>
    <div class="prices big">
      <span class="sale">${money(deal.sale)}</span>
      <span class="usual"><s>${money(deal.usual)}</s></span>
      <span class="pct">-${deal.pct}%</span>
    </div>
    <p class="saved">You save ${money(saved)} off the usual price of ${money(deal.usual)}.</p>
    <h4>Is it really a deal?</h4>
    <p>${deal.evidence}</p>
    ${deal.alsoAt ? `<p class="also">${deal.alsoAt}</p>` : ''}
    <p class="checked">Price checked ${CHECKED_ON} (UTC morning) at ${deal.store}; reported by ${deal.source}. Prices can change or sell out — check the price at checkout.</p>
    <a class="cta big" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} ↗</a>
    <h4>More ${deal.category} deals</h4>
    <div class="grid mini">${siblings.map(dealCard).join('')}</div>
  </section>`;
}

export function findDeal(id) {
  return DEALS.find((d) => d.id === id) || null;
}
