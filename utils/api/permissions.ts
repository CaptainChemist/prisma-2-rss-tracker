import { rule, shield } from 'graphql-shield';
import * as _ from 'lodash';

const rules = {
  isAuthenticated: rule()(async (_parent, _args, context) => {
    return _.isEmpty(context.user) ? false : true;
  }),
  // not working yet
  // isOwner: rule()((_parent, _args, context) => {
  //   return context.user.auth0 ===
  // })
};

export const permissions = shield({
  Query: {},
  Mutation: {
    // createFeed: rules.isAuthenticated,
    // createBundle: rules.isAuthenticated,
    // likeBundle: rules.isAuthenticated,
    // likeFeed: rules.isAuthenticated,
  },
});
