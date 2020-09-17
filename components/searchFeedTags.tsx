import { useState } from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const FIND_FEED_TAGS = gql`
  query findFeedTagsQuery($data: FindFeedTagsInput) {
    findFeedTags(data: $data) {
      id
      name
    }
  }
`;

export const SearchFeedTags = () => {
  const [search, setSearch] = useState('');
  const [findFeedTagsQuery, { loading, data, called }] = useLazyQuery(FIND_FEED_TAGS);

  const { findFeedTags } = data || {};

  return (
    <>
      <input
        className="shadow rounded w-full py-2 px-3"
        value={search}
        onChange={async e => {
          e.persist();
          setSearch(() => e.target.value);
          await findFeedTagsQuery({ variables: { data: { search: e.target.value } } });
        }}
      />
      {loading ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 text-gray-500 animate-spin">
          <path
            fillRule="evenodd"
            d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-500">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )}
      {findFeedTags && findFeedTags.length > 0 ? (
        findFeedTags.map(oneTag => <p key={oneTag.id}>{oneTag.name}</p>)
      ) : called ? (
        <p>No feeds found</p>
      ) : null}
    </>
  );
};
