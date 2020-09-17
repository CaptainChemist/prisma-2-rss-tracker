import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { SearchFeedTags } from './searchFeedTags';

const CREATE_FEED = gql`
  mutation createFeedMutation($data: FeedCreateInput) {
    createFeed(data: $data) {
      id
    }
  }
`;

export const NewFeed = () => {
  const [currentFeed, setFeed] = useState({ name: '', url: '', tags: [] });
  const [createFeedMutation, { loading }] = useMutation(CREATE_FEED);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          createFeedMutation({ variables: { data: currentFeed } });
          setFeed({ name: '', url: '', tags: [] });
        }}
      >
        <label className="block">Name:</label>
        <input
          className="shadow rounded w-full py-2 px-3"
          value={currentFeed.name}
          onChange={e => {
            e.persist();
            setFeed(curr => ({ ...curr, name: e.target.value }));
          }}
        />
        <label className="block">URL:</label>
        <input
          className="shadow rounded w-full py-2 px-3"
          value={currentFeed.url}
          onChange={e => {
            e.persist();
            setFeed(curr => ({ ...curr, url: e.target.value }));
          }}
        />
        <label className="block">Tags:</label>
        <SearchFeedTags />
        <input className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
      </form>
    </>
  );
};
