import { verifyOwnership } from './verifyOwnership';

const createFieldResolver = (modelName, parName) => ({
  [parName]: async ({ id }, args, { prisma }) => {
    const modelResponse = await prisma[modelName].findUnique({
      where: { id },
      include: { [parName]: true },
    });
    return modelResponse[parName];
  },
});

export const resolvers = {
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
  BundleTag: {
    ...createFieldResolver('bundleTag', 'bundles'),
  },
  FeedTag: {
    ...createFieldResolver('feedTag', 'feeds'),
  },
  SavedArticle: {
    ...createFieldResolver('savedArticle', 'author'),
    ...createFieldResolver('savedArticle', 'feed'),
  },
  Query: {
    hello: (parent, args, context) => `hi!`,
    feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findUnique({ where: { id } }),
    bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findUnique({ where: { id } }),
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    feedTags: (parent, args, { prisma }) => prisma.feedTag.findMany(),
    bundleTags: (parent, args, { prisma }) => prisma.bundleTag.findMany(),
    findFeedTags: (parent, { data }, { prisma }) => prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
    findBundleTags: (parent, { data }, { prisma }) => prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
    findFeeds: (parent, { data }, { prisma }) => prisma.feed.findMany({ where: { name: { contains: data.search } } }),
    savedArticle: async (parent, { data: { url } }, { prisma, user: { id: authorId } }) => {
      const result = await prisma.savedArticle.findMany({ where: { url, authorId } });
      return result[0];
    },
    savedArticles: (parent, args, { prisma, user: { id: authorId } }) =>
      prisma.savedArticle.findMany({ where: { authorId: authorId ? authorId : null } }),
    me: (parent, args, { prisma, user: { id } }) => prisma.user.findUnique({ where: { id } }),
  },
  Mutation: {
    clearAll: async (parent, args, { prisma }) => {
      await prisma.savedArticle.deleteMany();
      await prisma.bundle.deleteMany();
      await prisma.feed.deleteMany();
      await prisma.bundleTag.deleteMany();
      await prisma.feedTag.deleteMany();
      await prisma.user.deleteMany();
      return 'done!';
    },
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
    updateFeed: async (parent, { data: { id, ...feedUpdate } }, { prisma, user }) => {
      const feed = await prisma.feed.findUnique({ where: { id }, include: { author: true } });
      await verifyOwnership(feed, user);
      return prisma.feed.update({ where: { id }, data: { ...feedUpdate } });
    },
    updateBundle: async (parent, { data: { id, ...bundleUpdate } }, { prisma, user }) => {
      const bundle = await prisma.bundle.findUnique({ where: { id }, include: { author: true } });
      await verifyOwnership(bundle, user);
      return prisma.bundle.update({ where: { id }, data: { ...bundleUpdate } });
    },
    createSavedArticle: (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      return prisma.savedArticle.create({ data: { ...data, ...author } });
    },
    deleteBundle: async (parent, { data: { id } }, { prisma, user }) => {
      const bundle = await prisma.bundle.findUnique({ where: { id }, include: { author: true, likes: true } });
      await verifyOwnership(bundle, user);
      await prisma.bundle.delete({ where: { id: bundle.id } });
      return bundle;
    },
    deleteFeed: async (parent, { data: { id } }, { prisma, user }) => {
      const feed = await prisma.feed.findUnique({ where: { id }, include: { author: true, likes: true } });
      await verifyOwnership(feed, user);
      await prisma.feed.delete({ where: { id: feed.id } });
      return feed;
    },
    deleteSavedArticle: async (parent, { data: { id } }, { prisma, user }) => {
      const savedArticle = await prisma.savedArticle.findUnique({ where: { id }, include: { author: true } });
      await verifyOwnership(savedArticle, user);
      return prisma.savedArticle.delete({ where: { id: savedArticle.id } });
    },
  },
};
