import { useMutation, gql } from '@apollo/client';
import { useState } from 'react';
import { ActionType, OneTag, TagType } from './oneTag';
import { SearchFeedTags } from './searchFeedTags';

const CREATE_FEED = gql`
  mutation createFeedMutation($data: FeedCreateInput) {
    createFeed(data: $data) {
      id
    }
  }
`;

export type FeedState = {
  name: string;
  url: string;
  tags: { name: string; id: number }[];
};

export const GenerateInputField = ({ currentFeed, name, changeHandler }) => (
  <div className="py-2">
    <label className="block py-4">{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
    <input
      className="shadow rounded w-full py-2 px-3"
      value={currentFeed[name]}
      onChange={e => {
        e.persist();
        changeHandler(curr => ({ ...curr, [name]: e.target.value }));
      }}
    />
  </div>
);

export const NewFeed = () => {
  const [currentFeed, setFeed] = useState<FeedState>({ name: '', url: '', tags: [] });
  const [createFeedMutation, { loading }] = useMutation(CREATE_FEED);

  if (loading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault();
          const connect = currentFeed.tags.map(({ id }) => ({ id })).filter(({ id }) => id !== undefined);
          const create = currentFeed.tags.filter(({ id }) => id === undefined);
          const data = { ...currentFeed, tags: { connect, create } };

          createFeedMutation({ variables: { data } });
          setFeed({ name: '', url: '', tags: [] });
        }}
      >
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 py-4">
            <GenerateInputField currentFeed={currentFeed} name={'name'} changeHandler={setFeed} />
            <GenerateInputField currentFeed={currentFeed} name={'url'} changeHandler={setFeed} />
            <div className="py-2">
              <input className="py-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit" />
            </div>
          </div>
          <div className="col-span-6 py-4">
            <div className="py-2">
              <label className="block py-4">Tags:</label>
              <div className="grid grid-cols-4 gap-1">
                {currentFeed.tags.map(oneTag => (
                  <OneTag
                    key={oneTag.name}
                    tag={oneTag}
                    action={ActionType.CREATE}
                    type={TagType.FeedTag}
                    setFeed={setFeed}
                    currentFeed={currentFeed}
                  />
                ))}
              </div>
            </div>
            <div className="py-2">
              <label className="block py-4">Add New Tag:</label>
              <SearchFeedTags setFeed={setFeed} currentFeed={currentFeed} />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
