import { useQuery } from '@apollo/client';
import { ArticleList } from '../../components/articleList';
import { Layout } from '../../components/layout';
import { OneListItem } from '../../components/oneListItem';
import { BUNDLE_QUERY } from '../../utils/api/graphql/queries';
import { FeedObject, ItemType } from '../../utils/types';

const Bundle = ({ id }) => {
  const { loading, error, data } = useQuery(BUNDLE_QUERY, { variables: { data: { id: parseInt(id) } } });

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  const { bundle } = data || {};
  console.log(bundle.feeds);

  console.log(bundle);
  return (
    <Layout>
      <h1>{bundle.name}</h1>
      <p>{bundle.description}</p>
      <p>Feeds</p>
      <div className="grid grid-cols-3 gap-4">
        {bundle.feeds.length > 0 ? (
          bundle.feeds.map((item: FeedObject) => <OneListItem item={item} type={ItemType.FeedType} key={item.id} />)
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
      <ArticleList rssFeeds={bundle.feeds.map(feed => feed.url)} />
    </Layout>
  );
};

Bundle.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Bundle;
