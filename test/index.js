const { createTestClient } = require('apollo-server-testing');
const mongoose = require('mongoose');
const { server, expressApp } = require('../index');
const db = require('./_testUtils/db');

jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

const { query, mutate } = createTestClient(server);

global.server = server;

global.query = query;
global.mutate = mutate;

global.jestTest = (testName, testFunc) => {
  test(testName, (done) => {
    logger.silly(
      '######################################################################################################################'
    );
    logger.silly(testName);
    logger.silly(
      '######################################################################################################################'
    );
    testFunc(done);
  });
};

beforeEach(async () => {
  await db.clear();
  await db.init();
  server.resetContext();
});

afterAll(async () => {
  await expressApp.close();
  await mongoose.disconnect();
});
