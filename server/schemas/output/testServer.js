import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import * as ts from './outputSchema.ts';

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
