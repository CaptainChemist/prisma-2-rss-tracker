import { GraphQLJSONObject } from 'graphql-type-json';
import { verifyOwnership } from './verifyOwnership';

const createFieldResolver = (modelName, parName) => ({
  [parName]: async ({ id }, args, { prisma }) => {
    const modelResponse = await prisma[modelName].findOne({
      where: { id },
      include: { [parName]: true },
    });
    return modelResponse[parName];
  },
});

export const resolvers = {
  JSON: GraphQLJSONObject,
  Feed: {
    ...createFieldResolver('feed', 'author'),
    ...createFieldResolver('feed', 'bundles'),
    ...createFieldResolver('feed', 'likes'),
    ...createFieldResolver('feed', 'tags'),
    ...createFieldResolver('feed', 'savedArticles'),
  },
  Bundle: {
    ...createFieldResolver('bundle', 'author'),
    ...createFieldResolver('bundle', 'feeds'),
    ...createFieldResolver('bundle', 'likes'),
    ...createFieldResolver('bundle', 'tags'),
  },
  SavedArticle: {
    ...createFieldResolver('savedArticle', 'author'),
    ...createFieldResolver('savedArticle', 'feed'),
  },
  BundleTag: {
    ...createFieldResolver('bundleTag', 'bundles'),
  },
  FeedTag: {
    ...createFieldResolver('feedTag', 'feeds'),
  },
  Query: {
    feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findOne({ where: { id } }),
    bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findOne({ where: { id } }),
    savedArticle: (parent, { data: { url, id } }, { prisma }) => prisma.savedArticle.findOne({ where: { url, id} }),
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    savedArticles: (parent, args, { prisma, user:{id: authorId} }) =>  prisma.savedArticle.findMany({ where: { authorId: authorId? authorId: null }}),
    me: (parent, args, { prisma, user: { id } }) => prisma.user.findOne({ where: { id } }),
    feedTags: (parent, args, { prisma }) => prisma.feedTag.findMany(),
    bundleTags: (parent, args, { prisma }) => prisma.bundleTag.findMany(),
    findFeedTags: (parent, { data }, { prisma }) => prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
    findBundleTags: (parent, { data }, { prisma }) => prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
    findFeeds: (parent, { data }, { prisma }) => prisma.feed.findMany({ where: { name: { contains: data.search } } }),
  },
  Mutation: {
    createFeed: async (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.feed.create({ data: { ...data, ...author } });
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.bundle.create({
        data: { ...data, ...author },
      });
      return result;
    },
    createSavedArticle: (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      return prisma.savedArticle.create({ data: { ...data, ...author } });
    },
    likeBundle: (parent, { data }, { prisma, user }) => {
      const { bundleId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.bundle.update({
        where: { id: bundleId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
    likeFeed: (parent, { data }, { prisma, user }) => {
      const { feedId, likeState } = data;
      const connectState = likeState ? 'connect' : 'disconnect';
      return prisma.feed.update({
        where: { id: feedId },
        data: { likes: { [connectState]: { id: user.id } } },
      });
    },
    deleteBundle: async (parent, { data: { id } }, { prisma, user }) => {
      const bundle = await prisma.bundle.findOne({ where: { id }, include: { author: true, likes: true } });
      await verifyOwnership(bundle, user);
      await prisma.bundle.delete({ where: { id: bundle.id } });
      return bundle;
    },
    deleteFeed: async (parent, { data: { id } }, { prisma, user }) => {
      const feed = await prisma.feed.findOne({ where: { id }, include: { author: true, likes: true } });
      await verifyOwnership(feed, user);
      await prisma.feed.delete({ where: { id: feed.id } });
      return feed;
    },
    deleteSavedArticle: async (parent, { data: { id } }, { prisma, user }) => {
      const savedArticle = await prisma.savedArticle.findOne({ where: { id }, include: { author: true } });
      await verifyOwnership(savedArticle, user);
      return prisma.savedArticle.delete({ where: { id: savedArticle.id } });
    },
    updateFeed: async (parent, {data: {id, ...feedUpdate}}, {prisma, user}) => {
      const feed = await prisma.feed.findOne({ where: { id }, include: { author: true} });
      await verifyOwnership(feed, user);
      return prisma.feed.update({ where: {id}, data: {...feedUpdate}})

    },
    updateBundle: async (parent, {data: {id, ...bundleUpdate }}, {prisma, user}) => {
      const bundle = await prisma.bundle.findOne({ where: { id }, include: { author: true } });
      await verifyOwnership(bundle, user);
      return prisma.bundle.update({ where: {id}, data: {...bundleUpdate}})
    }
  },
};
