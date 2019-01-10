const express = require('express');
const passport = require('passport');
const graphql = require('../graphql/graphql');

const router = express.Router();
const authenticated = () => passport.authenticate('jwt', { session: false });

router.get('/movies', (req, res) => {
  // graphql function getAllMovies()
  graphql.getAllMovies().then((data) => {
    res.send(data);
  });
});

router.get('/me', authenticated(), (req, res) => {
  const { password, ...user } = req.user; // remove password from the const 'user'
  res.send({ user });
});

module.exports = router;
