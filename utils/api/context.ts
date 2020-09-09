import auth0 from './auth0';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const context = async ({ req }) => {
  try {
    const { user: auth0User } = await auth0.getSession(req);

    let user = await prisma.user.findOne({ where: { auth0: auth0User.sub } });

    if (!user) {
      const { picture, nickname, sub } = auth0User;
      user = await prisma.user.create({ data: { auth0: sub, nickname, picture } });
    }

    return { user, prisma };
  } catch (e) {
    return { user: {}, prisma };
  }
};
