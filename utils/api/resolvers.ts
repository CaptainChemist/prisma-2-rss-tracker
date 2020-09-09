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
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    // need to only return public and private by the current user
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
    //need to only return those by current user
    savedArticles: (parent, args, { prisma }) => prisma.savedArticle.findMany(),
    // hardcoding auth0 user return
    me: (parent, args, { prisma, user: { id } }) => prisma.user.findOne({ where: { id } }),
  },
  Mutation: {
    createFeed: async (parent, { data }, { prisma, user }) => {
      console.log(data);
      const author = { author: user.id };
      const result = await prisma.feed.create({ data, ...author });
      console.log('result');
      console.log(result);
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      console.log(data);
      const author = { author: user.id };
      const result = await prisma.bundle.create({ data, ...author });
      console.log('result');
      console.log(result);
      return result;
    },
    createSavedArticle: (parent, { data }, { prisma, user }) => {
      const author = { author: user.id };
      return prisma.savedArticle.create({ data, author });
    },
  },
};
