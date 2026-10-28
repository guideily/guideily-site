# Guideily — Prepaid Pipeline Packs (marketing site)

Static marketing site for **guideily.com**: prepaid Lead Pack ($497) and Meeting Pack ($1,500) for US agencies, boutique B2B SaaS, and recruiters.

**Brand:** Guideily (Rahul owns guideily.com)  
**Offer:** Outcome packs (formerly planned as Clearout / Sathi Clear) live under Guideily.  
**Stack:** Plain HTML / CSS / JS — no build step required.  
**Stripe:** Paused. Pay CTAs point at `#contact` / `#pay-lead` / `#pay-meeting` placeholders until Payment Links are wired.

---

## ⚠️ PERMANENT RULE — Edtech archive footer link

The live site **must** keep a permanent footer (or similarly visible) link that opens the archived Guideily **edtech** site in a new tab.

- **Label:** `Previous Guideily (edtech archive)`
- **URL:** http://web.archive.org/web/20260409022636/https://guideily.com/
- **Attributes:** `target="_blank"` `rel="noopener noreferrer"`
- **This link must NEVER be deleted, removed, or “cleaned up”** in any redesign.

Local backups of the edtech UI (also NEVER DELETE):

- `/workspace/guideily-archive/`
- `/cursor/stores/store-7d9291a8-d5aa-4c16-9e03-e54575a3a3a0/guideily-edtech-archive/`
- Zip: `Guideily-edtech-UI-archive-2026-10-28.zip`

See HTML comment above the footer archive link in `index.html`.

---

## Site map

| Path | Purpose |
|------|---------|
| `index.html` | Full one-pager: hero, packs, who it’s for, how it works, FAQ, contact CTA |
| `css/styles.css` | Styles |
| `js/main.js` | Mobile nav, mailto contact form, year, Stripe placeholder notes |
| `outreach/emails.md` | Cold email / LinkedIn drafts (do not send from this repo alone) |
| `CNAME` | `guideily.com` for GitHub Pages custom domain |

---

## Local preview

```bash
cd /workspace/guideily-site
python3 -m http.server 8787
```

Open http://127.0.0.1:8787/

---

## Deploy — GitHub Pages (preferred path for Guideily)

**Important:** Use the **Guideily** GitHub account (`subscription.guideily@gmail.com`), **not** Zoris (`rahul9977p-stack`).  
The `cursor-github` MCP is Zoris-only. Parent/agent must push via the **box browser** already signed into Guideily GitHub (or Rahul’s Guideily session).

### One-time

1. In Guideily GitHub, create a public repo (suggested name: `guideily-site` or `guideily.com`).
2. Do **not** use Lovable MCP (Zoris-only). This repo is static files only.
3. Push the contents of `/workspace/guideily-site/` to the repo default branch (`main`).
4. **Settings → Pages:**
   - Source: Deploy from a branch
   - Branch: `main` / `/` (root)
5. **Custom domain:** set `guideily.com` (and optionally `www.guideily.com`).
   - `CNAME` file in this folder already contains `guideily.com`.
6. Cloudflare DNS for guideily.com is already configured — point / confirm:
   - Apex / www → GitHub Pages targets (GitHub shows the exact A / CNAME records), **or**
   - Prefer **Cloudflare Pages** (below) if you want Cloudflare to own the deploy.

### After Stripe resumes

1. Create Stripe Payment Links for Lead Pack ($497) and Meeting Pack ($1,500).
2. Set `#pay-lead` and `#pay-meeting` `href`s in `index.html` to those URLs (or set them in `js/main.js`).
3. Update the pack footnotes that say checkout is paused.

---

## Deploy — Cloudflare Pages (alternative)

1. Cloudflare Dashboard → Workers & Pages → Create → Pages → Upload assets **or** connect the Guideily GitHub repo.
2. Build command: *(none)*  
   Output directory: `/` (project root).
3. Custom domain: attach `guideily.com` / `www.guideily.com` (DNS already on Cloudflare).
4. Same archive-footer rule applies.

If the Cloudflare connector is in `needsAuth`, prefer uploading via Guideily GitHub + Cloudflare Git integration from the browser, or drag-and-drop the folder as a direct upload.

---

## Separation from Zoris

- **Never** push this site to `rahul9977p-stack/Zoris` or any Zoris infrastructure.
- **Never** use Lovable MCP for Guideily.
- Guideily GitHub Google login: `subscription.guideily@gmail.com`.

---

## Contact

Public CTA email: **hello@guideily.com** (confirm Workspace / inbox is live before heavy outbound).
