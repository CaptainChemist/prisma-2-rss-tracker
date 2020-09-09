import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { context } from '../../utils/auth';
import { typeDefs } from '../../utils/typeDefs';
import { resolvers } from '../../utils/resolvers';

const cors = Cors();

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = new ApolloServer({
  typeDefs,
  resolvers,
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
