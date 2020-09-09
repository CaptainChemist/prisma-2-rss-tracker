import Link from 'next/link';
import { FeedList } from '../components/feedList';
import { NewFeed } from '../components/newFeed';

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
    </div>
  );
};
export default Index;
