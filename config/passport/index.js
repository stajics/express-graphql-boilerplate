const passport = require('passport');

const localLoginStrategy = require('./localLoginStrategy.passport');
const googleStrategy = require('./googleStrategy.passport');

passport.use('local-login', localLoginStrategy);
passport.use('google', googleStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});
