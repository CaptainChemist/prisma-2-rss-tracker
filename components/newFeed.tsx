import { useMutation, gql } from '@apollo/client';

const CREATE_FEED = gql`
  mutation {
    createFeed(
      data: {
        name: "NY Times"
        url: "https://archive.nytimes.com/www.nytimes.com/services/xml/rss/index.html"
        tags: { create: [{ name: "News" }, { name: "New York" }] }
      }
    ) {
      id
    }
  }
`;

export const NewFeed = () => {
  const [createFeedMutation, { loading }] = useMutation(CREATE_FEED);

  if (loading) {
    return <p>Loading</p>;
  }

  return <button onClick={() => createFeedMutation()}>NewFeed</button>;
};
