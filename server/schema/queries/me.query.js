const userQueryResolver = async (parent, args, { dataSources, user }, info) => {
  const me = await dataSources.usersAPI.findOne(user.id);
  return me.toResponse();
}

module.exports = userQueryResolver;
