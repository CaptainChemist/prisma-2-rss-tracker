import { useQuery } from '@apollo/client';
import { BUNDLES_QUERY } from '../utils/graphql';
import { TagType } from '../utils/types';
import { ListItem } from './listItem';

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
          <ListItem item={oneBundle} type={TagType.BundleTag} key={oneBundle.id} />
        ))}
      </div>
    </>
  );
};
