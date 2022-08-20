"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const schema_1 = require("@graphql-tools/schema");
const apollo_server_express_1 = require("apollo-server-express");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs = (0, apollo_server_express_1.gql) `
  ${fs_1.default.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`;
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs, resolvers: resolvers_1.default });
exports.default = schema;
