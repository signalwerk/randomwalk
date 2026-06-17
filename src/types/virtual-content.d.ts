declare module "virtual:content" {
  export type VirtualDocument = {
    collection: "log" | "topics";
    date?: string;
    html: string;
    intro?: string;
    path: string;
    slug: string;
    sourcePath: string;
    title: string;
    year?: string;
  };

  export const logPosts: VirtualDocument[];
  export const topics: VirtualDocument[];
  export const staticRoutes: string[];
}
