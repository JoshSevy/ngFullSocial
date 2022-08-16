import { IResolvers } from '@graphql-tools/utils';
import express, { Application } from 'express';
import { ApolloServer, Config, gql } from 'apollo-server-express';

const PORT = 8080;
const app: Application = express();
app.get('/', (req, res) => {
  res.send('Express is successfully running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const typeDefs: any = gql`
  type Query {
    message: String!
  }
`;

const reslovers: IResolvers = {
  Query: {
    message: () => 'It works!',
  },
};

const config: Config = {
  typeDefs: typeDefs,
  resolvers: reslovers,
};

async function startApolloServer(config: Config) {
  const PORT = 8080;
  const app: Application = express();
  const server: ApolloServer = new ApolloServer(config);
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startApolloServer(config);
