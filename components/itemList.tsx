import { useQuery } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/api/graphql/queries';
import { BundleObject, FeedObject, ItemType, SelectedFeedState } from '../utils/types';
import { NotifyError } from './notifyError';
import { NotifyLoading } from './notifyLoading';
import { OneListItem } from './oneListItem';

export const ItemList = ({
  type,
  selected,
  setSelected,
  useSelected = false,
}: {
  type: ItemType;
  selected?: SelectedFeedState;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
  useSelected?: boolean;
}) => {
  const isFeed = type === ItemType.FeedType;
  const { loading, error, data } = useQuery(isFeed ? FEEDS_QUERY : BUNDLES_QUERY);
  const { feeds, bundles } = data || {};
  const itemList = isFeed ? feeds : bundles;

  useEffect(() => {
    (async () => {
      if (useSelected && itemList && itemList.length > 0 && selected.id === null) {
        console.log('a');
        const firstItem = itemList[0];
        await setSelected({ id: firstItem.id, feeds: isFeed ? [firstItem['url']] : firstItem['feeds'].map(feed => feed.url) });
      }
    })();
  });

  if (loading) {
    return <NotifyLoading />;
  }

  if (error || !itemList) {
    return <NotifyError />;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {itemList.length > 0 ? (
          itemList.map((item: FeedObject | BundleObject) => (
            <OneListItem item={item} type={type} key={item.id} useSelected={useSelected} selected={selected} setSelected={setSelected} />
          ))
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
    </>
  );
};
