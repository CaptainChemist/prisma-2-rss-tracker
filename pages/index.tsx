import Link from 'next/link';
import { FeedList } from '../components/feedList';

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
    </div>
  );
};
export default Index;
