import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import casual from 'casual';
import cors from 'cors';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const AppDataSource: DataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'dbuser',
  password: 'p4ssw0rd',
  database: 'socialdb',
  synchronize: true,
  logging: true,
  entities: ['src/entity/**/*.ts'],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
});

let postsIds: string[] = [];
let usersIds: string[] = [];

const mocks = {
  User: () => ({
    id: () => {
      let uuid = casual.uuid;
      usersIds.push(uuid);
      return uuid;
    },
    fullName: casual.full_name,
    bio: casual.text,
    email: casual.email,
    username: casual.username,
    password: casual.password,
    image: 'https://picsum.photos/seed/picsum/200/300',
    coverImage: 'https://picsum.photos/seed/picsum/200/300',
    postsCount: () => casual.integer(0),
  }),
  Post: () => ({
    id: () => {
      let uuid = casual.uuid;
      postsIds.push(uuid);
      return uuid;
    },
    author: casual.random_element(usersIds),
    text: casual.text,
    image: 'https://picsum.photos/seed/picsum/200/300',
    commentsCount: () => casual.integer(0),
    likesCount: () => casual.integer(0),
    latestLike: casual.first_name,
    createdAt: () => casual.date(),
  }),
  Comment: () => ({
    id: casual.uuid,
    author: casual.random_element(usersIds),
    comment: casual.text,
    post: casual.random_element(postsIds),
    createAt: () => casual.date(),
  }),
  Like: () => ({
    id: casual.uuid,
    user: casual.random_element(usersIds),
    post: casual.random_element(postsIds),
  }),
  Query: () => ({
    getPostsByUserId: () => [...new Array(casual.integer(10, 100))],
    getFeed: () => [...new Array(casual.integer(10, 100))],
    getNotificationsByUserId: () => [...new Array(casual.integer(10, 100))],
    getCommentsByPostId: () => [...new Array(casual.integer(10, 100))],
    getLikesByPostId: () => [...new Array(casual.integer(10, 100))],
    searchUsers: () => [...new Array(casual.integer(10, 100))],
  }),
};

AppDataSource.initialize()
  .then(() => {
    startApolloServer();
  })
  .catch((error) => console.log('Database connection error: ', error));

async function startApolloServer() {
  const PORT = 8080;
  const app: Application = express();
  app.use(cors());
  const server: ApolloServer = new ApolloServer({ schema });
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  app.listen(PORT, () => {
    console.log(`Server is running at
                          http:localhost:${PORT}`);
  });
}
