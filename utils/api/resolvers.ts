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
  SavedArticle: {
    ...createFieldResolver('savedArticle', 'author'),
  },
  BundleTag: {
    ...createFieldResolver('bundleTag', 'bundles'),
  },
  FeedTag: {
    ...createFieldResolver('feedTag', 'feeds'),
  },
  Query: {
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    // need to only return public and private by the current user
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    //need to only return those by current user
    savedArticles: (parent, args, { prisma }) => prisma.savedArticle.findMany(),
    me: (parent, args, { prisma, user: { id } }) => prisma.user.findOne({ where: { id } }),
    feedTags: (parent, args, { prisma }) => prisma.feedTag.findMany(),
    bundleTags: (parent, args, { prisma }) => prisma.bundleTag.findMany(),
    findFeedTags: (parent, { data }, { prisma }) => prisma.feedTag.findMany({ where: { name: { contains: data.search } } }),
    findBundleTags: (parent, { data }, { prisma }) => prisma.bundleTag.findMany({ where: { name: { contains: data.search } } }),
  },
  Mutation: {
    createFeed: async (parent, { data }, { prisma, user }) => {
      console.log(data);
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.feed.create({ data: { ...data, ...author } });
      console.log('result');
      console.log(result);
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      console.log(JSON.stringify(data));
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.bundle.create({
        data: { ...data, ...author },
      });
      console.log('result');
      console.log(result);
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
  },
};
