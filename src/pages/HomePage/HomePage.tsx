import { CanvasHeader } from "../../components/CanvasHeader/CanvasHeader";
import { CollectionOverview } from "../../components/CollectionOverview/CollectionOverview";
import { ScrollIndicator } from "../../components/ScrollIndicator/ScrollIndicator";
import type { MarkdownDocument } from "../../lib/content";
import { hrefFor } from "../../lib/routes";
import "./HomePage.scss";

type HomePageProps = {
  latestPosts: MarkdownDocument[];
  latestSeason?: string;
};

export function HomePage({ latestPosts, latestSeason }: HomePageProps) {
  return (
    <main className="home-page">
      <CanvasHeader>
        <div className="home-page__hero">
          <p className="home-page__eyebrow">By Stefan Huber</p>
          <h1 className="home-page__title">Random Walk</h1>
          <p className="home-page__lead">
            A small place for notes, experiments, and the occasional step that
            only makes sense once the next one appears.
          </p>
        </div>
      </CanvasHeader>

      <section className="home-page__intro" id="project">
        <div className="home-page__intro-inner">
          {/* <h2 className="home-page__heading">About the project</h2>
          <p>
            Random Walk collects short written updates and project notes. The
            pages are generated from markdown files at build time, rendered as
            static HTML, and hydrated by React in the browser.
          </p>
          <p>
            The site keeps the presentation intentionally quiet: black, white,
            simple spacing, and enough structure for the writing to be easy to
            scan.
          </p> */}
          <CollectionOverview
            as="section"
            className="home-page__latest"
            emptyText="No log posts yet."
            // eyebrow="Latest"
            // intro="The most recent notes from the project log."
            items={latestPosts}
            title="Latest posts"
            titleLevel={2}
          />
          {latestSeason && false && (
            <a className="home-page__link" href={hrefFor(`/log/${latestSeason}/`)}>
              Read the log
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
