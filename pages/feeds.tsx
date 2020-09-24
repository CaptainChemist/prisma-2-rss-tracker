import { ItemList } from '../components/itemList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';

const Index = () => {
  return (
    <Layout>
      <p>Feed Page</p>
      <ItemList type={ItemType.FeedType} />
      <NewItem type={ItemType.FeedType} />
    </Layout>
  );
};
export default Index;
