import { ItemList } from '../components/itemList';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';

const Index = () => {
  return (
    <Layout>
      <p>Index Page</p>
      <ItemList type={ItemType.BundleType} />
    </Layout>
  );
};
export default Index;
