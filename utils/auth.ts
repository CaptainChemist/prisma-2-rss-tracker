import auth0 from './auth0';

export const context = async ({ req }) => {
  try {
    const { user } = await auth0.getSession(req);
    console.log(user);
    return user;
  } catch (e) {
    console.log('not logged in');
    return {};
  }
};
