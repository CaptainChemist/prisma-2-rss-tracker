import { BundleLike } from './bundleLike';
import { ProfilePic } from './profilePic';
import Link from 'next/link';

export const BundleListItem = ({ bundle }) => {
  return (
    <Link href={`/bundle/${bundle.id}`}>
      <div className="grid grid-cols-6 rounded py-2 px-2 border-2 bg-purple-100">
        <div className="col-span-5">
          <h3>{bundle.name}</h3>
        </div>
        <BundleLike bundle={bundle} />

        <div className="flex col-span-6 py-0 space-x-2">{bundle.author ? <ProfilePic author={bundle.author} /> : null}</div>

        <div className="col-span-6 py-2">
          <h3>Tags</h3>
          <div className="space-x-2 space-y-2">
            {bundle.tags.map(oneTag => (
              <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-blue-100" key={oneTag.id}>
                {oneTag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 py-2">
          <h3>Feeds</h3>
          <div className="space-x-2 space-y-2">
            {bundle.feeds.map(oneFeed => (
              <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-green-100" key={oneFeed.id}>
                {oneFeed.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
