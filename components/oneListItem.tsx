import { ProfilePic } from './profilePic';
import Link from 'next/link';
import { ItemLike } from './itemLike';
import { ActionType, BadgeFieldName, BundleObject, FeedObject, ItemType, SelectedFeedState } from '../utils/types';
import { ItemDelete } from './itemDelete';
import { useFetchUser } from '../utils/user';
import { BadgeList } from './badgeList';
import { Dispatch, SetStateAction } from 'react';
import { ItemEdit } from './itemEdit';

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
  const canManipulate = !loading && user && item.author.auth0 === user.sub && useSelected


  return (
    <Link href={`/${isFeed ? `feed` : `bundle`}/${item.id}`}>
      <div>
        <div className={`cursor-pointer grid grid-cols-6 p-4 rounded-lg ${useSelected? 'rounded-b-none': 'border-b-4'} border-t-4 border-l-4 border-r-4 ${isSelected ? `border-${isFeed ? 'green' : 'purple'}-400` : `border-gray-300`}`}>
          <div className="col-span-4">
            <h4 className="font-bold">{item.name}</h4>
            {!isFeed ? <p>{item['description']}</p> : null}
          </div>
          <div className="col-span-2 flex justify-end">
            <ItemLike item={item} type={type} />
            {canManipulate ? <ItemEdit item={item} type={type} selected={selected} setSelected={setSelected} />: null}
            {canManipulate ? <ItemDelete item={item} type={type} /> : null}
          </div>

          <div className="flex col-span-6 py-0 space-x-2">{item.author ? <ProfilePic author={item.author} /> : null}</div>

          <div className="col-span-6 py-2">
            <h3>Tags</h3>
            <div className="grid grid-cols-3 gap-2">
              <BadgeList fieldName={BadgeFieldName.tags} action={ActionType.NONE} item={item} />
            </div>
          </div>
          <div className="col-span-6 py-2">
            <h3>{isFeed ? 'Bundles' : 'Feeds'}</h3>
            <div className="grid grid-cols-3 gap-2">
              <BadgeList fieldName={isFeed ? BadgeFieldName.bundles : BadgeFieldName.feeds} action={ActionType.NONE} item={item} />
            </div>
          </div>
        </div>
        {useSelected ? (
          <>
            {isSelected ? (
              <p
                onClick={e => {
                  e.preventDefault();
                }}
                className={`flex rounded-lg rounded-t-none align-middle 
                ${isSelected ? `bg-${isFeed ? 'green' : 'purple'}-400` : `bg-gray-300`}
                p-4 z-10 text-white cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-5 w-5 text-white-500 mr-2 mt-1`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                {` Hide ${isFeed ? `Feed` : `Bundle`} Articles`}
              </p>
            ) : (
              <p
                onClick={e => {
                  e.preventDefault();
                  setSelected({ id: item.id, feeds: isFeed ? [item] : item['feeds'], editMode: false });
                }}
                className={`flex rounded-lg rounded-t-none align-middle 
                ${isSelected ? `bg-${isFeed ? 'green' : 'purple'}-400` : `bg-gray-300`} 
                p-4 z-10 text-white cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className={`h-5 w-5 text-white-500 mr-2 mt-1`}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                {` Show ${isFeed ? `Feed` : `Bundle`} Articles`}
              </p>
            )}
          </>
        ) : null}
      </div>
    </Link>
  );
};
