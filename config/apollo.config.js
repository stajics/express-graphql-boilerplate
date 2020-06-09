const { ApolloServer } = require('apollo-server-express');
const {
  typeDefs,
  resolvers,
  directives,
  context,
  dataSources,
} = require('../server/schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context,
  schemaDirectives: directives,
});

module.exports = server;
