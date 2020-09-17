import { BundleLike } from './bundleLike';
import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { FeedLike } from './feedLike';

export const ListItem = ({ item, type }) => {
  const isFeed = type === 'FEED';
  return (
    <Link href={`/bundle/${item.id}`}>
      <div className={`grid grid-cols-6 rounded py-2 px-2 border-2 bg-${isFeed ? 'green' : 'purple'}-100`}>
        <div className="col-span-5">
          <h3>{item.name}</h3>
        </div>
        {isFeed ? <FeedLike feed={item} /> : <BundleLike bundle={item} />}

        <div className="flex col-span-6 py-0 space-x-2">{item.author ? <ProfilePic author={item.author} /> : null}</div>

        <div className="col-span-6 py-2">
          <h3>Tags</h3>
          <div className="space-x-2 space-y-2">
            {item.tags.map(oneTag => (
              <span className="text-sm my-2 py-1 px-2 rounded align-middle bg-blue-100" key={oneTag.id}>
                {oneTag.name}
              </span>
            ))}
          </div>
        </div>
        <div className="col-span-6 py-2">
          <h3>{isFeed ? 'Bundles' : 'Feeds'}</h3>
          <div className="space-x-2 space-y-2">
            {item[isFeed ? 'bundles' : 'feeds'].map(oneFeed => (
              <span className={`text-sm my-2 py-1 px-2 rounded align-middle bg-${isFeed ? 'purple' : 'green'}-100`} key={oneFeed.id}>
                {oneFeed.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};