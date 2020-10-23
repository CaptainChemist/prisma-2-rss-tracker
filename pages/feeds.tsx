import { ItemList } from '../components/itemList';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';
import { useFetchUser } from '../utils/user';
import { useState } from 'react';
import { GenerateArticleList } from '../components/generateArticleList';
import { Minus, Plus } from '../components/svg';

const FeedsPage = () => {
  const { user, loading } = useFetchUser();
  const initialSelected: SelectedFeedState = { id: null, feeds: [], editMode: false, newMode: false };
  const [selected, setSelected] = useState(initialSelected);

  return (
    <Layout>
      <div className="grid grid-cols-2">
        <h3 className="grid-cols-1 justify-start flex text-lg font-medium py-4">Feeds Page</h3>
        {user ? (
          <div
            onClick={e => {
              e.persist();
              setSelected(currState => ({ ...currState, newMode: !currState.newMode, editMode: false }));
            }}
            className="flex grid-cols-1 justify-end"
          >
            {selected.newMode ? (
              <Minus className={`h-6 w-6 text-${selected.newMode ? `gray` : `blue`}-500 mt-4`} />
            ) : (
              <Plus className={`h-6 w-6 text-${selected.newMode ? `gray` : `blue`}-500 mt-4`} />
            )}
            <h3 className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${selected.newMode ? `gray` : `blue`}-500`}>
              New Feed
            </h3>
          </div>
        ) : null}
      </div>
      {(selected.editMode || selected.newMode) && user ? (
        <NewItem type={ItemType.FeedType} selected={selected} setSelected={setSelected} />
      ) : null}
      <ItemList type={ItemType.FeedType} useSelected={true} allowEdits={true} selected={selected} setSelected={setSelected} />
      {selected.feeds.length > 0 ? (
        <GenerateArticleList feeds={selected.feeds} />
      ) : (
        <h3 className="py-4 font-medium">No Feed Selected</h3>
      )}
    </Layout>
  );
};
export default FeedsPage;
