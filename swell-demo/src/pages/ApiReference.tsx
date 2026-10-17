import { OpenAPI } from "apiuikit";
import { Navigate, useParams } from "react-router-dom";
import DocsLayout from "../components/DocsLayout";
import { docsConfig } from "../lib/docsConfig";
import { marine, forecast, airQuality } from "../specs";

const SPECS = { marine, forecast, "air-quality": airQuality } as const;

// The site already has its own sidebar, so hide APIUIKit's.
const referenceConfig = { ...docsConfig, show: { ...docsConfig.show, sidebar: false } };

export default function ApiReference() {
  const { api = "" } = useParams();
  const spec = SPECS[api as keyof typeof SPECS];
  if (!spec) return <Navigate to="/developers" replace />;

  return (
    <DocsLayout wide>
      <OpenAPI key={api} openapi={spec} config={referenceConfig} />
    </DocsLayout>
  );
}
