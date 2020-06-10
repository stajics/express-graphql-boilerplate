const { ApolloServer } = require('apollo-server-express');

class ApolloTestServer extends ApolloServer {
  constructor(config) {
    super(config);
    this.baseContext = config.context;
  }

  setContext(newContext) {
    this.context = newContext;
  }

  mergeContext(partialContext) {
    this.context = Object.assign({}, this.context, partialContext);
  }

  resetContext() {
    this.context = this.baseContext;
  }

  login(user) {
    this.context = {
      user
    };
  }
}

module.exports = ApolloTestServer;
