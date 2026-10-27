# E4454 / U4454 Checkout App

Crew checkout and compartment inventory app for CAL FIRE Engine 4454 and Utility 4454 (Skull Creek, TCU Battalion 4).
Live at https://springv.netlify.app — Netlify publishes this repository automatically on every commit to `main`.

## Layout
- `index.html` — the whole app (one file: styles, script, inventory lists).
- `img/` — compartment photos referenced by `index.html` as `img/<name>`.
- `shutdown/index.html` — Skull Creek station shutdown checklist (springv.netlify.app/shutdown/). Check-offs are shared by the whole crew with the date and the checker's initials. Also shows a National Weather Service forecast and active alerts for the phone's GPS position (no API key; cached for offline).
- `netlify/functions/shutdown.mts` — small API (`/api/shutdown`) that stores the shutdown check-offs in Netlify Blobs. Needs `package.json` for its dependencies.

## Where things live in `index.html`
- `PERISHABLES` (top of the script) — every medication / perishable expiration date. Update dates here.
- `EQUIPMENT_A`, `EQUIPMENT_B` — Engine 4454 daily checkout items.
- `COMPARTMENTS`, `MEDBAG`, `MEDKITS`, `REARSEAT`, `CAPTSEAT`, `PASSSEAT` — Engine 4454 compartment inventory.
- `UTIL_VEHICLE`, `UTIL_EQUIPMENT` — Utility 4454 weekly checkout items.
- `UTIL_COMPARTMENTS` — Utility 4454 compartment inventory (nested kits under `bags`).

## Notes
- Shutdown checklist check-offs live on the server (Netlify Blobs), so every device sees the same list. Lists are edited in the `SECTIONS` / `TODAY_ITEMS` config at the top of the script in `shutdown/index.html`; editing an item's wording clears its check-off.
- Crew data (drafts, logs, EMS-711-2 initials, inventory checks) is stored in each iPad's browser, not in this repo.
  Use "Back up app data" at the bottom of the Engine 4454 checkout sheet.
- Photo file names are case-sensitive on Netlify. Keep names exactly as referenced.
