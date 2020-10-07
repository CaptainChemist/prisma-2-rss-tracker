import { useMutation } from '@apollo/client';
import { useFetchUser } from '../utils/user';
import * as React from 'react';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { LIKE_BUNDLE_MUTATION, LIKE_FEED_MUTATION } from '../utils/api/graphql/mutations';

export const ItemLike = ({ item, type }: { item: FeedObject | BundleObject; type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const [likeItemMutation, { loading: likeItemLoading }] = useMutation(isFeed ? LIKE_FEED_MUTATION : LIKE_BUNDLE_MUTATION);
  const { user, loading } = useFetchUser();

  const likeMatches = item.likes.filter(oneLike => oneLike.auth0 === (user ? user.sub : ''));
  const hasMatch = likeMatches.length > 0 ? true : false;

  return (
    <div
      onClick={e => {
        e.stopPropagation();
        if (user) {
          const idObj = isFeed ? { feedId: item.id } : { bundleId: item.id };
          likeItemMutation({
            variables: {
              data: {
                ...idObj,
                likeState: hasMatch ? false : true,
              },
            },
          });
        }
      }}
      className="flex col-span-1 py-2 mx-2 z-10"
    >
      <p>{item.likes.length} </p>
      {likeItemLoading || loading ? (
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
          className={`h-6 w-6 ${hasMatch ? `text-red-500` : `text-gray-500`}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </div>
  );
};
