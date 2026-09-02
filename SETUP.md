# Survey Forms — Setup Guide

Two standalone, unbranded survey forms (no Kopi Boy identity anywhere in the
files — safe for anonymous distribution), plus one shared backend that
archives every submission into a Google Sheet automatically.

## Files

- `rider-survey.html` — the delivery riders/helpers survey
- `merchant-survey.html` — the home cooks/hawkers survey
- `apps-script-code.gs` — the backend that saves responses to a Google Sheet

## Setup order (do this before hosting on GitHub)

### 1. Create the Google Sheet + backend

1. Go to **sheets.google.com** → create a new blank spreadsheet. Name it
   anything, e.g. "Survey Responses".
2. In that sheet: **Extensions → Apps Script**.
3. Delete the placeholder code in the editor, paste in the entire contents
   of `apps-script-code.gs`.
4. **Deploy → New deployment** → click the gear icon → **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**.
5. It'll ask you to authorize permissions — click through **Advanced →
   Go to project (unsafe)** if that warning appears (it's your own script,
   this is expected and safe).
6. Copy the **Web app URL** it gives you at the end. Keep this tab open,
   you need it in the next step.

### 2. Wire the URL into both HTML files

In **both** `rider-survey.html` and `merchant-survey.html`, find this line
near the bottom (inside the `<script>` tag):

```js
const SCRIPT_URL = "PASTE_YOUR_APPS_SCRIPT_URL_HERE";
```

Replace `PASTE_YOUR_APPS_SCRIPT_URL_HERE` with the Web app URL you copied,
keeping the quote marks. Save both files.

### 3. Host on GitHub Pages

1. Create a new GitHub repo (any name, e.g. `sg-gig-survey`).
2. Upload both edited HTML files to it.
3. In the repo: **Settings → Pages** → under "Branch", select `main` →
   Save.
4. GitHub gives you a live URL after a minute or two, looking like:
   `https://<your-username>.github.io/sg-gig-survey/rider-survey.html`
   and the same with `merchant-survey.html` for the other one.

### 4. Generate your QR codes

Use any free QR generator (e.g. `qr-code-generator.com`) and paste in each
of the two GitHub Pages URLs above — one QR code per survey. Print and
place near riders/merchants as planned.

## Checking responses

Go back to your Google Sheet any time — every submission appears as a new
row automatically, on a **"Riders"** tab or **"Merchants"** tab (created
automatically the first time each survey gets its first response). Each
row is timestamped.

## Notes

- Both forms collect **zero personal information** — no name, phone, or
  email field exists anywhere in either form.
- If you ever edit `apps-script-code.gs` later, you must create a **new
  deployment version** (Deploy → Manage deployments → pencil icon → New
  version) for changes to take effect — editing the script alone does not
  update the live URL.
