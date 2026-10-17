export interface Spot {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  /** Compass bearing the beach faces, out to sea. Offshore wind blows from the opposite direction. */
  faces: number;
}

export const SPOTS: Spot[] = [
  { id: "ocean-beach", name: "Ocean Beach", region: "San Francisco, US", latitude: 37.7594, longitude: -122.5107, faces: 270 },
  { id: "pipeline", name: "Pipeline", region: "Oʻahu, Hawaiʻi", latitude: 21.665, longitude: -158.053, faces: 340 },
  { id: "nazare", name: "Praia do Norte", region: "Nazaré, Portugal", latitude: 39.605, longitude: -9.085, faces: 290 },
  { id: "hossegor", name: "La Gravière", region: "Hossegor, France", latitude: 43.665, longitude: -1.445, faces: 270 },
];

export interface Conditions {
  swellHeight: number; // metres
  swellPeriod: number; // seconds
  swellDirection: number; // degrees, "from"
  windSpeed: number; // knots
  windDirection: number; // degrees, "from"
  time: string;
}

/** The free API occasionally answers 503 under load, so retry a couple of times. */
async function getJson(url: string, attempts = 3): Promise<any> {
  const res = await fetch(url);
  if (res.ok) return res.json();
  if (attempts <= 1) throw new Error(`${res.status} from ${url}`);
  await new Promise((r) => setTimeout(r, 600));
  return getJson(url, attempts - 1);
}

export async function fetchConditions(spot: Spot): Promise<Conditions> {
  const where = `latitude=${spot.latitude}&longitude=${spot.longitude}&timezone=auto`;

  const [marine, forecast] = await Promise.all([
    getJson(
      `https://marine-api.open-meteo.com/v1/marine?${where}` +
        `&current=swell_wave_height,swell_wave_period,swell_wave_direction`,
    ),
    getJson(
      `https://api.open-meteo.com/v1/forecast?${where}` +
        `&current=wind_speed_10m,wind_direction_10m&wind_speed_unit=kn`,
    ),
  ]);

  return {
    swellHeight: marine.current.swell_wave_height,
    swellPeriod: marine.current.swell_wave_period,
    swellDirection: marine.current.swell_wave_direction,
    windSpeed: forecast.current.wind_speed_10m,
    windDirection: forecast.current.wind_direction_10m,
    time: marine.current.time,
  };
}

export type WindKind = "glassy" | "offshore" | "cross-shore" | "onshore";

export interface Score {
  value: number; // 0–10
  label: "Flat" | "Poor" | "Fair" | "Good" | "Firing";
  wind: WindKind;
}

const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));

/** Smallest angle between two bearings, 0–180. */
const angleBetween = (a: number, b: number) => {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
};

export function scoreSession(c: Conditions, spot: Spot): Score {
  // Size: knee-high (0.3 m) scores nothing, ~2 m of swell maxes it out.
  const size = clamp((c.swellHeight - 0.3) / 1.7) * 4;
  // Period: long-period groundswell carries far more energy than wind chop.
  const period = clamp((c.swellPeriod - 6) / 8) * 3;

  // Wind: offshore grooms the waves, onshore blows them apart.
  const offshoreFrom = (spot.faces + 180) % 360;
  const off = angleBetween(c.windDirection, offshoreFrom);
  const wind: WindKind =
    c.windSpeed < 5 ? "glassy" : off <= 45 ? "offshore" : off >= 135 ? "onshore" : "cross-shore";
  const windScore =
    wind === "glassy" || wind === "offshore" ? 3 : wind === "cross-shore" ? 1.5 : clamp(1 - c.windSpeed / 20) * 1.5;

  const value = Math.round((size + period + windScore) * 10) / 10;
  const label = value < 2 ? "Flat" : value < 4 ? "Poor" : value < 6 ? "Fair" : value < 8 ? "Good" : "Firing";
  return { value, label, wind };
}

export const compass = (deg: number) =>
  ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.round(deg / 45) % 8];
