import auth0 from './auth0';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  globalThis['prisma'] = globalThis['prisma'] || new PrismaClient();
  prisma = globalThis['prisma'];
  // Many thanks to kripod for this fix:
  // https://github.com/blitz-js/blitz/blob/canary/examples/tailwind/db/index.ts
}

export const context = async ({ req }) => {
  try {
    // const { user: auth0User } = await auth0.getSession(req);
    // Comment this out after the frontend is built
    const auth0User = { nickname: 'faker', sub: '1', picture: '/blank.png' };

    let user = await prisma.user.findOne({ where: { auth0: auth0User.sub } });

    if (!user) {
      const { picture, nickname, sub } = auth0User;
      user = await prisma.user.create({ data: { id: uuidv4(), auth0: sub, nickname, picture } });
    }

    return { user, prisma };
  } catch (e) {
    return { user: {}, prisma };
  }
};
