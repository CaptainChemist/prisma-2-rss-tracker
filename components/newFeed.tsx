import { useMutation, gql } from '@apollo/client';

const CREATE_FEED = gql`
  mutation {
    createFeed(data: { name: "hi", url: "bla2", tags: { create: [{ name: "bla5" }, { name: "bla6" }] } }) {
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
