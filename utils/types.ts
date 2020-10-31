export enum ItemType {
  BundleType = 'BundleType',
  FeedType = 'FeedType',
}

export type FeedObject = {
  id: string;
  name: string;
  url: string;
  tags: TagObject[];
  bundles: BundleObject[];
  author: AuthorObject;
  likes: AuthorObject[];
};

export type BundleObject = {
  id: string;
  name: string;
  description: string;
  tags: TagObject[];
  feeds: FeedObject[];
  author: AuthorObject;
  likes: AuthorObject[];
};

export type AuthorObject = {
  id: string;
  auth0: string;
  picture: string;
  nickname: string;
};

export type TagObject = {
  name: string;
  id: string;
};
