import { rule, shield } from 'graphql-shield';
import * as _ from 'lodash';

const rules = {
  isAuthenticated: rule()(async (_parent, _args, context) => {
    // console.log(context);
    console.log(_.isEmpty(context.user) ? false : true);
    return _.isEmpty(context.user) ? false : true;
  }),
  // not working yet
  // isOwner: rule()((_parent, _args, context) => {
  //   return context.user.auth0 ===
  // })
};

export const permissions = shield({
  Query: {
    feeds: rules.isAuthenticated,
  },
  Mutation: {
    createFeed: rules.isAuthenticated,
  },
});
