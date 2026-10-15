# LIFELINE

An autonomous first-response vehicle for city parks — a concept by Jack Verbel for the
LAND × CarDesign Academy "Un-Car" challenge (Fall 2026).

The site follows the brief's structure: Person + Purpose, Vehicle Design, Package + Experience,
LAND CORE, Key Features and Design Development, plus the hero / persona / use-case images,
the 150-word project summary and an AI-use disclosure.

## Files

```
index.html      the whole page
styles.css      design system (LAND-style wide display type, pills, mist/dark bands)
site.js         nav state, scroll reveals, canopy compare, hotspots, lightbox
vercel.json     clean URLs + long cache on /img
img/            renders and sketches as responsive WebP (800 / 1400 / 2200 px; sketches 900 / 1800)
downloads/      full-size hero, use-case and persona JPGs for the competition submission
favicon.svg
```

Plain HTML, CSS and JS — no build step. Open `index.html` through any static server
(`python -m http.server`) to preview, since paths are root-relative.

## Credits

Concept, persona, package and original sketches: Jack Verbel. Renders and sketch iterations:
Google Nano Banana 2.1 via Runware, driven by Jack's sketches and earlier renders. The LAND
wordmark was traced from LAND's official logo and composited onto the images. LAND and CORE are
trademarks of LAND, shown in reference to the competition.
