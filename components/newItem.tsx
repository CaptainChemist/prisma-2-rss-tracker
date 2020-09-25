import { useMutation } from '@apollo/client';
import { useState } from 'react';
import {
  CREATE_BUNDLE,
  CREATE_FEED,
  BUNDLES_QUERY,
  FEEDS_QUERY,
  FIND_BUNDLE_TAGS,
  FIND_FEED_TAGS,
  FIND_FEEDS_QUERY,
} from '../utils/graphql';
import { ActionType, BadgeFieldName, BundleState, FeedState, ItemType, SearchQueryName } from '../utils/types';
import { GenerateInputField } from './generateInputField';
import { OneBadge } from './oneBadge';
import { SearchItems } from './searchItems';

export const NewItem = ({ type }: { type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const initialState = isFeed ? { name: '', url: '', tags: [] } : { name: '', description: '', tags: [], feeds: [] };
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
          const tags =
            'tags' in currentItem
              ? {
                  tags: {
                    connect: currentItem.tags.map(({ id }) => ({ id })).filter(({ id }) => id !== undefined),
                    create: currentItem.tags.filter(({ id }) => id === undefined),
                  },
                }
              : {};
          const feeds =
            'feeds' in currentItem
              ? {
                  feeds: {
                    connect: currentItem.feeds.map(({ id }) => ({ id })).filter(({ id }) => id !== undefined),
                  },
                }
              : {};

          const data = { ...currentItem, ...tags, ...feeds };
          createItemMutation({
            refetchQueries: [{ query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY }],
            variables: { data },
          });
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
                  <OneBadge
                    key={oneTag.name}
                    fieldName={BadgeFieldName.tags}
                    item={oneTag}
                    action={ActionType.CREATE}
                    setItem={setItem}
                    currentItem={currentItem}
                  />
                ))}
              </div>
            </div>
            <div className="py-2">
              <label className="block py-4">Add New Tag:</label>
              <SearchItems
                queryName={isFeed ? SearchQueryName.findFeedTags : SearchQueryName.findBundleTags}
                query={isFeed ? FIND_FEED_TAGS : FIND_BUNDLE_TAGS}
                setItem={setItem}
                currentItem={currentItem}
                fieldName={BadgeFieldName.tags}
              />
            </div>
          </div>
          {isFeed ? null : (
            <div className="col-span-6 py-4">
              <div className="py-2">
                <label className="block py-4">Feeds:</label>
                <div className="grid grid-cols-4 gap-1">
                  {currentItem.feeds.map(oneFeed => (
                    <OneBadge
                      key={oneFeed.name}
                      fieldName={BadgeFieldName.feeds}
                      item={oneFeed}
                      action={ActionType.CREATE}
                      setItem={setItem}
                      currentItem={currentItem}
                    />
                  ))}
                </div>
              </div>
              <div className="py-2">
                <label className="block py-4">Add New Feed:</label>
                <SearchItems
                  queryName={SearchQueryName.findFeeds}
                  query={FIND_FEEDS_QUERY}
                  setItem={setItem}
                  currentItem={currentItem}
                  fieldName={BadgeFieldName.feeds}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
};
