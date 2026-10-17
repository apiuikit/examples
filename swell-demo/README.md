# Swell: APIUIKit demo

The demo site for the article *Your API Docs Don't Need a Separate Website* (TODO: link to the article on Medium once it's published). Live at [swell-demo.examples.apiuikit.com](https://swell-demo.examples.apiuikit.com).

Swell is a fictional surf-forecast app built on the real, free [Open-Meteo](https://open-meteo.com) API. Its developer section renders Open-Meteo's published OpenAPI specs with [APIUIKit](https://apiuikit.com).

```bash
npm install
npm run dev
```

| Route | What it shows |
| --- | --- |
| `/` | The product: a live surf check and spot cards (calls Open-Meteo directly) |
| `/developers/guides/surf-check` | A guide mixing Swell's components with `<OpenAPIEndpoint />` cards |
| `/developers/reference/marine` (also `forecast`, `air-quality`) | The full `<OpenAPI />` renderer inside Swell's layout |

Key files:

- `src/pages/SurfCheckGuide.tsx`: the composed guide page
- `src/pages/ApiReference.tsx`: the full renderer with APIUIKit's sidebar hidden
- `src/lib/docsConfig.ts`: the shared APIUIKit theme and config
- `src/specs/`: Open-Meteo's specs (from [open-meteo/openapi](https://github.com/open-meteo/open-meteo/tree/main/openapi)), converted to JSON

Weather data by Open-Meteo.com, CC BY 4.0.
