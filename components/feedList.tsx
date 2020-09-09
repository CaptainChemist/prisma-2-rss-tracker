import { gql, useQuery, NetworkStatus } from '@apollo/client';

const FEEDS_QUERY = gql`
  query {
    feeds {
      id
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
      {data.feeds.map(oneFeed => (
        <p key={oneFeed.id}>{oneFeed.id}</p>
      ))}
    </>
  );
};
