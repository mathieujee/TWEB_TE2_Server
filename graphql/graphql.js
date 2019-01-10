const { buildSchema } = require('graphql');
const { UserModel, ObjectId } = require('../database/database');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`

    type User {
        id: String!
        username: String!
        password: String!
    }

    type Query {
        createUser(username: String!, password: String!): User
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
};

module.exports = { schema, root };
