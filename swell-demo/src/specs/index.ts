import type { OpenAPIDocumentData } from "apiuikit";
import marineJson from "./marine.json";
import forecastJson from "./forecast.json";
import airQualityJson from "./air-quality.json";

// Open-Meteo's published OpenAPI specs, converted from YAML to JSON.
// https://github.com/open-meteo/open-meteo/tree/main/openapi
//
// Open-Meteo declares `servers` on each path item rather than at the top of the
// document. APIUIKit 2.4.0 only reads document-level `servers`, so copy them up;
// otherwise code samples and Try it would point at the page's own origin.
function withPathServers(spec: unknown): OpenAPIDocumentData {
  const doc = spec as OpenAPIDocumentData;
  type PathItem = { servers?: NonNullable<OpenAPIDocumentData["servers"]> };
  const pathServers = Object.values(doc.paths ?? {}).flatMap((item) => (item as PathItem | undefined)?.servers ?? []);
  return doc.servers?.length || !pathServers.length ? doc : { ...doc, servers: pathServers };
}

export const marine = withPathServers(marineJson);
export const forecast = withPathServers(forecastJson);
export const airQuality = withPathServers(airQualityJson);
