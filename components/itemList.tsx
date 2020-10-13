import { useQuery } from '@apollo/client';
import { Dispatch, SetStateAction } from 'react';
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

  if (loading) {
    return <NotifyLoading />;
  }

  const { feeds, bundles } = data || {};
  const itemList = isFeed ? feeds : bundles;

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
