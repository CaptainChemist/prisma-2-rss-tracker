import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';

import { context } from '../../utils/api/context';
import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';
import { permissions } from '../../utils/api/permissions';

const cors = Cors();

const schema = applyMiddleware(makeExecutableSchema({ typeDefs, resolvers }), ...[permissions]);

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
