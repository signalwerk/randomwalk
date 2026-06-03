import { CanvasHeader } from "../../components/CanvasHeader/CanvasHeader";
import { ScrollIndicator } from "../../components/ScrollIndicator/ScrollIndicator";
import { hrefFor } from "../../lib/routes";
import "./HomePage.scss";

type HomePageProps = {
  latestYear?: string;
};

export function HomePage({ latestYear }: HomePageProps) {
  return (
    <main className="home-page">
      <CanvasHeader>
        <div className="home-page__hero">
          <p className="home-page__eyebrow">Project log</p>
          <h1 className="home-page__title">Random Walk</h1>
          <p className="home-page__lead">
            A small place for notes, experiments, and the occasional step that
            only makes sense once the next one appears.
          </p>
          <ScrollIndicator href="#project" />
        </div>
      </CanvasHeader>

      <section className="home-page__intro" id="project">
        <div className="home-page__intro-inner">
          <h2 className="home-page__heading">About the project</h2>
          <p>
            Random Walk collects short written updates and project notes. The
            pages are generated from markdown files at build time, rendered as
            static HTML, and hydrated by React in the browser.
          </p>
          <p>
            The site keeps the presentation intentionally quiet: black, white,
            simple spacing, and enough structure for the writing to be easy to
            scan.
          </p>
          {latestYear && (
            <a className="home-page__link" href={hrefFor(`/log/${latestYear}/`)}>
              Read the log
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
