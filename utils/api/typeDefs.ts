import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  scalar JSON

  type Feed {
    id: Int
    name: String
    url: String
    bundles: [Bundle]
    author: User
    tags: [FeedTag]
    likes: [User]
    savedArticles: [SavedArticle]
  }
  type Bundle {
    id: Int
    name: String
    description: String
    feeds: [Feed]
    author: User
    tags: [BundleTag]
    likes: [User]
  }
  type User {
    id: Int
    auth0: String
    nickname: String
    picture: String
    bundles: [Bundle]
    feeds: [Feed]
    savedArticles: [SavedArticle]
    feedLikes: [Feed]
    bundleLikes: [Bundle]
  }
  type SavedArticle {
    id: Int
    author: User
    url: String
    contents: JSON
    feed: Feed
  }
  type BundleTag {
    id: Int
    name: String
    bundles: [Bundle]
  }
  type FeedTag {
    id: Int
    name: String
    feeds: [Feed]
  }
  input FeedCreateInput {
    url: String
    name: String
    tags: NestedFeedTagCreateInput
  }
  input FeedUpdateInput {
    id: Int
    url: String
    name: String
    tags: NestedFeedTagUpdateInput
  }
  input NestedFeedTagCreateInput {
    create: [FeedTagCreateInput]
    connect: [FeedTagWhereUniqueInput]
  }
  input NestedFeedTagUpdateInput {
    create: [FeedTagCreateInput]
    connect: [FeedTagWhereUniqueInput]
    disconnect: [FeedTagWhereUniqueInput]
  }
  input FeedTagCreateInput {
    name: String
  }
  input BundleTagCreateInput {
    name: String
  }
  input BundleCreateInput {
    name: String
    description: String
    tags: NestedBundleTagCreateInput
    feeds: NestedBundleFeedCreateInput
  }
  input BundleUpdateInput {
    id: Int
    name: String
    description: String
    tags: NestedBundleTagUpdateInput
    feeds: NestedBundleFeedUpdateInput
  }
  input NestedBundleTagCreateInput {
    create: [BundleTagCreateInput]
    connect: [BundleTagWhereUniqueInput]
  }
  input NestedBundleTagUpdateInput {
    create: [BundleTagCreateInput]
    connect: [BundleTagWhereUniqueInput]
    disconnect: [BundleTagWhereUniqueInput]
  }
  input NestedBundleFeedCreateInput {
    create: [FeedCreateInput]
    connect: [FeedWhereUniqueInput]
  }
  input NestedBundleFeedUpdateInput {
    create: [FeedCreateInput]
    connect: [FeedWhereUniqueInput]
    disconnect: [FeedWhereUniqueInput]
  }
  input FeedTagWhereUniqueInput {
    id: Int
    name: String
  }
  input BundleTagWhereUniqueInput {
    id: Int
    name: String
  }
  input FeedWhereUniqueInput {
    id: Int
    url: String
  }
  input SavedArticleCreateInput {
    feed: NestedFeedCreateInput
    contents: JSON
    url: String
  }
  input NestedFeedCreateInput {
    connect: FeedWhereUniqueInput
  }
  input UserCreateInput {
    auth0: String
  }
  input LikeBundleInput {
    bundleId: Int
    likeState: Boolean
  }
  input LikeFeedInput {
    feedId: Int
    likeState: Boolean
  }
  input FindFeedTagsInput {
    search: String
  }
  input FindBundleTagsInput {
    search: String
  }
  input FindFeedsInput {
    search: String
  }
  input FeedInput {
    id: Int
  }
  input BundleInput {
    id: Int
  }
  input SavedArticleInput {
    url: String
  }
  input DeleteSavedArticleInput {
    id: Int
  }

  type Query {
    feed(data: FeedInput): Feed
    bundle(data: BundleInput): Bundle
    savedArticle(data: SavedArticleInput): SavedArticle
    feeds: [Feed]
    bundles: [Bundle]
    savedArticles: [SavedArticle]
    me: [User]
    feedTags: [FeedTag]
    bundleTags: [BundleTag]
    findFeedTags(data: FindFeedTagsInput): [FeedTag]
    findBundleTags(data: FindBundleTagsInput): [BundleTag]
    findFeeds(data: FindFeedsInput): [Feed]
  }
  type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
    createSavedArticle(data: SavedArticleCreateInput): SavedArticle
    createUser(data: UserCreateInput): User
    likeBundle(data: LikeBundleInput): Bundle
    likeFeed(data: LikeFeedInput): Feed
    deleteBundle(data: BundleInput): Bundle
    deleteFeed(data: FeedInput): Feed
    deleteSavedArticle(data: DeleteSavedArticleInput): SavedArticle
    updateBundle(data: BundleUpdateInput): Bundle
    updateFeed(data: FeedUpdateInput): Feed
  }
`;
