// DealHawk entry for black-friday-deal-finder-01 (Node 22, stdlib only).
// The site lives in app/ as plain static files: index.html opens in a
// browser, its deals in its own modules, nothing fetched from the network.
// This program hands it in: it copies app/ and screenshots/ from beside
// this file into /output and writes /output/dossier.json with the kit's
// vendored library, which is what the scorer reads. vendor/ stays as the
// kit shipped it — the scorer rebuilds the dossier with its own copy and
// the two must match byte for byte.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Caps from the scorer: at most 4 screenshots, each at most 256 KiB;
// app/ at most 993 files and directories and 16 MiB in all; the dossier
// text at most 160 KiB. An entry past any of these is refused, so the
// library is told the same limits here.
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
