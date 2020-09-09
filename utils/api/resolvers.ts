export const resolvers = {
  Feed: {
    bundles: async ({ id }, args, context) => {
      const { bundles } = await context.prisma.feed.findOne({ where: { id }, include: { bundles: true } });
      return bundles;
    },
    likes: async ({ id }, args, context) => {
      const { likes } = await context.prisma.feed.findOne({ where: { id }, include: { likes: true } });
      return likes;
    },
    tags: async ({ id }, args, context) => {
      const { tags } = await context.prisma.feed.findOne({ where: { id }, include: { tags: true } });
      return tags;
    },
  },
  Bundle: {
    feeds: async ({ id }, args, context) => {
      const { feeds } = await context.prisma.bundle.findOne({ where: { id }, include: { feeds: true } });
      return feeds;
    },
    likes: async ({ id }, args, context) => {
      const { likes } = await context.prisma.bundle.findOne({ where: { id }, include: { likes: true } });
      return likes;
    },
    tags: async ({ id }, args, context) => {
      const { tags } = await context.prisma.bundle.findOne({ where: { id }, include: { tags: true } });
      return tags;
    },
  },
  Query: {
    feeds: (parent, args, context) => context.prisma.feed.findMany(),
    // need to only return public and private by the current user
    bundles: (parent, args, context) => context.prisma.bundle.findMany(),
    //need to only return those by current user
    savedArticles: (parent, args, context) => context.prisma.savedArticle.findMany(),
    // hardcoding auth0 user return
    me: (parent, args, context) => context.prisma.user.findOne({ where: { auth0: '1' } }),
  },
  Mutation: {
    createFeed: async (parent, { data }, context) => {
      console.log(data);
      const result = await context.prisma.feed.create({ data });
      console.log('result');
      console.log(result);
      return result;
    },
    createBundle: async (parent, { data }, context) => {
      console.log(data);
      const result = await context.prisma.bundle.create({ data });
      console.log('result');
      console.log(result);
      return result;
    },
    createSavedArticle: (parent, { data }, context) => context.prisma.savedArticle.create({ data }),
    createUser: (parent, { data }, context) => context.prisma.user.create({ data }),
  },
};
