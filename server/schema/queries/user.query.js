const userQueryResolver = async (parent, { id }, { dataSources }, info) => {
  const user = await dataSources.usersAPI.findOne(id);
  return user.toResponse();
}

module.exports = userQueryResolver;
