import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server-micro';

const prisma = new PrismaClient();

const typeDefs = gql`
  type Feed {
    id: Int
    name: String
    url: String
    bundles: [Bundle]
    author: User
    tags: [FeedTag]
    likes: [User]
  }
  type Bundle {
    id: Int
    feeds: [Feed]
    author: User
    tags: [BundleTag]
    likes: [User]
  }
  type User {
    id: Int
    auth0: String
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
  }
  type BundleTag {
    id: Int
    name: String
    bundle: Bundle
  }
  type FeedTag {
    id: Int
    name: String
    feed: Feed
  }
  input FeedCreateInput {
    url: String
    name: String
    tags: NestedFeedTagCreateInput
  }
  input NestedFeedTagCreateInput {
    create: [FeedTagCreateInput]
    connect: [Int]
  }
  input FeedTagCreateInput {
    name: String
  }
  input BundleTagCreateInput {
    name: String
  }
  input BundleCreateInput {
    name: String
    tags: NestedBundleTagCreateInput
  }
  input NestedBundleTagCreateInput {
    create: [BundleTagCreateInput]
    connect: [Int]
  }
  input SavedArticleCreateInput {
    url: String
  }
  input UserCreateInput {
    auth0: String
  }

  type Query {
    feeds: [Feed]
    bundles: [Bundle]
    savedArticles: [SavedArticle]
    me: [User]
  }
  type Mutation {
    createFeed(data: FeedCreateInput): Feed
    createBundle(data: BundleCreateInput): Bundle
    createSavedArticle(data: SavedArticleCreateInput): SavedArticle
    createUser(data: UserCreateInput): User
  }
`;

const resolvers = {
  Feed: {
    bundles: async ({ id }, args, context) => {
      const { bundles } = await prisma.feed.findOne({ where: { id }, include: { bundles: true } });
      return bundles;
    },
    likes: async ({ id }, args, context) => {
      const { likes } = await prisma.feed.findOne({ where: { id }, include: { likes: true } });
      return likes;
    },
    tags: async ({ id }, args, context) => {
      const { tags } = await prisma.feed.findOne({ where: { id }, include: { tags: true } });
      return tags;
    },
  },
  Bundle: {
    feeds: async ({ id }, args, context) => {
      const { feeds } = await prisma.bundle.findOne({ where: { id }, include: { feeds: true } });
      return feeds;
    },
    likes: async ({ id }, args, context) => {
      const { likes } = await prisma.bundle.findOne({ where: { id }, include: { likes: true } });
      return likes;
    },
    tags: async ({ id }, args, context) => {
      const { tags } = await prisma.bundle.findOne({ where: { id }, include: { tags: true } });
      return tags;
    },
  },
  Query: {
    feeds: (parent, args, context) => prisma.feed.findMany(),
    // need to only return public and private by the current user
    bundles: (parent, args, context) => prisma.bundle.findMany(),
    //need to only return those by current user
    savedArticles: (parent, args, context) => prisma.savedArticle.findMany(),
    // hardcoding auth0 user return
    me: (parent, args, context) => prisma.user.findOne({ where: { auth0: '1' } }),
  },
  Mutation: {
    createFeed: async (parent, { data }, context) => {
      console.log(data);
      const result = await prisma.feed.create({ data });
      console.log('result');
      console.log(result);
      return result;
    },
    createBundle: async (parent, { data }, context) => {
      console.log(data);
      const result = await prisma.bundle.create({ data });
      console.log('result');
      console.log(result);
      return result;
    },
    createSavedArticle: (parent, { data }, context) => prisma.savedArticle.create({ data }),
    createUser: (parent, { data }, context) => prisma.user.create({ data }),
  },
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({ typeDefs, resolvers }).createHandler({
  path: '/api/graphql',
});
