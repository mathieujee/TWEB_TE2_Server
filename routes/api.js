const express = require('express');
const passport = require('passport');

const router = express.Router();
const authenticated = () => passport.authenticate('jwt', { session: false });

router.get('/movies', (req, res) => {
  res.send({ message: 'mooooovies' });
});

router.get('/me', authenticated(), (req, res) => {
  const { password, ...user } = req.user; // remove password from the const 'user'
  res.send({ user });
});

module.exports = router;
