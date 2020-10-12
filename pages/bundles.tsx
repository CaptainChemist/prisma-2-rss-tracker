import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';
import { ItemList } from '../components/itemList';
import { useFetchUser } from '../utils/user';

const Index = () => {
  const { user, loading } = useFetchUser();

  return (
    <Layout>
      <h3 className="text-lg font-medium py-4">Bundles Page</h3>
      <ItemList type={ItemType.BundleType} />
      {user ? <NewItem type={ItemType.BundleType} /> : null}
    </Layout>
  );
};
export default Index;
