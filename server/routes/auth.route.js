const express = require('express');
const passport = require('passport');

const { googleAuthCallback } = require('../controllers/socialAuth.controller');

const router = new express.Router();

router.route('/google').get(
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router
  .route('/google/callback')
  .get(
    passport.authenticate('google', { failureRedirect: '/login' }),
    googleAuthCallback
  );

module.exports = router;
