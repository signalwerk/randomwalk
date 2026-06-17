import { CollectionOverview } from "../../components/CollectionOverview/CollectionOverview";
import type { MarkdownDocument } from "../../lib/content";
import "./TopicsPage.scss";

type TopicsPageProps = {
  topics: MarkdownDocument[];
};

export function TopicsPage({ topics }: TopicsPageProps) {
  return (
    <CollectionOverview
      className="topics-page"
      emptyText="No topics yet."
      eyebrow="Topics"
      intro="Longer-running themes and reference notes."
      items={topics}
      title="Topics"
    />
  );
}
