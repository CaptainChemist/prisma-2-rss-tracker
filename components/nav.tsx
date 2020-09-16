import Link from 'next/link';
import { useFetchUser } from '../utils/user';

export const Nav = () => {
  const { user, loading } = useFetchUser();

  return (
    <ul className="flex">
      <li className="mr-6 inline-flex">
        <Link href="/">
          <>
            <img className="h-10 pr-1" src="/logo.png" />
            <a className="p-2 text-center block hover:blue-700">Newsprism</a>
          </>
        </Link>
      </li>
      <li className="mr-6">
        <Link href="/bundles">
          <a className="p-2 text-center block hover:blue-700 text-blue-500">Bundles</a>
        </Link>
      </li>
      <li className="mr-6">
        <Link href="/feeds">
          <a className="p-2 text-center block hover:blue-700 text-blue-500">Feeds</a>
        </Link>
      </li>
      <li className="mr-6">
        {user && !loading ? (
          <Link href="/api/logout">
            <a className="text-center block border border-blue-500 rounded py-2 px-4  hover:bg-blue-700 text-blue-500">Logout</a>
          </Link>
        ) : (
          <Link href="/api/login">
            <a className="text-center block border border-blue-500 rounded py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white">Login</a>
          </Link>
        )}
      </li>
    </ul>
  );
};
