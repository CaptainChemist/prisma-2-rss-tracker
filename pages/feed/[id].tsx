import { useQuery } from '@apollo/client';
import { ArticleList } from '../../components/articleList';
import { Layout } from '../../components/layout';
import { NotifyError } from '../../components/notifyError';
import { NotifyLoading } from '../../components/notifyLoading';
import { OneListItem } from '../../components/oneListItem';
import { FEED_QUERY } from '../../utils/api/graphql/queries';
import { BundleObject, ItemType } from '../../utils/types';

const Feed = ({ id }) => {
  const { loading, error, data } = useQuery(FEED_QUERY, { variables: { data: { id: parseInt(id) } } });

  if (loading) {
    return (
      <Layout>
        <NotifyLoading />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <NotifyError />
      </Layout>
    );
  }

  const { feed } = data || {};

  return (
    <Layout>
      <h1>{feed.name}</h1>
      <p>{feed.url}</p>
      <p>Bundles</p>
      <div className="grid grid-cols-3 gap-4">
        {feed.bundles.length > 0 ? (
          feed.bundles.map((item: BundleObject) => <OneListItem item={item} type={ItemType.BundleType} key={item.id} />)
        ) : (
          <p>This feed does not belong to any bundles.</p>
        )}
      </div>
      <ArticleList rssFeeds={[feed.url]} />
    </Layout>
  );
};

Feed.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Feed;
