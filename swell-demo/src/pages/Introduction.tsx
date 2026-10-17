import { Link } from "react-router-dom";
import DocsLayout from "../components/DocsLayout";
import Callout from "../components/Callout";

export default function Introduction() {
  return (
    <DocsLayout>
      <article className="prose">
        <div className="breadcrumb">Developers</div>
        <h1>Build with Swell</h1>
        <p className="lede">
          The same ocean and weather data behind the Swell app, available to your own code. No API key is needed for
          non-commercial use.
        </p>
        <div className="cards">
          <Link to="/developers/guides/surf-check" className="card">
            <div className="card__eyebrow">Guide · 10 min</div>
            <div className="card__title">Build a surf check</div>
            <p>Combine swell and wind into a single go/no-go score.</p>
          </Link>
          <Link to="/developers/reference/marine" className="card">
            <div className="card__eyebrow">Reference</div>
            <div className="card__title">Marine API</div>
            <p>Waves, swell, currents and sea surface temperature.</p>
          </Link>
          <Link to="/developers/reference/forecast" className="card">
            <div className="card__eyebrow">Reference</div>
            <div className="card__title">Forecast API</div>
            <p>Wind, temperature, precipitation and more, hourly.</p>
          </Link>
        </div>
        <Callout kind="note" title="Where the data comes from">
          Swell is a demo product. Its API is the real, free{" "}
          <a href="https://open-meteo.com/">Open-Meteo</a> API, and every reference page on this site is rendered from
          Open-Meteo's published OpenAPI specs.
        </Callout>
      </article>
    </DocsLayout>
  );
}
