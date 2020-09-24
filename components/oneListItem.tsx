import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { ItemLike } from './itemLike';
import { OneTag } from './oneTag';
import { ActionType, BundleObject, FeedObject, ItemType } from '../utils/types';

export const OneListItem = ({ item, type }: { type: ItemType; item: FeedObject | BundleObject }) => {
  const isFeed = type === ItemType.FeedType;
  const childItem = item[isFeed ? 'bundles' : 'feeds'];

  return (
    <Link href={`/bundle/${item.id}`}>
      <div className={`grid grid-cols-6 rounded py-2 px-2 border-2 bg-${isFeed ? 'green' : 'purple'}-100`}>
        <div className="col-span-5">
          <h3>{item.name}</h3>
          <p>{isFeed ? item['url'] : item['description']}</p>
        </div>
        <ItemLike item={item} type={type} />

        <div className="flex col-span-6 py-0 space-x-2">{item.author ? <ProfilePic author={item.author} /> : null}</div>

        <div className="col-span-6 py-2">
          <h3>Tags</h3>
          <div className="grid grid-cols-4 gap-1">
            {item.tags.length > 0 ? (
              item.tags.map(oneTag => <OneTag key={oneTag.id} tag={oneTag} action={ActionType.NONE} />)
            ) : (
              <p>None found</p>
            )}
          </div>
        </div>
        <div className="col-span-6 py-2">
          <h3>{isFeed ? 'Bundles' : 'Feeds'}</h3>
          <div className="grid grid-cols-4 gap-1">
            {childItem.length > 0 ? (
              childItem.map(oneFeed => (
                <span className={`text-sm my-2 py-1 px-2 rounded align-middle bg-${isFeed ? 'purple' : 'green'}-100`} key={oneFeed.id}>
                  {oneFeed.name}
                </span>
              ))
            ) : (
              <p>None found</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
