import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { ItemLike } from './itemLike';
import { OneBadge } from './oneBadge';
import { ActionType, BadgeFieldName, BundleObject, FeedObject, ItemType } from '../utils/types';
import { ItemDelete } from './itemDelete';
import { useFetchUser } from '../utils/user';

export const OneListItem = ({ item, type }: { type: ItemType; item: FeedObject | BundleObject }) => {
  const isFeed = type === ItemType.FeedType;
  const childItem = item[isFeed ? 'bundles' : 'feeds'];
  const { user, loading } = useFetchUser();

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Link href={`/${isFeed ? `feed` : `bundle`}/${item.id}`}>
      <div className={`grid grid-cols-6 rounded py-2 px-2 border-2 bg-${isFeed ? 'green' : 'purple'}-100`}>
        <div className="col-span-5">
          <h4 className="font-bold">{item.name}</h4>
          {!isFeed ? <p>{item['description']}</p> : null}
        </div>
        <div className="col-span-1 flex">
          <ItemLike item={item} type={type} />
          {!loading && user && item.author.auth0 === user.sub ? <ItemDelete item={item} type={type} /> : null}
        </div>

        <div className="flex col-span-6 py-0 space-x-2">{item.author ? <ProfilePic author={item.author} /> : null}</div>

        <div className="col-span-6 py-2">
          <h3>Tags</h3>
          <div className="grid grid-cols-4 gap-1">
            {item.tags.length > 0 ? (
              item.tags.map(oneTag => (
                <OneBadge key={oneTag.id} fieldName={BadgeFieldName.tags} item={oneTag} action={ActionType.NONE} />
              ))
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
