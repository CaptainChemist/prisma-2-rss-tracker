import { BundleList } from '../components/bundleList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';

const Index = () => {
  return (
    <Layout>
      <p>Bundles Page</p>
      <BundleList />
      <NewItem type={ItemType.BundleType} />
    </Layout>
  );
};
export default Index;
