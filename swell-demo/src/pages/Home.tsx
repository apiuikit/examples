import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SurfCheckWidget from "../components/SurfCheckWidget";
import { fetchConditions, scoreSession, SPOTS, type Conditions } from "../lib/surf";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__inner">
          <div className="hero__copy">
            <div className="pill">New · Swell for Developers</div>
            <h1>Know before you paddle out.</h1>
            <p>
              Swell forecasts, wind and tides for 4,000 breaks, distilled into one score you can read from the car
              park.
            </p>
            <div className="hero__ctas">
              <a className="btn btn--primary btn--lg" href="#" onClick={(e) => e.preventDefault()}>
                Get the app
              </a>
              <Link className="btn btn--ghost btn--lg" to="/developers/guides/surf-check">
                Build with our API →
              </Link>
            </div>
          </div>
          <SurfCheckWidget compact />
        </div>
      </section>

      <section className="spots">
        <div className="spots__inner">
          <h2>Right now around the world</h2>
          <div className="spots__grid">
            {SPOTS.map((spot) => (
              <SpotCard key={spot.id} spotId={spot.id} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SpotCard({ spotId }: { spotId: string }) {
  const spot = SPOTS.find((s) => s.id === spotId)!;
  const [c, setC] = useState<Conditions | null>(null);
  useEffect(() => {
    fetchConditions(spot).then(setC).catch(() => {});
  }, [spot]);
  const score = c ? scoreSession(c, spot) : null;
  return (
    <div className="spot">
      <div className="spot__region">{spot.region}</div>
      <div className="spot__name">{spot.name}</div>
      <div className="spot__row">
        <span className={`spot__score surfcheck__score--${score?.label.toLowerCase() ?? ""}`}>
          {score ? score.value.toFixed(1) : "–"}
        </span>
        <span className="spot__meta">
          {c ? `${c.swellHeight.toFixed(1)} m @ ${Math.round(c.swellPeriod)} s · ${score!.wind}` : "Loading…"}
        </span>
      </div>
    </div>
  );
}
