import type { PostSummary } from "../../lib/posts";
import { hrefFor } from "../../lib/routes";
import "./PostList.scss";

type PostListProps = {
  posts: PostSummary[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <p className="post-list__empty">No posts for this year.</p>;
  }

  return (
    <ol className="post-list">
      {posts.map((post) => (
        <li className="post-list__item" key={`${post.year}-${post.slug}`}>
          <a
            className="post-list__link"
            href={hrefFor(`/log/${post.year}/${post.slug}/`)}
          >
            <span className="post-list__title">{post.title}</span>
            {post.date && <span className="post-list__date">{post.date}</span>}
            {post.intro && <span className="post-list__intro">{post.intro}</span>}
          </a>
        </li>
      ))}
    </ol>
  );
}
