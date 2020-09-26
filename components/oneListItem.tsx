import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { ItemLike } from './itemLike';
import { OneBadge } from './oneBadge';
import { ActionType, BadgeFieldName, BundleObject, FeedObject, ItemType } from '../utils/types';

export const OneListItem = ({ item, type }: { type: ItemType; item: FeedObject | BundleObject }) => {
  const isFeed = type === ItemType.FeedType;
  const childItem = item[isFeed ? 'bundles' : 'feeds'];

  return (
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
            item.tags.map(oneTag => <OneBadge key={oneTag.id} fieldName={BadgeFieldName.tags} item={oneTag} action={ActionType.NONE} />)
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
      <div className="grid grid-cols-2 gap-4 col-span-6 py-2">
        {/* {false ? (
          <p className="flex rounded align-middle bg-blue-100 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-5 w-5 text-gray-500 mr-2 mt-1`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
            {' Show Stories'}
          </p>
        ) : (
          <p className="flex rounded align-middle bg-blue-100 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-5 w-5 text-gray-500 mr-2 mt-1`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
            {' Hide Stories'}
          </p>
        )} */}
        <Link href={`/${isFeed ? `feed` : `bundle`}/${item.id}`}>
          <p className="flex rounded align-middle bg-blue-100 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-5 w-5 text-gray-500 mr-2 mt-1`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
              />
            </svg>
            {` View ${isFeed ? `Feed` : `Bundle`}`}
          </p>
        </Link>
      </div>
    </div>
  );
};
