import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
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
