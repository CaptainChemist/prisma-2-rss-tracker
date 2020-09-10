import { useMutation, gql } from '@apollo/client';

const CREATE_BUNDLE = gql`
  mutation {
    createBundle(
      data: {
        name: "Trusted News"
        tags: { connect: [{ id: 18 }, { id: 19 }] }
        feeds: {
          create: [{ name: "Portland Press Herald", url: "https://www.pressherald.com/feeds/", tags: { create: [{ name: "Maine" }] } }]
          connect: [{ id: 1 }]
        }
      }
    ) {
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
