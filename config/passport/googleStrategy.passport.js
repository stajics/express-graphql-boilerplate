const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
const { isEmpty } = require('lodash');
const config = require('..');

module.exports = new GoogleStrategy(
  {
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: config.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, next) => {
    try {
      const userData = {
        email: profile._json.email,
        firstName: profile._json.given_name,
        lastName: profile._json.family_name,
      };

      let user = await User.findOne({ email: userData.email });
      if (isEmpty(user)) {
        user = await User.create(userData);
      }

      const payload = {
        sub: user._id,
        timestamp: new Date().getTime(),
      };
      const token = jwt.sign(payload, config.JWT_SECRET_KEY, {
        expiresIn: config.JWT_EXPIRES_IN,
      });
      user.token = token;

      return next(null, user);
    } catch (err) {
      return next(err);
    }
  }
);
