import type { ContentListItem } from "../../lib/content";
import { hrefFor } from "../../lib/routes";
import "./ContentList.scss";

type ContentListProps = {
  emptyText: string;
  items: ContentListItem[];
};

export function ContentList({ emptyText, items }: ContentListProps) {
  if (items.length === 0) {
    return <p className="content-list__empty">{emptyText}</p>;
  }

  return (
    <ol className="content-list">
      {items.map((item) => (
        <li className="content-list__item" key={item.path}>
          <a className="content-list__link" href={hrefFor(item.path)}>
            <span className="content-list__title">{item.title}</span>
            {item.date && <span className="content-list__date">{item.date}</span>}
            {item.intro && <span className="content-list__intro">{item.intro}</span>}
          </a>
        </li>
      ))}
    </ol>
  );
}
