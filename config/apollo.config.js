const { ApolloServer } = require('apollo-server-express');
const ApolloTestServer = require('../test/_testUtils/ApolloTestServer');
const {
  typeDefs,
  resolvers,
  directives,
  context,
  dataSources,
} = require('../server/schema');

const serverConfig = {
  typeDefs,
  resolvers,
  dataSources,
  context,
  schemaDirectives: directives,
};

const server = process.env.NODE_ENV === 'test' ? new ApolloTestServer(serverConfig) : new ApolloServer(serverConfig);

module.exports = server;
