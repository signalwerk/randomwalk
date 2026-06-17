import type { ContentListItem } from "../../lib/content";
import { ContentList } from "../ContentList/ContentList";
import { PageHeader } from "../PageHeader/PageHeader";
import "./CollectionOverview.scss";

type CollectionOverviewProps = {
  as?: "main" | "section";
  className?: string;
  emptyText: string;
  eyebrow: string;
  intro?: string;
  items: ContentListItem[];
  title: string;
  titleLevel?: 1 | 2;
};

export function CollectionOverview({
  as: Component = "main",
  className,
  emptyText,
  eyebrow,
  intro,
  items,
  title,
  titleLevel,
}: CollectionOverviewProps) {
  return (
    <Component className={["collection-overview", className].filter(Boolean).join(" ")}>
      <div className="collection-overview__inner">
        <PageHeader
          eyebrow={eyebrow}
          intro={intro}
          title={title}
          titleLevel={titleLevel}
        />
        <ContentList emptyText={emptyText} items={items} />
      </div>
    </Component>
  );
}
