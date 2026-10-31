# Guideily: verified lead lists and outbound for US B2B teams

Static marketing site for [guideily.com](https://guideily.com).

## Offer (v2)
- **Sample, $149:** 20 verified ICP leads in 48h, credited toward a pack. Full refund if fewer than 80% match.
- **Lead Pack, $497:** 100 verified leads plus personalized first lines.
- **Outbound Pack, $899:** done-for-you outbound (lead list + 3–4 step sequence, run for you).

For US B2B agencies, boutique SaaS, and recruiters. Not edtech.

## Stack
Static HTML / CSS / JS on GitHub Pages. `CNAME` → `guideily.com`. The cache-bust query is `?v=7`.

## Archive
The footer permanently links to the previous edtech site via Wayback:
https://web.archive.org/web/20260409022636/https://guideily.com/

## Stripe (TODO)
Paste the Payment Links into `STRIPE_LINKS` in `js/main.js` (`sample`, `lead`, `meeting`).
While a link is empty, its button scrolls to the request form, which opens a mailto to hello@guideily.com.
