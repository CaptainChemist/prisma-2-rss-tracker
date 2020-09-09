import { useMutation, gql } from '@apollo/client';

const CREATE_BUNDLE = gql`
  mutation {
    createBundle(data: { name: "hi", tags: { connect: [{ id: 18 }, { id: 19 }] }, feeds: { connect: [{ id: 9 }, { id: 11 }] } }) {
      id
      tags {
        id
        name
      }
    }
  }
`;

export const NewBundle = () => {
  const [createBundleMutation, { loading }] = useMutation(CREATE_BUNDLE);

  if (loading) {
    return <p>Loading</p>;
  }

  return <button onClick={() => createBundleMutation()}>NewBundle</button>;
};
