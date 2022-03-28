require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const ts = require('./outputSchema.ts');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const PORT = 5000;
server.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
