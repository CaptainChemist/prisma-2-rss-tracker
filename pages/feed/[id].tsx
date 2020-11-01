import { useQuery } from '@apollo/client';
import { Layout } from '../../components/layout';
import { NotifyError } from '../../components/notifyError';
import { NotifyLoading } from '../../components/notifyLoading';
import { OneListItem } from '../../components/oneListItem';
import { FEED_QUERY } from '../../utils/api/graphql/queries';
import { BundleObject, ItemType } from '../../utils/types';

const Feed = ({ id }) => {
  const { loading, error, data } = useQuery(FEED_QUERY, { variables: { data: { id: id } } });

  if (loading) {
    return (
      <Layout>
        <NotifyLoading />
      </Layout>
    );
  }

  const { feed } = data || {};

  if (error || !feed) {
    return (
      <Layout>
        <NotifyError />
      </Layout>
    );
  }

  return (
    <Layout>
      <h3 className="text-lg font-medium pt-4">{feed.name}</h3>
      <p className="pb-4">{feed.url}</p>
      <h3 className="pb-4 font-medium">Bundles</h3>
      <div className="grid grid-cols-3 gap-4">
        {feed.bundles.length > 0 ? (
          feed.bundles.map((item: BundleObject) => <OneListItem item={item} type={ItemType.BundleType} key={item.id} />)
        ) : (
          <p>This feed does not belong to any bundles.</p>
        )}
      </div>
    </Layout>
  );
};

Feed.getInitialProps = ({ query }) => {
  const { id } = query;
  return { id };
};

export default Feed;
