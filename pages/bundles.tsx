import { useState } from 'react';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';
import { ItemList } from '../components/itemList';
import { useFetchUser } from '../utils/user';
import { GenerateArticleList } from '../components/generateArticleList';
import { Minus, Plus } from '../components/svg';

const BundlesPage = () => {
  const { user, loading } = useFetchUser();
  const initialSelected: SelectedFeedState = { id: null, feeds: [], editMode: false, newMode: false };
  const [selected, setSelected] = useState(initialSelected);

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <h3 className="grid-cols-1 justify-start flex text-lg font-medium py-4">Bundles Page</h3>
        {user ? (
          <div
            onClick={e => {
              e.persist();
              setSelected(currState => ({ ...currState, newMode: !currState.newMode, editMode: false }));
            }}
            className="flex grid-cols-1 justify-end cursor-pointer"
          >
            {selected.newMode ? (
              <Minus className={`h-6 w-6 text-${selected.newMode ? `gray` : `blue`}-500 mt-4`} />
            ) : (
              <Plus className={`h-6 w-6 text-${selected.newMode ? `gray` : `blue`}-500 mt-4`} />
            )}
            <h3 className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${selected.newMode ? `gray` : `blue`}-500`}>
              New Bundle
            </h3>
          </div>
        ) : null}
      </div>
      {(selected.editMode || selected.newMode) && user ? (
        <NewItem type={ItemType.BundleType} selected={selected} setSelected={setSelected} />
      ) : null}
      <ItemList type={ItemType.BundleType} useSelected={true} allowEdits={true} selected={selected} setSelected={setSelected} />
      {selected.feeds.length > 0 ? (
        <GenerateArticleList feeds={selected.feeds} />
      ) : (
        <h3 className="py-4 font-medium">No Bundle Selected</h3>
      )}
    </Layout>
  );
};
export default BundlesPage;
