import { BundleList } from '../components/bundleList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';
import { ItemList } from '../components/itemList';

const Index = () => {
  return (
    <Layout>
      <p>Bundles Page</p>
      <ItemList type={ItemType.FeedType} />
      <NewItem type={ItemType.BundleType} />
    </Layout>
  );
};
export default Index;
