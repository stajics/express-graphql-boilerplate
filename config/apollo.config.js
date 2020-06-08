const { ApolloServer } = require('apollo-server-express');

const { typeDefs, resolvers, dataSources } = require('../server/schema');

const server = new ApolloServer({ typeDefs, resolvers, dataSources });

module.exports = server;
