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
  slug: string;
  sourcePath: string;
  title: string;
  year?: string;
};

export type ContentListItem = Pick<
  MarkdownDocument,
  "date" | "intro" | "path" | "slug" | "title" | "year"
>;

export const logPosts: MarkdownDocument[] = generatedLogPosts;
export const topics: MarkdownDocument[] = generatedTopics;

export function getYears() {
  return Array.from(new Set(logPosts.flatMap((post) => post.year ?? []))).sort(
    (a, b) => b.localeCompare(a),
  );
}

export function getLogPostsByYear(year: string) {
  return logPosts.filter((post) => post.year === year);
}

export function getLogPost(year: string, slug: string) {
  return logPosts.find((post) => post.year === year && post.slug === slug);
}

export function getTopic(slug: string) {
  return topics.find((topic) => topic.slug === slug);
}

export function getStaticRoutes() {
  return staticRoutes;
}
