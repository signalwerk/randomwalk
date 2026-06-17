import type { ReactNode } from "react";
import { hrefFor } from "../../lib/routes";
import "./PageShell.scss";

type PageShellProps = {
  children: ReactNode;
  years: string[];
};

export function PageShell({ children, years }: PageShellProps) {
  const latestYear = years[0];

  return (
    <>
      <header className="page-shell">
        <a className="page-shell__brand" href={hrefFor("/")}>
          Random Walk
        </a>
        <nav className="page-shell__nav" aria-label="Main navigation">
          {latestYear && (
            <a className="page-shell__link" href={hrefFor(`/log/${latestYear}/`)}>
              Log
            </a>
          )}
          <a className="page-shell__link" href={hrefFor("/topics/")}>
            Topics
          </a>
        </nav>
      </header>
      {children}
    </>
  );
}
