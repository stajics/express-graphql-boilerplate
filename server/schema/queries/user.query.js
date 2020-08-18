const userQueryResolver = async (parent, { _id }, { dataSources }, info) => {
  const user = await dataSources.usersAPI.findOne(
    (parent && parent.from) || _id
  );
  return user ? user.toResponse() : user;
};

module.exports = userQueryResolver;
