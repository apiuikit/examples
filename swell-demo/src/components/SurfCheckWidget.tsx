import { useEffect, useState } from "react";
import { compass, fetchConditions, scoreSession, SPOTS, type Conditions } from "../lib/surf";

/** The thing the guide teaches you to build — running live against Open-Meteo. */
export default function SurfCheckWidget({ compact }: { compact?: boolean }) {
  const [spotId, setSpotId] = useState(SPOTS[0].id);
  const [conditions, setConditions] = useState<Conditions | null>(null);
  const [error, setError] = useState(false);
  const spot = SPOTS.find((s) => s.id === spotId)!;

  useEffect(() => {
    let cancelled = false;
    setConditions(null);
    setError(false);
    fetchConditions(spot)
      .then((c) => !cancelled && setConditions(c))
      .catch(() => !cancelled && setError(true));
    return () => {
      cancelled = true;
    };
  }, [spot]);

  const score = conditions ? scoreSession(conditions, spot) : null;

  return (
    <div className={`surfcheck ${compact ? "surfcheck--compact" : ""}`}>
      <div className="surfcheck__head">
        <div>
          <div className="surfcheck__eyebrow">
            <span className="live-dot" /> Live surf check
          </div>
          <select className="surfcheck__select" value={spotId} onChange={(e) => setSpotId(e.target.value)}>
            {SPOTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} · {s.region}
              </option>
            ))}
          </select>
        </div>
        <div className={`surfcheck__score ${score ? `surfcheck__score--${score.label.toLowerCase()}` : ""}`}>
          <span className="surfcheck__score-value">{score ? score.value.toFixed(1) : "–"}</span>
          <span className="surfcheck__score-label">{score ? score.label : error ? "Offline" : "Loading"}</span>
        </div>
      </div>

      <div className="surfcheck__stats">
        <Stat label="Swell" value={conditions ? `${conditions.swellHeight.toFixed(1)} m` : "…"} hint={conditions ? `from ${compass(conditions.swellDirection)}` : ""} />
        <Stat label="Period" value={conditions ? `${Math.round(conditions.swellPeriod)} s` : "…"} hint={conditions ? (conditions.swellPeriod >= 11 ? "groundswell" : "wind swell") : ""} />
        <Stat label="Wind" value={conditions ? `${Math.round(conditions.windSpeed)} kn` : "…"} hint={score ? `${score.wind}, from ${compass(conditions!.windDirection)}` : ""} />
      </div>

      <WaveLine height={conditions?.swellHeight ?? 0.6} period={conditions?.swellPeriod ?? 10} />
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="stat">
      <div className="stat__label">{label}</div>
      <div className="stat__value">{value}</div>
      <div className="stat__hint">{hint || " "}</div>
    </div>
  );
}

/** A decorative wave whose amplitude and wavelength follow the real swell. */
function WaveLine({ height, period }: { height: number; period: number }) {
  const amp = 6 + Math.min(height, 3) * 7;
  const wavelength = 40 + Math.min(period, 18) * 6;
  let d = "M0 40";
  for (let x = 0; x <= 640; x += 8) {
    d += ` L${x} ${(40 - amp * Math.sin((x / wavelength) * Math.PI * 2)).toFixed(1)}`;
  }
  return (
    <svg className="surfcheck__wave" viewBox="0 0 640 80" preserveAspectRatio="none" aria-hidden>
      <path d={`${d} L640 80 L0 80 Z`} />
    </svg>
  );
}
