import cors from 'cors';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { mockData } from './mocks/mock';
import schema from './graphql/schema';

async function startApolloServer() {
  const PORT = 8080;
  const app: Application = express();
  app.use(cors());
  const server: ApolloServer = new ApolloServer({ schema, mocks: mockData, mockEntireSchema: false });
  await server.start();
  server.applyMiddleware({
    app,
    path: `/graphql`,
  });
  app.listen(PORT, () => {
    console.log(`Server is running at
    http://localhost:${PORT}`);
  });
}
startApolloServer();
