import { FeedList } from '../components/feedList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType } from '../utils/types';

const Index = () => {
  return (
    <Layout>
      <p>Feed Page</p>
      <FeedList />
      <NewItem type={ItemType.FeedType} />
    </Layout>
  );
};
export default Index;
