import fs from 'fs';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLSchema } from 'graphql';
import { gql } from 'apollo-server-express';

import resolvers from './resolvers';

const typeDefs: any = gql`
  ${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
