import { useState } from 'react';
import { NewItem } from '../components/newItem';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';
import { ItemList } from '../components/itemList';
import { useFetchUser } from '../utils/user';
import { ArticleList } from '../components/articleList';

const Index = () => {
  const { user, loading } = useFetchUser();
  const initialSelected: SelectedFeedState = { id: null, feeds: [] };
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
              className={`h-6 w-6 text-${showNewState ? `gray` : `blue`}-500 mt-4 mr-1`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className={`grid-cols-1 justify-start flex text-lg font-medium py-4 text-${showNewState ? `gray` : `blue`}-500`}>
              New Bundle
            </h3>
          </div>
        ) : null}
      </div>
      {showNewState && user ? <NewItem type={ItemType.BundleType} /> : null}
      <ItemList type={ItemType.BundleType} useSelected={true} selected={selected} setSelected={setSelected} />
      {selected.feeds.length > 0 ? <ArticleList rssFeeds={selected.feeds} /> : <h3 className="py-4 font-medium">No Bundle Selected</h3>}
    </Layout>
  );
};
export default Index;
