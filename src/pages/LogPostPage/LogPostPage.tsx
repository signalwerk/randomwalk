import { MarkdownContent } from "../../components/MarkdownContent/MarkdownContent";
import type { MarkdownPost } from "../../lib/posts";
import { hrefFor } from "../../lib/routes";
import "./LogPostPage.scss";

type LogPostPageProps = {
  post?: MarkdownPost;
  year: string;
};

export function LogPostPage({ post, year }: LogPostPageProps) {
  if (!post) {
    return (
      <main className="log-post-page">
        <article className="log-post-page__article">
          <a className="log-post-page__back" href={hrefFor(`/log/${year}/`)}>
            Back to {year}
          </a>
          <h1 className="log-post-page__title">Post not found</h1>
        </article>
      </main>
    );
  }

  return (
    <main className="log-post-page">
      <article className="log-post-page__article">
        <a className="log-post-page__back" href={hrefFor(`/log/${post.year}/`)}>
          Back to {post.year}
        </a>
        <header className="log-post-page__header">
          {post.date && <p className="log-post-page__date">{post.date}</p>}
          <h1 className="log-post-page__title">{post.title}</h1>
          {post.intro && <p className="log-post-page__intro">{post.intro}</p>}
        </header>
        <MarkdownContent html={post.html} />
      </article>
    </main>
  );
}
