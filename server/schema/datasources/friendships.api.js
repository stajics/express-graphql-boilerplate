const { DataSource } = require('apollo-datasource');
const { FRIENDSHIP_STATUS } = require('../../models/Friendship.model');

class FriendshipsAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  createFriendship({ from, to }) {
    const friendship = new this.store.Friendship({
      from,
      to,
      status: FRIENDSHIP_STATUS.PENDING,
    });
    return friendship;
  }

  async findOne(id) {
    const friendship = await this.store.Friendship.findOne({ _id: id });
    return friendship;
  }
}

module.exports = FriendshipsAPI;
