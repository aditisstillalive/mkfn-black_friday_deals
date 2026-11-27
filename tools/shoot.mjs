// Takes the screenshots listed in shots.json from the site served at BASE (default http://localhost:8080), as
// real renders of app/ in Chromium, and writes them to screenshots/ as JPEGs within the gate's limits.
//   node serve.ts &   PLAYWRIGHT_DIR=<dir holding node_modules/playwright> node tools/shoot.mjs
// CHROME may name a Chromium binary to use instead of Playwright's own download.

import { createRequire } from 'node:module';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const require = createRequire(join(process.env.PLAYWRIGHT_DIR ?? process.cwd(), 'noop.js'));
const { chromium } = require('playwright');
const base = process.env.BASE ?? 'http://localhost:8080/';
const shots = JSON.parse(readFileSync('shots.json', 'utf8'));
const browser = await chromium.launch(process.env.CHROME ? { executablePath: process.env.CHROME } : {});

for (const shot of shots) {
  const page = await browser.newPage({ viewport: shot.viewport, deviceScaleFactor: 1 });
  await page.goto(base + shot.path);
  await page.waitForFunction(() => window.__shotReady === true);
  for (const step of shot.steps ?? []) {
    if (step.type) await page.fill(step.type, step.text);
    if (step.click) await page.click(step.click);
  }
  await page.waitForTimeout(150);
  const file = join('screenshots', shot.file);
  await page.screenshot({ path: file, type: 'jpeg', quality: shot.quality ?? 82 });
  console.log(`${file} ${statSync(file).size} bytes`);
  await page.close();
}
await browser.close();
