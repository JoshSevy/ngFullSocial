"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `
  type Query {
    message: String!
  }
`;
const resolvers = {
    Query: {
        message: () => 'It works!',
    },
};
const config = {
    typeDefs,
    resolvers,
};
async function startApolloServer(config) {
    const PORT = 8080;
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer(config);
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
startApolloServer(config);
