import { Link, NavLink } from "react-router-dom";

export function Logo() {
  return (
    <Link to="/" className="logo">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden>
        <rect width="32" height="32" rx="8" fill="currentColor" />
        <path d="M5 20c3.5 0 4-6 8-6s4.5 6 8 6 3.5-3 6-3" fill="none" stroke="#5EEAD4" strokeWidth="2.6" strokeLinecap="round" />
      </svg>
      <span>Swell</span>
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Logo />
        <nav className="site-nav">
          <NavLink to="/" end>Forecasts</NavLink>
          <NavLink to="/developers">Developers</NavLink>
        </nav>
        <div className="demo-badge" role="note">
          <span className="demo-badge__full">Swell is not a real product. This is just a demo site showing APIUIKit in a real-world scenario.</span>
          <span className="demo-badge__short">Demo site, not a real product</span>
        </div>
        <div className="site-header__actions">
          <a className="btn btn--ghost" href="#" onClick={(e) => e.preventDefault()}>Sign in</a>
          <a className="btn btn--primary" href="#" onClick={(e) => e.preventDefault()}>Get the app</a>
        </div>
      </div>
    </header>
  );
}
