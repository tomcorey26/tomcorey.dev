# Hidden Calendar Page — Design

## Goal

Add a single unlisted page that embeds Tom's Google Calendar so he can glance at his schedule from any browser. Free/busy mode only — event titles, locations, and descriptions are hidden.

## Scope

**In:**
- One new page at `/calendar`.
- Reuses the existing `BaseHead` + `Header` + `Footer` chrome so it matches the rest of the site.
- Embeds Google Calendar via official iframe.
- `<meta name="robots" content="noindex, nofollow">` to keep it out of search results.

**Out (YAGNI):**
- Any navigation link to the page.
- Authentication / access gating.
- Custom event rendering or theming over Google's iframe.
- Multi-calendar merging, event creation, or anything beyond viewing.
- Tests — it's a static iframe page; manual verification is enough.

## Threat model

The page URL is publicly reachable. Tom configures the calendar in Google as "See only free/busy (hide details)" before sharing the embed URL, so the only thing leaked to a visitor is when he is busy — no titles, locations, attendees, or descriptions. He accepts that trade-off and prefers the simplicity over any auth gate.

## Implementation

### One new file: `src/pages/calendar.astro`

Structure mirrors `src/pages/index.astro`:

```
---
import BaseHead from "../components/BaseHead.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";

const CALENDAR_EMBED_URL = "<paste from Google Calendar 'Integrate calendar' section>";
---
<!DOCTYPE html>
<html lang="en">
  <head>
    <BaseHead title="Calendar" description="Schedule" />
    <meta name="robots" content="noindex, nofollow" />
  </head>
  <body>
    <Header />
    <main>
      <h1>Calendar</h1>
      <div class="calendar-frame">
        <iframe
          src={CALENDAR_EMBED_URL}
          title="Google Calendar"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>
    </main>
    <Footer />
  </body>
</html>
```

Styling: wrap the iframe in a max-width container (~1100px) centered on the page, with the iframe filling the wrapper's width and ~700px tall on desktop, scaled down on mobile. Match the site's frosted-glass card aesthetic loosely (rounded corners, subtle border) but keep it simple — the iframe itself is opinionated about its own styling.

### No other code changes

- Do **not** edit `src/components/Header.astro`.
- Do **not** add the route to the sitemap exclusion list — Astro's sitemap integration will include it, but the `noindex` meta tag keeps it out of search engine results, which is what matters in practice. (If unwanted, add a sitemap filter later — out of scope here.)

## One-time Google Calendar setup (manual, by Tom)

1. Google Calendar → Settings → select the calendar → **Access permissions for events**.
2. Check **"Make available to public"** → choose **"See only free/busy (hide details)"**.
3. Scroll to **"Integrate calendar"** → copy the **"Public URL to this calendar"** or the iframe `src` from the embed code.
4. Paste that URL into `CALENDAR_EMBED_URL` in `src/pages/calendar.astro`.

## Verification

- `npm run dev`, visit `http://localhost:3000/calendar`.
- Confirm: calendar renders, only time blocks visible (no event titles), no navigation link on home, page chrome matches the rest of the site.
- `npm run build` succeeds and produces `dist/calendar/index.html`.

## Open questions

None.
