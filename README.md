[![make.fun · black-friday-deal-finder-01](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/midorima66/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/midorima66/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

# DealHawk — Black Friday 2026 Deal Finder

A static deal-finder site for the make.fun bounty
[black-friday-deal-finder-01](https://make.fun/bounty/black-friday-deal-finder-01):
27 real Black Friday and Cyber Monday deals, each with its product, store,
store link, sale price, usual price, discount, and the time its price was
checked — plus an honest verdict on whether it is really a deal.

## The deals

Every price was read on Friday 27 November 2026 (UTC morning) from a deals
roundup that names its store (9to5Toys, Mashable, TradingView), and each
store link was followed to the store's own product page — or, for Best Buy
doorbusters, to Best Buy's Black Friday sale page. No price was invented.

Highlights:

- **Apple AirPods Pro 3 — $149** (was $249, −40%) at Amazon — a new all-time low.
- **Apple MacBook Air 13-inch M5 — $999.99** (was $1,299, −23%) at Amazon — only the second time under $1,000 since June.
- **Sony WH-1000XM5 — $169.99** (was $398, −57%) at Best Buy — a record low.
- **Hisense 98-inch QD5 TV — $799.99** (was $2,499.99, −68%) at Best Buy — $1,700 saved.
- **TCL 75-inch QM8L Mini-LED TV — $1,397.99** (was $2,999.99, −53%) at Amazon.

## What the verdict means

- **NEW LOW** — the roundup calls it an all-time or record low.
- **STRONG** — a steep cut of 24% or more.
- **ROUTINE** — a modest cut under 20%; fine if you needed it anyway, not a reason to buy.

## The site

- Search by product, brand or store; filter by category, store, minimum discount and verdict; sort by best deal, biggest % off, biggest $ saving, or lowest price.
- Every deal card shows the sale price, usual price, discount, dollars saved, the verdict with its evidence, the check date and source, and a link to the store.
- A detail page per deal (`#/deal/<id>`) with the full evidence and more deals from the same category.
- Works on desktop and on a phone; no network request — all files live under `app/`.

## Run it

Serve `app/` with any static server, e.g. `python3 -m http.server` from
inside `app/`, then open http://localhost:8000.

## Hand-in

`main.ts` (Node 22, standard library only) copies `app/` and
`screenshots/` to `/output` and writes `/output/dossier.json` with the
vendored `vendor/makefun-frontend.ts` library:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```
