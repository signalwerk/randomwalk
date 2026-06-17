import { CollectionOverview } from "../../components/CollectionOverview/CollectionOverview";
import { formatSeasonLabel, type MarkdownDocument } from "../../lib/content";
import "./LogSeasonPage.scss";

type LogSeasonPageProps = {
  posts: MarkdownDocument[];
  season: string;
};

export function LogSeasonPage({ posts, season }: LogSeasonPageProps) {
  return (
    <CollectionOverview
      className="log-season-page"
      emptyText="No posts for this season."
      eyebrow="Log"
      items={posts}
      title={formatSeasonLabel(season)}
    />
  );
}
