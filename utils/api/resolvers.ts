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
  Feed: {
    ...createFieldResolver('feed', 'author'),
    ...createFieldResolver('feed', 'bundles'),
    ...createFieldResolver('feed', 'likes'),
    ...createFieldResolver('feed', 'tags'),
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
  Query: {
    hello: (parent, args, context) => `hi!`,
    feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findOne({ where: { id } }),
    bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findOne({ where: { id } }),
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    feedTags: (parent, args, { prisma }) => prisma.feedTag.findMany(),
    bundleTags: (parent, args, { prisma }) => prisma.bundleTag.findMany(),
    findFeedTags: (parent, { data }, { prisma }) => prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
    findBundleTags: (parent, { data }, { prisma }) => prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
    findFeeds: (parent, { data }, { prisma }) => prisma.feed.findMany({ where: { name: { contains: data.search } } }),
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
      const feed = await prisma.feed.findOne({ where: { id }, include: { author: true } });
      await verifyOwnership(feed, user);
      return prisma.feed.update({ where: { id }, data: { ...feedUpdate } });
    },
    updateBundle: async (parent, { data: { id, ...bundleUpdate } }, { prisma, user }) => {
      const bundle = await prisma.bundle.findOne({ where: { id }, include: { author: true } });
      await verifyOwnership(bundle, user);
      return prisma.bundle.update({ where: { id }, data: { ...bundleUpdate } });
    },
  },
};
