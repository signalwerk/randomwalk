declare module "virtual:posts" {
  export type VirtualPost = {
    date?: string;
    html: string;
    intro?: string;
    slug: string;
    sourcePath: string;
    title: string;
    year: string;
  };

  export const posts: VirtualPost[];
  export const staticRoutes: string[];
}
