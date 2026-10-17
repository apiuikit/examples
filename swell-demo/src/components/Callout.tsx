import type { ReactNode } from "react";

const ICONS = { tip: "🏄", warning: "🌊", note: "📍" } as const;

export default function Callout({
  kind = "tip",
  title,
  children,
}: {
  kind?: keyof typeof ICONS;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`callout callout--${kind}`}>
      <span className="callout__icon" aria-hidden>
        {ICONS[kind]}
      </span>
      <div>
        <div className="callout__title">{title}</div>
        <div className="callout__body">{children}</div>
      </div>
    </div>
  );
}
