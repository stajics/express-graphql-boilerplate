const { gql } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const Friendship = require('mongoose').model('Friendship');
const createUser = require('./mutations/createUser.mutation');
const login = require('./mutations/login.mutation');
const sendFriendshipRequest = require('./mutations/sendFriendshipRequest.mutation');
const UsersAPI = require('./datasources/users.api');
const FriendshipsAPI = require('./datasources/friendships.api');
const { AuthDirective } = require('./directives/auth.directive');
const config = require('../../config');

const userQueryResolver = require('./queries/user.query');
const meQueryResolver = require('./queries/me.query');
const friendshipQueryResolver = require('./queries/friendship.query');

const typeDefs = gql`
  enum Role {
    ADMIN
    USER
  }

  enum FriendshipStatus {
    ACCEPTED
    PENDING
  }

  directive @auth(requires: Role = ADMIN) on OBJECT | FIELD_DEFINITION

  type User @auth(requires: USER) {
    _id: ID
    email: String
    firstName: String
    lastName: String
    role: Role @auth
  }

  type AuthUser {
    _id: ID
    token: String
    email: String
    firstName: String
    lastName: String
    role: Role
  }

  type Friendship {
    _id: ID
    from: User
    to: User
    status: FriendshipStatus
  }

  type Query @auth(requires: USER) {
    me: AuthUser
    user(_id: ID!): User
    friendship(_id: ID!): Friendship
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

    sendFriendshipRequest(to: ID!): Friendship @auth(requires: USER)
  }
`;

const resolvers = {
  Query: {
    user: userQueryResolver,
    me: meQueryResolver,
    friendship: friendshipQueryResolver,
  },
  User: userQueryResolver,
  Friendship: {
    from: userQueryResolver,
    to: userQueryResolver,
  },
  Mutation: {
    createUser,
    login,
    sendFriendshipRequest,
  },
};

const directives = {
  auth: AuthDirective,
};

const context = async ({ req }) => {
  if (req && req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, config.JWT_SECRET_KEY);

    const userId = decoded.sub;
    const user = await User.findById(userId);

    // add the user to the context
    return { user };
  }
  return {};
};

const store = {
  User,
  Friendship,
};

module.exports.typeDefs = typeDefs;
module.exports.resolvers = resolvers;
module.exports.directives = directives;
module.exports.context = context;
module.exports.dataSources = () => ({
  usersAPI: new UsersAPI({ store }),
  friendshipsAPI: new FriendshipsAPI({ store }),
});
