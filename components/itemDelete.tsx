import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { DELETE_BUNDLE_MUTATION, DELETE_FEED_MUTATION } from '../utils/api/graphql/mutations';
import { BUNDLES_QUERY, FEEDS_QUERY } from '../utils/api/graphql/queries';
import { BundleObject, FeedObject, ItemType } from '../utils/types';
import { useFetchUser } from '../utils/user';

export const ItemDelete = ({ item, type }: { item: FeedObject | BundleObject; type: ItemType }) => {
  const isFeed = type === ItemType.FeedType;
  const [deleteItemMutation, { loading: deleteItemLoading }] = useMutation(isFeed ? DELETE_FEED_MUTATION : DELETE_BUNDLE_MUTATION);
  const [modalVisibility, setVisibility] = useState(false);
  const { user, loading } = useFetchUser();

  return (
    <>
      {modalVisibility ? (
        <div className="fixed z-20 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg font-medium">Are you sure you want to delete this {isFeed ? 'feed?' : 'bundle?'}</h3>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md  sm:ml-3 sm:w-auto">
                    <button
                      onClick={e => {
                        e.preventDefault();
                        deleteItemMutation({
                          variables: {
                            data: {
                              id: item.id,
                            },
                          },
                          refetchQueries: [{ query: isFeed ? FEEDS_QUERY : BUNDLES_QUERY }],
                        });
                        setVisibility(false);
                      }}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-500 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Delete
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md sm:mt-0 sm:w-auto">
                    <button
                      onClick={e => {
                        e.preventDefault();
                        setVisibility(false);
                      }}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Cancel
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        onClick={e => {
          e.preventDefault();
          setVisibility(true);
        }}
        className="flex col-span-1 py-2 z-10"
      >
        {deleteItemLoading || loading ? (
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
            className={`h-6 w-6 text-red-500`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
            />
          </svg>
        )}
      </div>
    </>
  );
};
