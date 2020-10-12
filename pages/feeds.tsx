import { ItemList } from '../components/itemList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';
import { useFetchUser } from '../utils/user';

const Index = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout>
      <h3 className="text-lg font-medium py-4">Feeds Page</h3>
      <ItemList type={ItemType.FeedType} />
      {user ? <NewItem type={ItemType.FeedType} /> : null}
    </Layout>
  );
};
export default Index;
