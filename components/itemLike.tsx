import { useMutation } from '@apollo/client';
import { useFetchUser } from '../utils/user';
import * as React from 'react';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { LIKE_BUNDLE_MUTATION, LIKE_FEED_MUTATION } from '../utils/api/graphql/mutations';
import { Heart } from './heart';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/api/graphql/queries';

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
      className="flex py-2 mx-1 z-10"
    >
      <p>{item.likes.length} </p>
      <Heart size={6} liked={hasMatch} loading={likeItemLoading || loading} />
    </div>
  );
};
