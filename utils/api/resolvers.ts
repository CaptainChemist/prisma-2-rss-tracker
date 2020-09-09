const createFieldResolver = (modelName, parName) => ({
  [parName]: async ({ id }, args, context) => {
    const modelResponse = await context.prisma[modelName].findOne({ where: { id }, include: { [parName]: true } });
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
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.feed.create({ data: { ...data, ...author } });
      console.log('result');
      console.log(result);
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      console.log(data);
      const author = { author: { connect: { id: user.id } } };
      const result = await prisma.bundle.create({ data: { ...data, ...author } });
      console.log('result');
      console.log(result);
      return result;
    },
    createSavedArticle: (parent, { data }, { prisma, user }) => {
      const author = { author: { connect: { id: user.id } } };
      return prisma.savedArticle.create({ data: { ...data, ...author } });
    },
  },
};
