const { gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const createUser = require('./mutations/createUser.mutation');
const login = require('./mutations/login.mutation');
const UsersAPI = require('./datasources/users.api');
const { AuthDirective } = require('./directives/auth.directive');
const config = require('../../config');

const typeDefs = gql`
  enum Role {
    ADMIN
    USER
  }

  directive @auth(
    requires: Role = ADMIN,
  ) on OBJECT | FIELD_DEFINITION

  type User @auth(requires: USER) {
    id: ID
    email: String
    firstName: String
    lastName: String
    role: Role @auth
  }

  type AuthUser {
    id: ID
    token: String
    email: String
    firstName: String
    lastName: String
    role: Role
  }

  type Query @auth(requires: USER) {
    user(id: ID!): User
  }

  type Mutation {
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      role: Role
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

const directives = {
  auth: AuthDirective,
};

const context = async ({ req }) => {
  if (req && req.headers.authorization) {
    const token =  req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    const userId = decoded.sub;
    const user = await User.findById(userId);

    // add the user to the context
    return { user };
  }
};

const store = {
  User: require('mongoose').model('User'),
};

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;
module.exports.directives = directives;
module.exports.context = context;
module.exports.dataSources = () => ({
  usersAPI: new UsersAPI({ store }),
});
