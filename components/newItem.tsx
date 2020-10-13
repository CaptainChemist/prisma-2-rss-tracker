import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { CREATE_BUNDLE_MUTATION, CREATE_FEED_MUTATION } from '../utils/api/graphql/mutations';
import {
  BUNDLES_QUERY,
  FEEDS_QUERY,
  FIND_BUNDLE_TAGS_QUERY,
  FIND_FEEDS_QUERY,
  FIND_FEED_TAGS_QUERY,
} from '../utils/api/graphql/queries';
import { ActionType, BadgeFieldName, BundleState, FeedState, ItemType, SearchQueryName } from '../utils/types';
import { GenerateInputField } from './generateInputField';
import { SearchItems } from './searchItems';
import { BadgeList } from './badgeList';

type NewItemState = FeedState | BundleState;

export const NewItem = ({ type }: { type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const initialFeed: FeedState = { name: '', url: '', tags: [] };
  const initialBundle: BundleState = { name: '', description: '', tags: [], feeds: [] };
  const initialState: NewItemState = isFeed ? initialFeed : initialBundle;
  const inputFields = isFeed ? ['name', 'url'] : ['name', 'description'];

  const [currentItem, setItem] = useState<NewItemState>(initialState);
  const [createItemMutation, { loading }] = useMutation(isFeed ? CREATE_FEED_MUTATION : CREATE_BUNDLE_MUTATION);

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
        <div className="grid grid-cols-12 gap-4 rounded-md border my-4 py-2 px-2">
          <h3 className="col-span-12 text-lg font-medium py-2">{isFeed ? `New Feed` : `New Bundle`}</h3>

          <div className="col-span-6">
            {inputFields.map(name => (
              <GenerateInputField key={`${type}-${name}`} currentItem={currentItem} name={name} changeHandler={setItem} />
            ))}
          </div>
          <div className="col-span-6">
            <div className="py-2">
              <label className="block py-2">Tags:</label>
              <div className="grid grid-cols-4 gap-1">
                <BadgeList fieldName={BadgeFieldName.tags} action={ActionType.CREATE} setItem={setItem} item={currentItem} />
              </div>
            </div>
            <div className="py-2">
              <label className="block py-2">Add New Tag:</label>
              <SearchItems
                queryName={isFeed ? SearchQueryName.findFeedTags : SearchQueryName.findBundleTags}
                query={isFeed ? FIND_FEED_TAGS_QUERY : FIND_BUNDLE_TAGS_QUERY}
                setItem={setItem}
                currentItem={currentItem}
                fieldName={BadgeFieldName.tags}
              />
            </div>
            {isFeed ? null : (
              <>
                <div className="py-2">
                  <label className="block py-4">Feeds:</label>
                  <div className="grid grid-cols-4 gap-1">
                    <BadgeList fieldName={BadgeFieldName.feeds} action={ActionType.CREATE} setItem={setItem} item={currentItem} />
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
              </>
            )}
          </div>
          <div className="col-span-12">
            <div className="py-2">
              <input className="py-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
