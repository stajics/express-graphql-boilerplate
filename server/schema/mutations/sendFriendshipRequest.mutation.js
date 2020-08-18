const sendFriendshipRequest = async (_, { to }, { dataSources, user }) => {
  let newFriendship = dataSources.friendshipsAPI.createFriendship({
    from: user._id,
    to,
  });
  newFriendship = await newFriendship.save();
  newFriendship = await newFriendship
    .populate('from')
    .populate('to')
    .execPopulate();
  return newFriendship.toResponse();
};

module.exports = sendFriendshipRequest;
