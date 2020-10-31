import { useState } from 'react';
import { ItemList } from '../components/itemList';
import { Layout } from '../components/layout';
import { ItemType, SelectedFeedState } from '../utils/types';

const IndexPage = () => {
  const initialSelected: SelectedFeedState = { id: null, feeds: [], editMode: false, newMode: false };
  const [selected, setSelected] = useState(initialSelected);

  return (
    <Layout>
      <h3 className="grid-cols-1 justify-start flex text-lg font-medium py-4">Home Page</h3>
      <ItemList type={ItemType.BundleType} useSelected={true} selected={selected} setSelected={setSelected} />
    </Layout>
  );
};
export default IndexPage;
