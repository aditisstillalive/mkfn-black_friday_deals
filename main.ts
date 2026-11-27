// Hands in Tagtruth, a Black Friday deal finder (Node 22, standard library only). The site is app/: static files a
// browser opens at app/index.html (ES modules and CSS, no build step), its 50 deals in app/data, nothing loaded over
// the network, each deal linking out to its store. This program copies app/ and screenshots/ to /output and writes
// /output/dossier.json with the kit's vendored make.fun library, which must stay byte for byte as the kit ships it.
//
// Serve it locally with `node serve.ts`, then open http://localhost:8080; tools/shoot.mjs retakes the screenshots.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Refuse to hand in a broken entry: the page, its deal data and 3 or 4 screenshots must all be here.
const shots = existsSync(join(here, 'screenshots'))
  ? readdirSync(join(here, 'screenshots')).filter((f) => /\.(jpe?g|png)$/i.test(f) && !f.startsWith('.'))
  : [];
for (const file of ['app/index.html', 'app/data/deals.js']) {
  if (!existsSync(join(here, file))) throw new Error(`Tagtruth is missing ${file}`);
}
if (shots.length < 3 || shots.length > 4) throw new Error(`Tagtruth needs 3 or 4 screenshots, found ${shots.length}`);

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the bytes; the others refuse an entry the
// scorer would refuse (more than 4 screenshots or one over 256 KiB; more than 993 files and directories in app/ or
// 16 MiB of app files: app/ counts beside /output's own 1000-entry cap, its screenshots/ and dossier.json).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
