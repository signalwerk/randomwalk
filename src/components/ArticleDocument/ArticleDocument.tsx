import type { MarkdownDocument } from "../../lib/content";
import { hrefFor } from "../../lib/routes";
import { MarkdownContent } from "../MarkdownContent/MarkdownContent";
import { PageHeader } from "../PageHeader/PageHeader";
import "./ArticleDocument.scss";

type ArticleDocumentProps = {
  backHref: string;
  backLabel: string;
  className?: string;
  document?: MarkdownDocument;
  missingTitle: string;
};

export function ArticleDocument({
  backHref,
  backLabel,
  className,
  document,
  missingTitle,
}: ArticleDocumentProps) {
  return (
    <main className={["article-document", className].filter(Boolean).join(" ")}>
      <article className="article-document__article">
        <a className="article-document__back" href={hrefFor(backHref)}>
          {backLabel}
        </a>
        {document ? (
          <>
            <PageHeader
              eyebrow={document.date}
              intro={document.intro}
              title={document.title}
            />
            <MarkdownContent html={document.html} />
          </>
        ) : (
          <PageHeader title={missingTitle} />
        )}
      </article>
    </main>
  );
}
