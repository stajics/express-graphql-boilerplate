const friendshipQueryResolver = async (parent, { _id }, { dataSources }, info) => {
  const friendship = await dataSources.friendshipsAPI.findOne(_id);
  return friendship.toResponse();
}

module.exports = friendshipQueryResolver;
