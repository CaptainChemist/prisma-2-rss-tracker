import { ProfilePic } from './profilePic';
import { FeedLike } from './feedLike';
import Link from 'next/link';

export const FeedListItem = ({ feed }) => {
  return (
    <Link href={`/feed/${feed.id}`}>
      <div className="grid grid-cols-6 rounded py-2 px-2 border-2 bg-green-100">
        <div className="col-span-5">
          <h3>{feed.name}</h3>
        </div>
        <FeedLike feed={feed} />

        <div className="flex col-span-6 py-0 space-x-2">{feed.author ? <ProfilePic author={feed.author} /> : null}</div>
        <div className="col-span-6 py-2">
          <h3>Tags</h3>
          <div className="space-x-2 space-y-2">
            {feed.tags.map(oneTag => (
              <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-blue-100" key={oneTag.id}>
                {oneTag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 py-2">
          <h3>Bundles</h3>
          <div className="space-x-2 space-y-2">
            {feed.bundles.map(oneBundle => (
              <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-purple-100" key={oneBundle.id}>
                {oneBundle.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
