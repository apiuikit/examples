import { OpenAPIEndpoint } from "apiuikit";
import DocsLayout from "../components/DocsLayout";
import Callout from "../components/Callout";
import CodeBlock from "../components/CodeBlock";
import SurfCheckWidget from "../components/SurfCheckWidget";
import { docsConfig } from "../lib/docsConfig";
import { marine, forecast } from "../specs";

const toc = [
  { id: "what-youll-build", label: "What you'll build" },
  { id: "fetch-the-swell", label: "1. Fetch the swell" },
  { id: "add-the-wind", label: "2. Add the wind" },
  { id: "score-the-session", label: "3. Score the session" },
];

export default function SurfCheckGuide() {
  return (
    <DocsLayout toc={toc}>
      <article className="prose">
        <div className="breadcrumb">Developers / Guides</div>
        <h1>Build a surf check</h1>
        <p className="lede">
          Every surfer asks the same question at 5 a.m.: <em>is it worth paddling out?</em> In this guide you'll answer
          it with two API calls and about forty lines of code.
        </p>

        <h2 id="what-youll-build">What you'll build</h2>
        <p>
          A widget that turns raw ocean data into a single 0–10 score. This one is live, so pick a spot and watch it
          call the same endpoints documented below.
        </p>
        <SurfCheckWidget />

        <h2 id="fetch-the-swell">1. Fetch the swell</h2>
        <p>
          Wave data comes from the Marine endpoint. You need three numbers: how big the swell is, how far apart the
          waves are (the <strong>period</strong>), and where they're coming from.
        </p>

        <OpenAPIEndpoint document={marine} method="get" path="/v1/marine" config={docsConfig} />

        <Callout title="Ask for swell_wave_*, not wave_*">
          <code>wave_height</code> is the combined sea state, including local wind chop. Surfers care about the
          groundswell underneath, so request <code>swell_wave_height</code>, <code>swell_wave_period</code> and{" "}
          <code>swell_wave_direction</code> in the <code>current</code> parameter.
        </Callout>

        <h2 id="add-the-wind">2. Add the wind</h2>
        <p>
          A perfect swell can still be ruined by wind blowing onto the beach. Wind lives on the Forecast endpoint. Ask
          for knots, because that's what every surfer already thinks in.
        </p>

        <OpenAPIEndpoint document={forecast} method="get" path="/v1/forecast" config={docsConfig} />

        <Callout kind="warning" title="Offshore depends on the beach">
          A west wind is offshore at a beach that faces east and onshore at one that faces west. Store which way each
          spot faces, then compare it with <code>wind_direction_10m</code>.
        </Callout>

        <h2 id="score-the-session">3. Score the session</h2>
        <p>
          Combine the two responses into one number: up to 4 points for size, 3 for period, and 3 for clean wind.
        </p>
        <CodeBlock title="surf.ts">{`
export function scoreSession(c: Conditions, spot: Spot): Score {
  const size   = clamp((c.swellHeight - 0.3) / 1.7) * 4;
  const period = clamp((c.swellPeriod - 6) / 8) * 3;

  const offshoreFrom = (spot.faces + 180) % 360;
  const off  = angleBetween(c.windDirection, offshoreFrom);
  const wind = c.windSpeed < 5 ? "glassy"
             : off <= 45       ? "offshore"
             : off >= 135      ? "onshore"
             :                   "cross-shore";

  return { value: size + period + windScore(wind, c.windSpeed), wind };
}`}</CodeBlock>
        <Callout kind="note" title="Next up">
          Send yourself a text when your home break scores above 7. See <em>Swell alerts by SMS</em>.
        </Callout>
      </article>
    </DocsLayout>
  );
}
