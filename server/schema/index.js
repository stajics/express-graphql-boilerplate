const { gql } = require('apollo-server-express');
const createUser = require('./mutations/createUser.mutation');
const login = require('./mutations/login.mutation');
const UsersAPI = require('./datasources/users.api');

const typeDefs = gql`
  type User {
    id: ID
    email: String
    firstName: String
    lastName: String
  }

  type AuthUser {
    id: ID
    token: String
    email: String
    firstName: String
    lastName: String
  }

  type Query {
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
    ): AuthUser

    login(email: String!, password: String!): AuthUser
  }
`;

const resolvers = {
  Query: {
    user: async (parent, { id }, { dataSources }, info) => {
      const user = await dataSources.usersAPI.findOne(id);
      console.log(user);
      return user.toResponse();
    },
  },
  Mutation: {
    createUser,
    login,
  },
};

const store = {
  User: require('mongoose').model('User'),
};

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;
module.exports.dataSources = () => ({
  usersAPI: new UsersAPI({ store }),
});
