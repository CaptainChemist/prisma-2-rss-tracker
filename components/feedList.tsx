import { gql, useQuery } from '@apollo/client';
import { ListItem } from './listItem';
import { TagType } from './oneTag';

const FEEDS_QUERY = gql`
  query {
    feeds {
      id
      name
      likes {
        id
        auth0
      }
      tags {
        id
        name
      }
      author {
        id
        nickname
        picture
      }
      bundles {
        id
        name
      }
    }
  }
`;

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
