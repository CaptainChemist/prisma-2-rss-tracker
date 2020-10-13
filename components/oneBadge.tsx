import { BundleTag, FeedTag } from '@prisma/client';
import { Dispatch, SetStateAction } from 'react';
import { ActionType, BadgeFieldName, BundleState, FeedObject, FeedState } from '../utils/types';

export const OneBadge = ({
  item,
  action,
  currentItem,
  fieldName,
  setItem,
}: {
  item: FeedTag | BundleTag | FeedObject;
  action: ActionType;
  currentItem?: FeedState | BundleState;
  fieldName: BadgeFieldName;
  setItem?: Dispatch<SetStateAction<FeedState | BundleState>>;
}) => {
  const currentMatches = currentItem ? currentItem.tags.filter(oneItem => oneItem.name === item.name) : [];
  return (
    <span
      className={`flex text-sm py-1 px-1 rounded align-middle bg-${
        fieldName === BadgeFieldName.tags ? `blue` : fieldName === BadgeFieldName.feeds ? `green` : `purple`
      }-300`}
    >
      {action === ActionType.ADD ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={`h-5 w-5 text-gray-500`}
          onClick={() => {
            setItem(feed => ({ ...feed, [fieldName]: [...feed[fieldName], { ...item }] }));
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
            setItem(feed => ({ ...feed, [fieldName]: feed[fieldName].filter(o => item.name !== o.name) }));
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
        </svg>
      ) : null}
      {item.name}
    </span>
  );
};
