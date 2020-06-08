const { DataSource } = require('apollo-datasource');

class UsersAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  createUser({ email, password, firstName, lastName }) {
    const user = new this.store.User({ email, password, firstName, lastName });
    return user;
  }

  async findOne(id) {
    const user = await this.store.User.findOne({ _id: id });
    return user;
  }
}

module.exports = UsersAPI;
