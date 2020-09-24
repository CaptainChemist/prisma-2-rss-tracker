import { ItemList } from '../components/itemList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';
import { useFetchUser } from '../utils/user';

const Index = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout>
      <p>Index Page</p>
      <ItemList type={ItemType.FeedType} />
      {user ? <NewItem type={ItemType.FeedType} /> : null}
      <ItemList type={ItemType.BundleType} />
      {user ? <NewItem type={ItemType.BundleType} /> : null}
    </Layout>
  );
};
export default Index;
