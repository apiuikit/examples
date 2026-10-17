import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

const NAV = [
  {
    title: "Getting started",
    links: [
      { to: "/developers", label: "Introduction" },
      { to: "#", label: "Authentication" },
      { to: "#", label: "Rate limits" },
    ],
  },
  {
    title: "Guides",
    links: [
      { to: "/developers/guides/surf-check", label: "Build a surf check" },
      { to: "#", label: "Swell alerts by SMS" },
      { to: "#", label: "Air quality for dawn patrol" },
    ],
  },
  {
    title: "API reference",
    links: [
      { to: "/developers/reference/marine", label: "Marine" },
      { to: "/developers/reference/forecast", label: "Forecast" },
      { to: "/developers/reference/air-quality", label: "Air quality" },
    ],
  },
];

export interface TocItem {
  id: string;
  label: string;
}

export default function DocsLayout({ children, toc, wide }: { children: ReactNode; toc?: TocItem[]; wide?: boolean }) {
  return (
    <div className={`docs ${wide ? "docs--wide" : ""}`}>
      <aside className="docs-sidebar">
        {NAV.map((group) => (
          <div key={group.title} className="docs-sidebar__group">
            <div className="docs-sidebar__title">{group.title}</div>
            {group.links.map((link) =>
              link.to === "#" ? (
                <span key={link.label} className="docs-sidebar__link docs-sidebar__link--soon">
                  {link.label}
                </span>
              ) : (
                <NavLink key={link.label} to={link.to} end className="docs-sidebar__link">
                  {link.label}
                </NavLink>
              ),
            )}
          </div>
        ))}
      </aside>

      <main className="docs-main">{children}</main>

      {toc && (
        <nav className="docs-toc">
          <div className="docs-toc__title">On this page</div>
          {toc.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}
