# Mobile Speed Review — thedailystar.net

Static case study (HTML/CSS/JS only, no build step) diagnosing the mobile
performance of a real public website and proving a fix by rebuilding one
section of it.

Task B deliverable — Digital Heroes Training Task.

## Deploy to Netlify

**Drag & drop:** unzip, then drag the unzipped folder onto
https://app.netlify.com/drop — done, no configuration needed.

**Netlify CLI:**

```bash
npx netlify-cli deploy --dir . --prod
```

**Git:** push this folder to a repo and connect it. Build command: none.
Publish directory: `.` (already set in `netlify.toml`).

## Contents

| Path | What it is |
|---|---|
| `index.html` | Client-facing summary (Deliverable D) |
| `diagnosis.html` | Full diagnosis with evidence (Deliverable A) |
| `fixes.html` | Prioritised fix list + explicit skip list (Deliverable B) |
| `results.html` | Before/after metrics + methodology (Deliverable C) |
| `demo/before/index.html` | Replica of the current delivery pattern — 45/100 |
| `demo/after/index.html` | Rebuilt section — 100/100 |
| `assets/orig/` | Real images + the real 6.94 MB `bmw.gif` from the live site |
| `assets/opt/` | AVIF/WebP/JPEG derivatives + the 40 KB MP4 ad |
| `netlify.toml` | Publish dir + cache headers |

## Headline result

| Metric | Before | After |
|---|---|---|
| Lighthouse mobile score | 45 | 100 |
| LCP | 37,988 ms | 1,353 ms |
| Total Blocking Time | 3,449 ms | 0 ms |
| Transfer | 7,634 KB | 133 KB |
| Requests | 49 | 9 |

## Reproduce the measurements

```bash
npx http-server -p 8099 -c-1 .
npx lighthouse http://127.0.0.1:8099/demo/before/index.html \
  --form-factor=mobile --screenEmulation.mobile \
  --throttling-method=simulate --only-categories=performance
npx lighthouse http://127.0.0.1:8099/demo/after/index.html \
  --form-factor=mobile --screenEmulation.mobile \
  --throttling-method=simulate --only-categories=performance
```

Live-site audit:

```bash
npx lighthouse https://www.thedailystar.net/ \
  --form-factor=mobile --screenEmulation.mobile \
  --throttling-method=simulate --only-categories=performance
```

## Notes on honesty

- Third-party ad/analytics tags are **not** loaded in the demo. Both demo pages
  run an identical, deterministic ~900 ms of CPU work (less than a quarter of
  the 3,890 ms measured on the live site); only its *scheduling* differs.
- The "before" page uses 41 emulated component stylesheets to reproduce the
  request-chain shape of the live page's 74.
- Real-user (CrUX) field data is not published because the keyless PSI quota
  returned HTTP 429 at test time. Add an API key to include it.

## Attribution

Independent, unsolicited case study of a publicly accessible website. No
affiliation with The Daily Star. Their headlines and photographs are reproduced
solely to demonstrate the delivery technique and remain their property.
Footer credit links to https://digitalheroesco.com as required.
