import { BundleLike } from './bundleLike';
import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { FeedLike } from './feedLike';
import { OneTag } from './oneTag';
import { ActionType, TagType } from '../utils/types';

export const ListItem = ({ item, type }: { type: TagType }) => {
  const isFeed = type === TagType.FeedTag;
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
          <div className="grid grid-cols-4 gap-1">
            {item.tags.length > 0 ? (
              item.tags.map(oneTag => <OneTag key={oneTag.id} tag={oneTag} action={ActionType.NONE} type={type} />)
            ) : (
              <p>No tags found</p>
            )}
          </div>
        </div>
        <div className="col-span-6 py-2">
          <h3>{isFeed ? 'Bundles' : 'Feeds'}</h3>
          <div className="grid grid-cols-4 gap-1">
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
