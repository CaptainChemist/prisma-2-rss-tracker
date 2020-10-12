import { Dispatch, SetStateAction } from 'react';
import { ActionType, BadgeFieldName, BundleState, FeedObject, FeedState } from '../utils/types';
import { OneBadge } from './oneBadge';

export const BadgeList = ({
  fieldName,
  action,
  setItem,
  item,
}: {
  action: ActionType;
  item: FeedState | BundleState;
  fieldName: BadgeFieldName;
  setItem?: Dispatch<SetStateAction<FeedState | BundleState>>;
}) => {
  return item[fieldName].length > 0 ? (
    <>
      {item[fieldName].map(oneBadge => (
        <OneBadge key={oneBadge.name} fieldName={fieldName} item={oneBadge} action={action} setItem={setItem} currentItem={item} />
      ))}
    </>
  ) : (
    <p>None found</p>
  );
};
