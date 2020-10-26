import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { makeExecutableSchema } from 'graphql-tools';

import { context } from '../../utils/api/context';
import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from '../../utils/api/permissions';
import { log } from '../../utils/api/log';

const cors = Cors();

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), permissions, log);

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = new ApolloServer({
  schema,
  context,
}).createHandler({
  path: '/api/graphql',
});

export default cors((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.status(200).send();
  } else {
    return handler(req, res);
  }
});
