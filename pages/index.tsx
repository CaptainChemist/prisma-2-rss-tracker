import Link from 'next/link';
import { FeedList } from '../components/feedList';
import { BundleList } from '../components/bundleList';
import { NewFeed } from '../components/newFeed';
import { NewBundle } from '../components/newBundle';

const Index = () => {
  return (
    <div>
      <p>Index Page</p>
      <Link href="/api/logout">
        <button>Logout</button>
      </Link>
      <Link href="/api/login">
        <button>Login</button>
      </Link>
      <FeedList />
      <NewFeed />
      <BundleList />
      <NewBundle />
    </div>
  );
};
export default Index;
