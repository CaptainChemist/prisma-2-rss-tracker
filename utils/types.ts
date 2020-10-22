import { Feed } from "@prisma/client";

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

export enum SearchType {
  FeedTag = 'FeedTag',
  BundleTag = 'BundleTag',
  FeedType = 'FeedType',
}

export enum SearchQueryName {
  findFeedTags = 'findFeedTags',
  findBundleTags = 'findBundleTags',
  findFeeds = 'findFeeds',
}

export enum BadgeFieldName {
  tags = 'tags',
  feeds = 'feeds',
  bundles = 'bundles',
}

export type TagObject = {
  name: string;
  id: number;
};

export type BundleState = {
  name: string;
  description: string;
  tags: TagObject[];
  feeds: FeedState[];
};

export type FeedState = {
  id?: number;
  name: string;
  url: string;
  tags: TagObject[];
};

export type AuthorObject = {
  id: string;
  auth0: string;
  picture: string;
  nickname: string;
};

export type FeedObject = {
  id: number;
  name: string;
  url: string;
  tags: TagObject[];
  bundles: BundleObject[];
  author: AuthorObject;
  likes: AuthorObject[];
};

export type BundleObject = {
  id: number;
  name: string;
  description: string;
  tags: TagObject[];
  feeds: FeedObject[];
  author: AuthorObject;
  likes: AuthorObject[];
};

export type SelectedFeedState = {
  id: number;
  feeds: Feed[];
  editMode: boolean;
};
