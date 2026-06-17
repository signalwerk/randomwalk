import {
  logPosts as generatedLogPosts,
  staticRoutes,
  topics as generatedTopics,
} from "virtual:content";

export type ContentCollection = "log" | "topics";

export type MarkdownDocument = {
  collection: ContentCollection;
  date?: string;
  html: string;
  intro?: string;
  path: string;
  season?: string;
  slug: string;
  sourcePath: string;
  title: string;
};

export type ContentListItem = Pick<
  MarkdownDocument,
  "date" | "intro" | "path" | "season" | "slug" | "title"
>;

export const logPosts: MarkdownDocument[] = generatedLogPosts;
export const topics: MarkdownDocument[] = generatedTopics;

export function getSeasons() {
  return Array.from(new Set(logPosts.flatMap((post) => post.season ?? []))).sort(
    (a, b) => b.localeCompare(a),
  );
}

export function getLogPostsBySeason(season: string) {
  return logPosts.filter((post) => post.season === season);
}

export function getLatestLogPosts(limit: number) {
  return logPosts.slice(0, limit);
}

export function getLogPost(season: string, slug: string) {
  return logPosts.find((post) => post.season === season && post.slug === slug);
}

export function getAdjacentLogPosts(season: string, slug: string) {
  const postIndex = logPosts.findIndex(
    (post) => post.season === season && post.slug === slug,
  );

  if (postIndex === -1) {
    return {
      nextPost: undefined,
      previousPost: undefined,
    };
  }

  return {
    nextPost: logPosts[postIndex - 1],
    previousPost: logPosts[postIndex + 1],
  };
}

export function formatSeasonLabel(season: string) {
  const match = season.match(/^S0*(\d+)$/i);

  if (match) {
    return `Season ${match[1].padStart(2, "0")}`;
  }

  return season;
}

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getStaticRoutes() {
  return staticRoutes;
}
