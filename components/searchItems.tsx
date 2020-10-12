import { Dispatch, SetStateAction, useState } from 'react';
import { DocumentNode, useLazyQuery } from '@apollo/client';
import * as _ from 'lodash';
import { ActionType, BadgeFieldName, BundleState, FeedState, SearchQueryName } from '../utils/types';
import { BadgeList } from './badgeList';

export const SearchItems = ({
  currentItem,
  setItem,
  queryName,
  query,
  fieldName,
}: {
  currentItem: FeedState | BundleState;
  setItem: Dispatch<SetStateAction<FeedState | BundleState>>;
  queryName: SearchQueryName;
  query: DocumentNode;
  fieldName: BadgeFieldName;
}) => {
  const [search, setSearch] = useState('');
  const [findItemsQuery, { loading, data, called }] = useLazyQuery(query);
  const fetchedItems = _.get(data, queryName);
  const filtFindItems = fetchedItems
    ? fetchedItems.filter(oneItem => !currentItem[fieldName].map(o => o.name).includes(oneItem.name))
    : [];

  const matchCurrent = filtFindItems.filter(o => o.name === search);
  const matchList = currentItem[fieldName].filter(o => o.name === search);
  const filtFindItemsWithAdd =
    matchCurrent.length === 0 && matchList.length === 0 && queryName !== 'findFeeds'
      ? [...filtFindItems, { name: search }]
      : filtFindItems;

  const dummyNewItem = { ...currentItem, [fieldName]: filtFindItemsWithAdd };

  return (
    <div className="">
      <div className="flex">
        {loading ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-gray-500 animate-spin">
            <path
              fillRule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mt-3 mr-2 w-6 h-6 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )}
        <input
          className="shadow rounded w-full py-2 px-3"
          value={search}
          onChange={async e => {
            e.persist();
            setSearch(() => e.target.value);
            await findItemsQuery({ variables: { data: { search: e.target.value } } });
          }}
        />
      </div>
      <div className="grid grid-cols-4 gap-1 flex m-2">
        {search !== '' ? (
          <BadgeList fieldName={fieldName} action={ActionType.ADD} setItem={setItem} item={dummyNewItem} />
        ) : called ? (
          <p>No matches</p>
        ) : null}
      </div>
    </div>
  );
};
