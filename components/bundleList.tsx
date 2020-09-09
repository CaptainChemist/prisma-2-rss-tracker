import { gql, useQuery, NetworkStatus } from '@apollo/client';

const BUNDLES_QUERY = gql`
  query {
    bundles {
      id
      name
      feeds {
        id
        name
        url
      }
      tags {
        id
      }
      author {
        id
      }
    }
  }
`;

export const BundleList = () => {
  const { loading, error, data } = useQuery(BUNDLES_QUERY);

  if (loading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>Error</p>;
  }

  return (
    <>
      <p> Bundles:</p>
      {data.bundles.map(oneBundle => (
        <p key={oneBundle.id}>{JSON.stringify(oneBundle)}</p>
      ))}
    </>
  );
};
