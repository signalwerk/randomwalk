import { PostList } from "../../components/PostList/PostList";
import type { MarkdownPost } from "../../lib/posts";
import "./LogYearPage.scss";

type LogYearPageProps = {
  posts: MarkdownPost[];
  year: string;
};

export function LogYearPage({ posts, year }: LogYearPageProps) {
  return (
    <main className="log-year-page">
      <div className="log-year-page__inner">
        <p className="log-year-page__eyebrow">Log</p>
        <h1 className="log-year-page__title">{year}</h1>
        <PostList posts={posts} />
      </div>
    </main>
  );
}
