import { useState } from 'react';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';
import { ItemList } from '../components/itemList';
import { useFetchUser } from '../utils/user';
import { GenerateArticleList } from '../components/generateArticleList';

const BundlesPage = () => {
  const { user, loading } = useFetchUser();
  const initialSelected: SelectedFeedState = { id: null, feeds: [], editMode: false };
  const [selected, setSelected] = useState(initialSelected);
  const [showNewState, setNewState] = useState(false);

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <h3 className="grid-cols-1 justify-start flex text-lg font-medium py-4">Bundles Page</h3>
        {user ? (
          <div className="flex grid-cols-1 justify-end">
            <svg
              onClick={e => {
                e.persist();
                setNewState(currState => !currState);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`h-6 w-6 text-${showNewState ? `gray` : `blue`}-500 mt-4`}
            >
              {showNewState? 
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />:
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              }
            </svg>
            <h3 className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${showNewState ? `gray` : `blue`}-500`}>
              New Bundle
            </h3>
          </div>
        ) : null}
      </div>
      {showNewState && user ? <NewItem type={ItemType.BundleType} /> : null}
      <ItemList type={ItemType.BundleType} useSelected={true} selected={selected} setSelected={setSelected} />
      {selected.feeds.length > 0 ? <GenerateArticleList feeds={selected.feeds} /> : <h3 className="py-4 font-medium">No Bundle Selected</h3>}
    </Layout>
  );
};
export default BundlesPage;

