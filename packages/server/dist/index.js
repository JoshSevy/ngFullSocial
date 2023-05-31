"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const mock_1 = require("./mocks/mock");
const schema_1 = __importDefault(require("./graphql/schema"));
async function startApolloServer() {
    const PORT = 8080;
    const app = (0, express_1.default)();
    const server = new apollo_server_express_1.ApolloServer({ schema: schema_1.default, mocks: mock_1.mockData, mockEntireSchema: false });
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
