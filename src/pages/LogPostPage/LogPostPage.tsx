import { ArticleDocument } from "../../components/ArticleDocument/ArticleDocument";
import { CollectionOverview } from "../../components/CollectionOverview/CollectionOverview";
import { formatSeasonLabel, type MarkdownDocument } from "../../lib/content";
import "./LogPostPage.scss";

type LogPostPageProps = {
  adjacentPosts: {
    nextPost?: MarkdownDocument;
    previousPost?: MarkdownDocument;
  };
  post?: MarkdownDocument;
  season: string;
};

export function LogPostPage({ adjacentPosts, post, season }: LogPostPageProps) {
  const currentSeason = post?.season ?? season;

  return (
    <ArticleDocument
      afterContent={
        post && (
          <footer className="log-post-page__related">
            <CollectionOverview
              as="section"
              className="log-post-page__adjacent"
              emptyText="No newer post."
              eyebrow="Next"
              items={adjacentPosts.nextPost ? [adjacentPosts.nextPost] : []}
              // title="Next post"
              titleLevel={2}
            />
            <CollectionOverview
              as="section"
              className="log-post-page__adjacent"
              emptyText="No previous post."
              eyebrow="Previous"
              items={adjacentPosts.previousPost ? [adjacentPosts.previousPost] : []}
              // title="Previous post"
              titleLevel={2}
            />
          </footer>
        )
      }
      backHref={`/log/${currentSeason}/`}
      backLabel={`Back to ${formatSeasonLabel(currentSeason)}`}
      className="log-post-page"
      document={post}
      missingTitle="Post not found"
    />
  );
}
