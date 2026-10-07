# E4454 / U4454 Checkout App

Crew checkout and compartment inventory app for CAL FIRE Engine 4454 and Utility 4454 (Skull Creek, TCU Battalion 4).
Live at https://springv.netlify.app — Netlify publishes this repository automatically on every commit to `main`.

## Layout
- `index.html` — the whole app (one file: styles, script, inventory lists).
- `img/` — compartment photos referenced by `index.html` as `img/<name>`.

## Where things live in `index.html`
- `PERISHABLES` (top of the script) — every medication / perishable expiration date. Update dates here.
- `EQUIPMENT_A`, `EQUIPMENT_B` — Engine 4454 daily checkout items.
- `COMPARTMENTS`, `MEDBAG`, `MEDKITS`, `REARSEAT`, `CAPTSEAT`, `PASSSEAT` — Engine 4454 compartment inventory.
- `UTIL_VEHICLE`, `UTIL_EQUIPMENT` — Utility 4454 weekly checkout items.
- `UTIL_COMPARTMENTS` — Utility 4454 compartment inventory (nested kits under `bags`).

## Notes
- Crew data (drafts, logs, EMS-711-2 initials, inventory checks) is stored in each iPad's browser, not in this repo.
  Use "Back up app data" at the bottom of the Engine 4454 checkout sheet.
- Photo file names are case-sensitive on Netlify. Keep names exactly as referenced.
