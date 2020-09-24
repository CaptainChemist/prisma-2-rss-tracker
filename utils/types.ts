export enum ActionType {
  ADD = 'ADD',
  CREATE = 'CREATE',
  NONE = 'NONE',
}

export enum TagType {
  FeedTag = 'FeedTag',
  BundleTag = 'BundleTag',
}

export enum ItemType {
  BundleType = 'BundleType',
  FeedType = 'FeedType',
}

export type BundleState = {
  name: string;
  description: string;
  tags: { name: string; id: number }[];
};

export type FeedState = {
  name: string;
  url: string;
  tags: { name: string; id: number }[];
};
