import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { ItemLike } from './itemLike';
import { ActionType, BadgeFieldName, BundleObject, FeedObject, ItemType, SelectedFeedState } from '../utils/types';
import { ItemDelete } from './itemDelete';
import { useFetchUser } from '../utils/user';
import { BadgeList } from './badgeList';
import { Dispatch, SetStateAction } from 'react';

export const OneListItem = ({
  item,
  type,
  selected,
  setSelected,
  useSelected = false,
}: {
  type: ItemType;
  item: FeedObject | BundleObject;
  selected?: SelectedFeedState;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
  useSelected?: boolean;
}) => {
  const isFeed = type === ItemType.FeedType;
  const isSelected = useSelected && selected && selected.id === item.id;
  const { user, loading } = useFetchUser();

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <Link href={`/${isFeed ? `feed` : `bundle`}/${item.id}`}>
      <div
        className={`grid grid-cols-6 rounded py-2 px-2 ${isSelected ? `border-2 border-red-500` : `border-2`} bg-${
          isFeed ? 'green' : 'purple'
        }-100`}
      >
        <div className="col-span-4">
          <h4 className="font-bold">{item.name}</h4>
          {!isFeed ? <p>{item['description']}</p> : null}
        </div>
        <div className="col-span-2 flex justify-end">
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
        {useSelected ? (
          <div className="gap-4 col-span-6 py-2">
            {isSelected ? (
              <p
                onClick={e => {
                  e.preventDefault();
                  setSelected({ id: null, feeds: [] });
                }}
                className={`flex rounded align-middle bg-${isFeed ? 'green' : 'purple'}-100 p-2 z-10`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-5 w-5 text-gray-500 mr-2 mt-1`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                {` Hide ${isFeed ? `Feed` : `Bundle`} Articles`}
              </p>
            ) : (
              <p
                onClick={e => {
                  e.preventDefault();
                  setSelected({ id: item.id, feeds: isFeed ? [item['url']] : item['feeds'].map(feed => feed.url) });
                }}
                className={`flex rounded align-middle bg-${isFeed ? 'green' : 'purple'}-400 p-2 z-10`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-5 w-5 text-gray-500 mr-2 mt-1`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                {` Show ${isFeed ? `Feed` : `Bundle`} Articles`}
              </p>
            )}
          </div>
        ) : null}
      </div>
    </Link>
  );
};
