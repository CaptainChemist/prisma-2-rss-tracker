import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_BUNDLE, CREATE_FEED } from '../utils/graphql';
import { ActionType, BundleState, FeedState, ItemType, TagType } from '../utils/types';
import { GenerateInputField } from './generateInputField';
import { OneTag } from './oneTag';
import { SearchTags } from './searchTags';

export const NewItem = ({ type }: { type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const initialState = isFeed ? { name: '', url: '', tags: [] } : { name: '', description: '', tags: [] };
  const inputFields = isFeed ? ['name', 'url'] : ['name', 'description'];

  const [currentItem, setItem] = useState<FeedState | BundleState>(initialState);
  const [createItemMutation, { loading }] = useMutation(isFeed ? CREATE_FEED : CREATE_BUNDLE);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          const connect = currentItem.tags.map(({ id }) => ({ id })).filter(({ id }) => id !== undefined);
          const create = currentItem.tags.filter(({ id }) => id === undefined);
          const data = { ...currentItem, tags: { connect, create } };

          createItemMutation({ variables: { data } });
          setItem(initialState);
        }}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 py-4">
            {inputFields.map(name => (
              <GenerateInputField key={`${type}-${name}`} currentItem={currentItem} name={name} changeHandler={setItem} />
            ))}
            <div className="py-2">
              <input className="py-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
            </div>
          </div>
          <div className="col-span-6 py-4">
            <div className="py-2">
              <label className="block py-4">Tags:</label>
              <div className="grid grid-cols-4 gap-1">
                {currentItem.tags.map(oneTag => (
                  <OneTag key={oneTag.name} tag={oneTag} action={ActionType.CREATE} setItem={setItem} currentItem={currentItem} />
                ))}
              </div>
            </div>
            <div className="py-2">
              <label className="block py-4">Add New Tag:</label>
              <SearchTags type={TagType.FeedTag} setItem={setItem} currentItem={currentItem} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
