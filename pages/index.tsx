import Link from "next/link";
import { FeedList } from "../components/feedList";
import { BundleList } from "../components/bundleList";
import { NewFeed } from "../components/newFeed";
import { NewBundle } from "../components/newBundle";
import { Layout } from "../components/layout";

const Index = () => {
  return (
    <Layout>
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
    </Layout>
  );
};
export default Index;
