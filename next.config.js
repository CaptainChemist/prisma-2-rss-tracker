require('dotenv').config();

const {
  AUTH0_CLIENTID,
  AUTH0_DOMAIN,
  AUTH0_CLIENT_SECRET,
  AUTH0_SCOPE,
  AUTH0_REDIRECT_URI,
  AUTH0_POST_LOGOUT_REDIRECT_URI,
  AUTH0_COOKIE_SECRET,
  BACKEND_URL,
} = process.env;

module.exports = {
  publicRuntimeConfig: {
    BACKEND_URL,
  },
  serverRuntimeConfig: {
    auth: {
      domain: AUTH0_DOMAIN,
      clientId: AUTH0_CLIENTID,
      clientSecret: AUTH0_CLIENT_SECRET,
      scope: AUTH0_SCOPE,
      redirectUri: AUTH0_REDIRECT_URI,
      postLogoutRedirectUri: AUTH0_POST_LOGOUT_REDIRECT_URI,
    },
    cookieSecret: AUTH0_COOKIE_SECRET,
  },
};
