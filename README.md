# Honeywell Incidents (Frontend)

A small React + TypeScript app that loads incidents, removes duplicates by Id (keeping the latest by DateTime), sorts by **Priority ascending** then **DateTime descending**, and renders them in **table** and **list** views with priority icons.

## How to run
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Mapping & Rules
- Priority: `1 → High`, `2 → Medium`, `3 → Low`.
- Sort: Priority ascending, DateTime descending.
- Deduplicate: keep latest by DateTime when `Id` repeats.
- Date format: localised using `Intl.DateTimeFormat`.

## Notes
- Replace `utils/api.ts` to call the provided **fake API** (`getLocations`, `getIncidentsByLocationId`) from your test harness, or copy their file into this project and wire it.
- Icons are copied from the challenge package.
- Production deployment strategy: host static build (`dist/`) behind a CDN (CloudFront/Akamai) with immutable asset caching; enable compression and HTTP/2; set cache-control headers; use SPA fallback if needed.


## Tests
```bash
npm test
```

## Using the provided fake API
The project imports the provided `fake-api.js` (copied from the challenge) and normalises field names to the internal `Incident` type.
