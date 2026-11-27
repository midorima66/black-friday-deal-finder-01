// Wiring for DealHawk: search box, category chips, store buttons,
// discount and verdict filters, sort order, and the hash routes
// (#/ for the list, #/deal/<id> for one deal's detail view).

import { DEALS, CHECKED_ON } from './deals.js';
import { CATEGORIES, STORES, DISCOUNT_STEPS, SORTS, applyFilters, applySort, defaultState } from './filters.js';
import { dealCard, dealDetail, findDeal } from './render.js';

const app = document.getElementById('app');
const state = defaultState();

// A filtered view can be shared as a plain link, e.g. ?category=TVs
// or ?verdict=NEW+LOW&sort=saved — handy for the screenshots too.
(function initFromQuery() {
  const params = new URLSearchParams(location.search);
  const q = params.get('q');
  const cat = params.get('category');
  const store = params.get('store');
  const min = params.get('minPct');
  const verdict = params.get('verdict');
  const sort = params.get('sort');
  if (q) state.query = q;
  if (cat && CATEGORIES.includes(cat)) state.category = cat;
  if (store && STORES.includes(store)) state.store = store;
  if (min && !Number.isNaN(Number(min))) state.minPct = Number(min);
  if (verdict && ['All', 'NEW LOW', 'STRONG', 'ROUTINE'].includes(verdict)) state.verdict = verdict;
  if (sort && SORTS.some((s) => s.id === sort)) state.sort = sort;
})();

function chipRow(items, active, group, labelFor) {
  return items.map((item) => {
    const value = typeof item === 'string' ? item : item.label;
    const key = typeof item === 'string' ? item : item.min;
    const on = String(key) === String(active) ? ' on' : '';
    return `<button class="chip${on}" data-group="${group}" data-value="${key}">${labelFor ? labelFor(item) : value}</button>`;
  }).join('');
}

function toolbar(total, shown) {
  return `<div class="toolbar">
    <input id="q" type="search" placeholder="Search deals, brands, stores…" value="${state.query.replace(/"/g, '&quot;')}" aria-label="Search deals">
    <div class="chips" role="group" aria-label="Category">${chipRow(CATEGORIES, state.category, 'category')}</div>
    <div class="chips" role="group" aria-label="Store">${chipRow(STORES, state.store, 'store')}</div>
    <div class="chips" role="group" aria-label="Minimum discount">${chipRow(DISCOUNT_STEPS, state.minPct, 'minPct', (s) => s.label)}</div>
    <div class="chips" role="group" aria-label="Verdict">
      ${chipRow(['All', 'NEW LOW', 'STRONG', 'ROUTINE'], state.verdict, 'verdict')}
    </div>
    <div class="sortrow">
      <label for="sort">Sort</label>
      <select id="sort">${SORTS.map((s) => `<option value="${s.id}"${s.id === state.sort ? ' selected' : ''}>${s.label}</option>`).join('')}</select>
      <span class="count">Showing ${shown} of ${total} deals · prices checked ${CHECKED_ON}</span>
    </div>
  </div>`;
}

function renderList() {
  const filtered = applySort(applyFilters(DEALS, state), state.sort);
  app.innerHTML = toolbar(DEALS.length, filtered.length) +
    (filtered.length
      ? `<div class="grid">${filtered.map(dealCard).join('')}</div>`
      : `<p class="empty">No deals match those filters. Try clearing the search or lowering the discount.</p>`);
  bindToolbar();
}

function bindToolbar() {
  const q = document.getElementById('q');
  q.addEventListener('input', () => { state.query = q.value; renderList(); keepFocus(q); });
  document.querySelectorAll('.chip').forEach((b) => {
    b.addEventListener('click', () => {
      const g = b.dataset.group;
      state[g] = g === 'minPct' ? Number(b.dataset.value) : b.dataset.value;
      renderList();
    });
  });
  document.getElementById('sort').addEventListener('change', (e) => {
    state.sort = e.target.value;
    renderList();
  });
}

function keepFocus(q) {
  q.focus();
  q.setSelectionRange(q.value.length, q.value.length);
}

function route() {
  const hash = location.hash || '#/';
  const m = hash.match(/^#\/deal\/([\w-]+)$/);
  if (m) {
    const deal = findDeal(m[1]);
    app.innerHTML = deal ? dealDetail(deal) : `<p class="empty">That deal is not in this finder. <a href="#/">Back to all deals</a>.</p>`;
    window.scrollTo(0, 0);
  } else {
    renderList();
  }
}

window.addEventListener('hashchange', route);
route();
