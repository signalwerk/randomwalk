import type { ContentListItem } from "../../lib/content";
import { ContentList } from "../ContentList/ContentList";
import { PageHeader } from "../PageHeader/PageHeader";
import "./CollectionOverview.scss";

type CollectionOverviewProps = {
  className?: string;
  emptyText: string;
  eyebrow: string;
  intro?: string;
  items: ContentListItem[];
  title: string;
};

export function CollectionOverview({
  className,
  emptyText,
  eyebrow,
  intro,
  items,
  title,
}: CollectionOverviewProps) {
  return (
    <main className={["collection-overview", className].filter(Boolean).join(" ")}>
      <div className="collection-overview__inner">
        <PageHeader eyebrow={eyebrow} intro={intro} title={title} />
        <ContentList emptyText={emptyText} items={items} />
      </div>
    </main>
  );
}
