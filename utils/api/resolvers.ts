export const resolvers = {
  Query: {
    hello: (parent, args, context) => `hi!`,
    feed: (parent, { data: { id } }, { prisma }) => prisma.feed.findOne({ where: { id } }),
    bundle: (parent, { data: { id } }, { prisma }) => prisma.bundle.findOne({ where: { id } }),
    feeds: (parent, args, { prisma }) => prisma.feed.findMany(),
    bundles: (parent, args, { prisma }) => prisma.bundle.findMany(),
  },
  Mutation: {
    createFeed: async (parent, { data }, { prisma, user }) => {
      const result = await prisma.feed.create({ data: { ...data } });
      return result;
    },
    createBundle: async (parent, { data }, { prisma, user }) => {
      const result = await prisma.bundle.create({
        data: { ...data },
      });
      return result;
    },
  },
};
