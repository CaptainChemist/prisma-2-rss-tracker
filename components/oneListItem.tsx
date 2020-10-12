import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { ItemLike } from './itemLike';
import { ActionType, BadgeFieldName, BundleObject, FeedObject, ItemType } from '../utils/types';
import { ItemDelete } from './itemDelete';
import { useFetchUser } from '../utils/user';
import { BadgeList } from './badgeList';

export const OneListItem = ({ item, type }: { type: ItemType; item: FeedObject | BundleObject }) => {
  const isFeed = type === ItemType.FeedType;
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
            <BadgeList fieldName={BadgeFieldName.tags} action={ActionType.NONE} item={item} />
          </div>
        </div>
        <div className="col-span-6 py-2">
          <h3>{isFeed ? 'Bundles' : 'Feeds'}</h3>
          <div className="grid grid-cols-4 gap-1">
            <BadgeList fieldName={isFeed ? BadgeFieldName.bundles : BadgeFieldName.feeds} action={ActionType.NONE} item={item} />
          </div>
        </div>
      </div>
    </Link>
  );
};
