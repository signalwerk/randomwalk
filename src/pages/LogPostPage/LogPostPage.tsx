import { ArticleDocument } from "../../components/ArticleDocument/ArticleDocument";
import type { MarkdownDocument } from "../../lib/content";
import "./LogPostPage.scss";

type LogPostPageProps = {
  post?: MarkdownDocument;
  year: string;
};

export function LogPostPage({ post, year }: LogPostPageProps) {
  return (
    <ArticleDocument
      backHref={`/log/${post?.year ?? year}/`}
      backLabel={`Back to ${post?.year ?? year}`}
      className="log-post-page"
      document={post}
      missingTitle="Post not found"
    />
  );
}
