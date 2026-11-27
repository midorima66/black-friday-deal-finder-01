// Filtering and sorting for the deal list. Pure functions over the DEALS
// array so the list view and the counts stay in agreement.

export const CATEGORIES = ['All', 'Audio', 'Laptops', 'TVs', 'Tablets', 'Wearables', 'Smart Home', 'Phones', 'Accessories'];
export const STORES = ['All', 'Amazon', 'Best Buy'];
export const DISCOUNT_STEPS = [
  { label: 'Any discount', min: 0 },
  { label: '20% off or more', min: 20 },
  { label: '40% off or more', min: 40 },
  { label: '50% off or more', min: 50 },
];
export const SORTS = [
  { id: 'best', label: 'Best deals first' },
  { id: 'pct', label: 'Biggest % off' },
  { id: 'saved', label: 'Biggest $ saving' },
  { id: 'price', label: 'Lowest price' },
];

const VERDICT_RANK = { 'NEW LOW': 0, 'STRONG': 1, 'ROUTINE': 2 };

export function savedAmount(deal) {
  return Math.round((deal.usual - deal.sale) * 100) / 100;
}

export function applyFilters(deals, state) {
  const q = state.query.trim().toLowerCase();
  return deals.filter((d) => {
    if (state.category !== 'All' && d.category !== state.category) return false;
    if (state.store !== 'All' && d.store !== state.store) return false;
    if (d.pct < state.minPct) return false;
    if (state.verdict !== 'All' && d.verdict !== state.verdict) return false;
    if (q && !(d.name.toLowerCase().includes(q) || d.store.toLowerCase().includes(q) || d.category.toLowerCase().includes(q))) return false;
    return true;
  });
}

export function applySort(deals, sortId) {
  const list = [...deals];
  if (sortId === 'pct') list.sort((a, b) => b.pct - a.pct || b.usual - a.usual);
  else if (sortId === 'saved') list.sort((a, b) => savedAmount(b) - savedAmount(a));
  else if (sortId === 'price') list.sort((a, b) => a.sale - b.sale);
  else list.sort((a, b) => VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict] || b.pct - a.pct);
  return list;
}

export function defaultState() {
  return { query: '', category: 'All', store: 'All', minPct: 0, verdict: 'All', sort: 'best' };
}
