import { useQuery } from '@apollo/client';
import { Bundle, Feed } from '@prisma/client';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/graphql';
import { ItemType, TagType } from '../utils/types';
import { OneListItem } from './oneListItem';

export const ItemList = ({ type }: { type: ItemType }) => {
  const { loading, error, data } = useQuery(type === ItemType.FeedType ? FEEDS_QUERY : BUNDLES_QUERY);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }
  const { feeds, bundles } = data;
  const itemList = type === ItemType.FeedType ? feeds : bundles;

  return (
    <>
      <p> {type === ItemType.FeedType ? 'Feeds' : 'Bundles'}:</p>
      <div className="grid grid-cols-3 gap-4">
        {itemList.map((item: Feed | Bundle) => (
          <OneListItem item={item} type={type === ItemType.FeedType ? TagType.FeedTag : TagType.BundleTag} key={item.id} />
        ))}
      </div>
    </>
  );
};
