const { isEmpty } = require('lodash');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const PassportLocalStrategy = require('passport-local').Strategy;
const { AuthenticationError } = require('apollo-server-express');
const config = require('..');

module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  },
  async (email, password, next) => {
    try {
      const userData = {
        email: email.trim(),
        password,
      };

      const user = await User.findOne({ email: userData.email });
      if (isEmpty(user)) {
        return next(new AuthenticationError('Invalid Credentials'));
      }

      const isMatch = await user.comparePassword(userData.password);
      if (!isMatch) {
        return next(new AuthenticationError('Invalid Credentials'));
      }

      const payload = {
        sub: user._id,
        timestamp: new Date().getTime(),
      };
      const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
        expiresIn: config.JWT_EXPIRES_IN,
      });

      return next(null, token, user);
    } catch (err) {
      next(err);
    }
  }
);
