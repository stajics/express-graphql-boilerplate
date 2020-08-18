const googleAuthCallback = (req, res) => {
  res.setHeader('Cache-Control', 'private');
  res.cookie('authToken', req.user.token);
  res.redirect('/');
};

module.exports = {
  googleAuthCallback,
};
