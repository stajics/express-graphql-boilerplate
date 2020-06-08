const passport = require('passport');

const login = async (_, { email, password }) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('local-login', (err, token, user) => {
      if (err) return reject(err);

      const data = user.toResponse();
      data.token = token;

      resolve(data);
    })({ body: { email, password } });
  });
};

module.exports = login;
