import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from '../../utils/api/typeDefs';
import { resolvers } from '../../utils/api/resolvers';

const cors = Cors();

const schema = makeExecutableSchema({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = new ApolloServer({
  schema,
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
