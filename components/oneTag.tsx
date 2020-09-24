import { FeedTag } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { FeedState } from './newFeed';

export enum ActionType {
  ADD = 'ADD',
  CREATE = 'CREATE',
  NONE = 'NONE',
}

export enum TagType {
  FeedTag = 'FeedTag',
  BundleTag = 'BundleTag',
}

export const OneTag = ({
  tag,
  action,
  type,
  setFeed,
  currentFeed,
}: {
  tag: FeedTag;
  action: ActionType;
  type: TagType;
  currentFeed?: FeedState;
  setFeed?: Dispatch<SetStateAction<FeedState>>;
}) => {
  const currentMatches = currentFeed ? currentFeed.tags.filter(oneTag => oneTag.name === tag.name) : [];
  return (
    <span className={`flex text-sm py-1 px-1 rounded align-middle bg-blue-100`}>
      {action === ActionType.ADD ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-5 w-5 text-gray-500`}
          onClick={() => {
            currentMatches.length === 0 ? setFeed(feed => ({ ...feed, tags: [...feed.tags, { ...tag }] })) : null;
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ) : null}
      {action === ActionType.CREATE ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-5 w-5 text-gray-500`}
          onClick={() => {
            setFeed(feed => ({ ...feed, tags: feed.tags.filter(o => tag.name !== o.name) }));
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      ) : null}
      {tag.name}
    </span>
  );
};
