import { ArticleDocument } from "../../components/ArticleDocument/ArticleDocument";
import type { MarkdownDocument } from "../../lib/content";
import "./TopicPage.scss";

type TopicPageProps = {
  topic?: MarkdownDocument;
};

export function TopicPage({ topic }: TopicPageProps) {
  return (
    <ArticleDocument
      backHref="/topics/"
      backLabel="Back to topics"
      className="topic-page"
      document={topic}
      missingTitle="Topic not found"
    />
  );
}
