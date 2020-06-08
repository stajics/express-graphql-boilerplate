const jwt = require('jsonwebtoken');

const config = require('../../../config');

const createUser = async (_, args, { dataSources }) => {
  let newUser = dataSources.usersAPI.createUser(args);
  newUser = await newUser.save();

  const payload = {
    sub: newUser._id,
    timestamp: new Date().getTime(),
  };
  const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_EXPIRES_IN,
  });

  const data = newUser.toResponse();
  data.token = token;

  return data;
};

module.exports = createUser;
