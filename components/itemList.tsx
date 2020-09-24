import { useQuery } from '@apollo/client';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/graphql';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { OneListItem } from './oneListItem';

export const ItemList = ({ type }: { type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const { loading, error, data } = useQuery(isFeed ? FEEDS_QUERY : BUNDLES_QUERY);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }
  const { feeds, bundles } = data || {};
  const itemList = isFeed ? feeds : bundles;

  return (
    <>
      <p> {isFeed ? 'Feeds' : 'Bundles'}:</p>
      <div className="grid grid-cols-3 gap-4">
        {itemList.length > 0 ? (
          itemList.map((item: FeedObject | BundleObject) => <OneListItem item={item} type={type} key={item.id} />)
        ) : (
          <p>None are present. Why not add one?</p>
        )}
      </div>
    </>
  );
};
