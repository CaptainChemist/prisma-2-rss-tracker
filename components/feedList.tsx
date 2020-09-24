import { useQuery } from '@apollo/client';
import { FEEDS_QUERY } from '../utils/graphql';
import { TagType } from '../utils/types';
import { ListItem } from './listItem';

export const FeedList = () => {
  const { loading, error, data } = useQuery(FEEDS_QUERY);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <p> Feeds:</p>
      <div className="grid grid-cols-3 gap-4">
        {data.feeds.map(oneFeed => (
          <ListItem item={oneFeed} type={TagType.FeedTag} key={oneFeed.id} />
        ))}
      </div>
    </>
  );
};
