import { posts as generatedPosts, staticRoutes } from "virtual:posts";

export type MarkdownPost = {
  date?: string;
  html: string;
  intro?: string;
  slug: string;
  sourcePath: string;
  title: string;
  year: string;
};

export const posts: MarkdownPost[] = generatedPosts;

export function getYears() {
  return Array.from(new Set(posts.map((post) => post.year))).sort((a, b) =>
    b.localeCompare(a),
  );
}

export function getPostsByYear(year: string) {
  return posts.filter((post) => post.year === year);
}

export function getPost(year: string, slug: string) {
  return posts.find((post) => post.year === year && post.slug === slug);
}

export function getStaticRoutes() {
  return staticRoutes;
}

export type PostSummary = Pick<
  MarkdownPost,
  "date" | "intro" | "slug" | "title" | "year"
>;
