import { PageShell } from "../components/PageShell/PageShell";
import { HomePage } from "../pages/HomePage/HomePage";
import { LogPostPage } from "../pages/LogPostPage/LogPostPage";
import { LogYearPage } from "../pages/LogYearPage/LogYearPage";
import { getPost, getPostsByYear, getYears } from "../lib/posts";
import { pathnameWithoutBase } from "../lib/routes";
import "./App.scss";

type AppProps = {
  pathname?: string;
};

export function App({ pathname = "/" }: AppProps) {
  const years = getYears();
  const route = resolveRoute(pathnameWithoutBase(pathname));

  return (
    <div className="app">
      <PageShell years={years}>
        {route.type === "home" && <HomePage latestYear={years[0]} />}
        {route.type === "year" && (
          <LogYearPage posts={getPostsByYear(route.year)} year={route.year} />
        )}
        {route.type === "post" && (
          <LogPostPage post={getPost(route.year, route.slug)} year={route.year} />
        )}
      </PageShell>
    </div>
  );
}

type Route =
  | { type: "home" }
  | { type: "year"; year: string }
  | { type: "post"; slug: string; year: string };

function resolveRoute(pathname: string): Route {
  const normalized = normalizePath(pathname);
  const postMatch = normalized.match(/^\/log\/([^/]+)\/([^/]+)\/?$/);

  if (postMatch) {
    return {
      slug: postMatch[2],
      type: "post",
      year: postMatch[1],
    };
  }

  const yearMatch = normalized.match(/^\/log\/([^/]+)\/?$/);

  if (yearMatch) {
    return {
      type: "year",
      year: yearMatch[1],
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
