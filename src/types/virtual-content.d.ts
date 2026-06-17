declare module "virtual:content" {
  export type VirtualDocument = {
    collection: "log" | "topics";
    date?: string;
    html: string;
    intro?: string;
    path: string;
    season?: string;
    slug: string;
    sourcePath: string;
    title: string;
  };

  export const logPosts: VirtualDocument[];
  export const topics: VirtualDocument[];
  export const staticRoutes: string[];
}
