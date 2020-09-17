import { FeedList } from '../components/feedList';
import { BundleList } from '../components/bundleList';
import { NewFeed } from '../components/newFeed';
import { NewBundle } from '../components/newBundle';
import { Layout } from '../components/layout';

const Index = () => {
  return (
    <Layout>
      <p>Index Page</p>
      <FeedList />
      <NewFeed />
      <BundleList />
      <NewBundle />
    </Layout>
  );
};
export default Index;
