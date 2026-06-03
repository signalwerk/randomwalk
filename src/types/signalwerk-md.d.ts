declare module "signalwerk.md/src/processor.js" {
  export type FrontmatterAttributes = Record<string, unknown>;

  export type MarkdownFile = {
    attributes: FrontmatterAttributes;
    body: string;
  };

  export type ProcessedMarkdown = {
    data: {
      title?: string;
    };
    toString(): string;
  };

  export type MarkdownProcessor = {
    processSync(markdown: string): ProcessedMarkdown;
  };

  export function extractFrontmatter(markdown: string): MarkdownFile;
  export function htmlProcessor(): MarkdownProcessor;
}
