import { useMutation, gql } from '@apollo/client';

const CREATE_BUNDLE = gql`
  mutation {
    createBundle(data: { name: "hi" }) {
      id
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
