import { gql, useQuery, NetworkStatus } from '@apollo/client';

const FEEDS_QUERY = gql`
  query {
    feeds {
      id
      name
      tags {
        id
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
      {data.feeds.map(oneFeed => (
        <p key={oneFeed.id}>{JSON.stringify(oneFeed)}</p>
      ))}
    </>
  );
};
