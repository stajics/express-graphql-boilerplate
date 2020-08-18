const express = require('express');

const authRoute = require('./auth.route');

module.exports = () => {
  const router = new express.Router();

  router.use('/auth', authRoute);

  router.get('/', (req, res) => res.send('Server running!'));

  return router;
};
