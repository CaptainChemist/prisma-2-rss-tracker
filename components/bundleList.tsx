import { gql, useQuery, NetworkStatus } from '@apollo/client';
import { BundleListItem } from './bundleListItem';

const BUNDLES_QUERY = gql`
  query {
    bundles {
      id
      name
      likes {
        id
        auth0
      }
      feeds {
        id
        name
        url
      }
      tags {
        id
        name
      }
      author {
        id
        auth0
        nickname
        picture
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
      <div className="grid grid-cols-3 gap-4">
        {data.bundles.map(oneBundle => (
          <BundleListItem key={oneBundle.id} bundle={oneBundle} />
        ))}
      </div>
    </>
  );
};
