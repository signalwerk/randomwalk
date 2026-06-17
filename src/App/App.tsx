import { PageShell } from "../components/PageShell/PageShell";
import { HomePage } from "../pages/HomePage/HomePage";
import { LogPostPage } from "../pages/LogPostPage/LogPostPage";
import { LogSeasonPage } from "../pages/LogSeasonPage/LogSeasonPage";
import { TopicPage } from "../pages/TopicPage/TopicPage";
import { TopicsPage } from "../pages/TopicsPage/TopicsPage";
import {
  getAdjacentLogPosts,
  getLogPost,
  getLogPostsBySeason,
  getLatestLogPosts,
  getTopic,
  getSeasons,
  topics,
} from "../lib/content";
import { pathnameWithoutBase } from "../lib/routes";
import "./App.scss";

type AppProps = {
  pathname?: string;
};

export function App({ pathname = "/" }: AppProps) {
  const seasons = getSeasons();
  const route = resolveRoute(pathnameWithoutBase(pathname));

  return (
    <div className="app">
      <PageShell seasons={seasons}>
        {route.type === "home" && (
          <HomePage latestPosts={getLatestLogPosts(20)} latestSeason={seasons[0]} />
        )}
        {route.type === "season" && (
          <LogSeasonPage
            posts={getLogPostsBySeason(route.season)}
            season={route.season}
          />
        )}
        {route.type === "post" && (
          <LogPostPage
            adjacentPosts={getAdjacentLogPosts(route.season, route.slug)}
            post={getLogPost(route.season, route.slug)}
            season={route.season}
          />
        )}
        {route.type === "topics" && <TopicsPage topics={topics} />}
        {route.type === "topic" && (
          <TopicPage topic={getTopic(route.slug)} />
        )}
      </PageShell>
    </div>
  );
}

type Route =
  | { type: "home" }
  | { type: "season"; season: string }
  | { type: "post"; season: string; slug: string }
  | { type: "topics" }
  | { type: "topic"; slug: string };

function resolveRoute(pathname: string): Route {
  const normalized = normalizePath(pathname);
  const topicMatch = normalized.match(/^\/topics\/([^/]+)\/?$/);

  if (topicMatch) {
    return {
      slug: topicMatch[1],
      type: "topic",
    };
  }

  if (normalized.match(/^\/topics\/?$/)) {
    return {
      type: "topics",
    };
  }

  const postMatch = normalized.match(/^\/log\/([^/]+)\/([^/]+)\/?$/);

  if (postMatch) {
    return {
      slug: postMatch[2],
      season: postMatch[1],
      type: "post",
    };
  }

  const seasonMatch = normalized.match(/^\/log\/([^/]+)\/?$/);

  if (seasonMatch) {
    return {
      season: seasonMatch[1],
      type: "season",
    };
  }

  return { type: "home" };
}

function normalizePath(pathname: string) {
  const pathOnly = pathname.split(/[?#]/)[0] || "/";

  if (pathOnly === "/") {
    return "/";
  }

  return `/${pathOnly.replace(/^\/+/, "")}`;
}
