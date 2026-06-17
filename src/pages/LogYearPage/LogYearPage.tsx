import { CollectionOverview } from "../../components/CollectionOverview/CollectionOverview";
import type { MarkdownDocument } from "../../lib/content";
import "./LogYearPage.scss";

type LogYearPageProps = {
  posts: MarkdownDocument[];
  year: string;
};

export function LogYearPage({ posts, year }: LogYearPageProps) {
  return (
    <CollectionOverview
      className="log-year-page"
      emptyText="No posts for this year."
      eyebrow="Log"
      items={posts}
      title={year}
    />
  );
}
