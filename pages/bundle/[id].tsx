import { useQuery } from '@apollo/client';
import { ArticleList } from '../../components/articleList';
import { NotifyError } from '../../components/notifyError';
import { Layout } from '../../components/layout';
import { OneListItem } from '../../components/oneListItem';
import { BUNDLE_QUERY } from '../../utils/api/graphql/queries';
import { FeedObject, ItemType } from '../../utils/types';
import { NotifyLoading } from '../../components/notifyLoading';

const Bundle = ({ id }) => {
  const { loading, error, data } = useQuery(BUNDLE_QUERY, { variables: { data: { id: parseInt(id) } } });

  if (loading) {
    return (
      <Layout>
        <NotifyLoading />
      </Layout>
    );
  }

  const { bundle } = data || {};

  if (error || !bundle) {
    return (
      <Layout>
        <NotifyError />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3 className="text-lg font-medium pt-4">{bundle.name}</h3>
      <p className="pb-4">{bundle.description}</p>
      <h3 className="pb-4 font-medium">Feeds</h3>
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
