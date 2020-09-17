import Link from 'next/link';
import { FeedList } from '../components/feedList';
import { BundleList } from '../components/bundleList';
import { NewFeed } from '../components/newFeed';
import { NewBundle } from '../components/newBundle';
import { Layout } from '../components/layout';

const Index = () => {
  return (
    <Layout>
      <p>Feed Page</p>
      <FeedList />
      <NewFeed />
    </Layout>
  );
};
export default Index;
