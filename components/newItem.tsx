import { useMutation, useQuery } from '@apollo/client';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  CREATE_BUNDLE_MUTATION,
  CREATE_FEED_MUTATION,
  UPDATE_BUNDLE_MUTATION,
  UPDATE_FEED_MUTATION,
} from '../utils/api/graphql/mutations';
import {
  BUNDLES_QUERY,
  BUNDLE_QUERY,
  FEEDS_QUERY,
  FEED_QUERY,
  FIND_BUNDLE_TAGS_QUERY,
  FIND_FEEDS_QUERY,
  FIND_FEED_TAGS_QUERY,
} from '../utils/api/graphql/queries';
import { ActionType, BadgeFieldName, BundleState, FeedState, ItemType, SearchQueryName, SelectedFeedState } from '../utils/types';
import { GenerateInputField } from './generateInputField';
import { SearchItems } from './searchItems';
import { BadgeList } from './badgeList';
import { prepareNewUpdateObj } from '../utils/prepareUpdateObj';
import { NotifyLoading } from './notifyLoading';
import { NotifyError } from './notifyError';
import { ErrorSign, WaitingClock } from './svg';

type NewItemState = FeedState | BundleState;

export const NewItem = ({
  type,
  setSelected,
  selected,
}: {
  type: ItemType;
  setSelected?: Dispatch<SetStateAction<SelectedFeedState>>;
  selected: SelectedFeedState;
}) => {
  const isFeed = type === ItemType.FeedType;
  const initialFeed: FeedState = { name: '', url: '', tags: [] };
  const initialBundle: BundleState = { name: '', description: '', tags: [], feeds: [] };
  const initialState: NewItemState = isFeed ? initialFeed : initialBundle;
  const inputFields = isFeed ? ['name', 'url'] : ['name', 'description'];

  const [currentItem, setItem] = useState<NewItemState>(initialState);
  const [createItemMutation, { loading: createLoading, error: createError }] = useMutation(
    isFeed ? CREATE_FEED_MUTATION : CREATE_BUNDLE_MUTATION
  );
  const [updateItemMutation, { loading: updateLoading, error: updateError }] = useMutation(
    isFeed ? UPDATE_FEED_MUTATION : UPDATE_BUNDLE_MUTATION
  );

  const variables = { data: { id: selected.id } };
  const { loading: itemQueryLoading, error: itemQueryError, data: itemQueryData } = useQuery(isFeed ? FEED_QUERY : BUNDLE_QUERY, {
    variables,
  });
  const { bundle, feed } = itemQueryData || {};
  const item = isFeed ? feed : bundle;

  useEffect(() => {
    (async () => {
      if (item && selected.editMode) {
        const { __typename, likes, author, ...cleanedItem } = item;
        setItem({ ...cleanedItem });
      } else {
        setItem(initialState);
      }
    })();
  }, [itemQueryData]);

  if (createLoading || updateLoading || itemQueryLoading) {
    return <WaitingClock className="my-20 h-10 w-10 text-gray-500 m-auto" />;
  }
  if (createError || updateError || itemQueryError) {
    return <ErrorSign className="my-20 h-10 w-10 text-gray-500 m-auto" />;
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          const data = prepareNewUpdateObj(item, currentItem, isFeed, selected.editMode);

          const mutationPayload = {
            refetchQueries: [{ query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY }],
            variables: { data },
          };

          selected.editMode ? updateItemMutation(mutationPayload) : createItemMutation(mutationPayload);

          setItem(initialState);
          setSelected(currState => ({ ...currState, editMode: false, newMode: false }));
        }}
      >
        <div className="grid grid-cols-12 gap-4 rounded-md border-4 my-4 py-2 px-4">
          <h3 className="col-span-12 text-lg font-medium py-2">{isFeed ? `New Feed` : `New Bundle`}</h3>

          <div className="col-span-6">
            {inputFields.map(name => (
              <GenerateInputField key={`${type}-${name}`} currentItem={currentItem} name={name} changeHandler={setItem} />
            ))}
            <div className={`py-4 ${isFeed ? null : `pt-28`}`}>
              <input
                className={`py-4 ${`bg-${isFeed ? 'green' : 'purple'}-400`} hover:bg-${
                  isFeed ? 'green' : 'purple'
                }-700 text-white font-bold px-12 rounded`}
                type="submit"
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="py-2">
              <label className="block py-2">Tags:</label>
              <div className="grid grid-cols-3 gap-2">
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
                  <label className="block py-2">Feeds:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <BadgeList fieldName={BadgeFieldName.feeds} action={ActionType.CREATE} setItem={setItem} item={currentItem} />
                  </div>
                </div>
                <div className="py-2">
                  <label className="block py-2">Add New Feed:</label>
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
        </div>
      </form>
    </>
  );
};
