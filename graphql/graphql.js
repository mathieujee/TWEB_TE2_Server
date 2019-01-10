const { buildSchema } = require('graphql');
const { UserModel, ObjectId, MovieModel } = require('../database/database');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

    type User {
        id: String!
        username: String!
        password: String!
        watchlist: [String]
    }

    type Movie {
      vote_count: Int
      video: Boolean
      vote_average: Float
      title: String!
      popularity: Float
      poster_path: String
      original_language: String
      original_title: String
      backdrop_path: String
      adult: Boolean
      overview: String
      release_date: String
      tmdb_id: String!
      genres: [String]
    }

    type Query {
        createUser(username: String!, password: String!): User
        getMovieByTitle(title: String!): Movie
        getAllMovies: [Movie] 
        getPageMovies(page: Int!, numberPerPage: Int!, offset: Int!): [Movie]
        addMovieToWatchlist(username: String!, movieTitle: String!): User
    }

`);

// The root provides a resolver function for each API endpoint
const root = {
  createUser: ({ username, password }) => new Promise((resolve) => {
    const newUser = new UserModel({ username, password });
    UserModel.findOne({ username }, { password: 0 }).then((data) => {
      if (data === null) {
        newUser.save()
          .then((data) => {
            newUser.password = null;
            resolve(newUser);
          })
          .catch((err) => {
            resolve(err);
          });
      } else {
        resolve(null);
      }
    });
  }),
  getMovieByTitle: ({ title }) => new Promise((resolve) => {
    MovieModel.findOne({ title })
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(err);
      });
  }),
  getAllMovies: () => new Promise((resolve) => {
    MovieModel.find()
      .then((data) => {
        resolve(data);
      })
      .catch((err) => {
        resolve(err);
      });
  }),
  // pagination
  getPageMovies: ({ page, numberPerPage, offset }) => Promise((resolve) => {
    MovieModel.find()
      .then((data) => {
        if (data.length === undefined || data.length === 0) {
          resolve([]);
        }
        resolve(data.slice(offset, page * numberPerPage));
      })
      .catch((err) => {
        resolve(err);
      });
  }),
  addMovieToWatchlist: ({ username, movieTitle }) => Promise((resolve) => {
    const promises = [];
    promises.push(
      UserModel.update({ username: username }, { $addToSet: { watchlist: movieTitle } }),
    );
    Promise.all(promises)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        resolve(err);
      });
  }),
};

module.exports = { schema, root };
