const express = require('express');
const { ApolloServer, UserInputError, gql } = require('apollo-server-express');

const os = require('os');

const users = require('./users');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
  }
  type Query {
    getUsername: String
    users: [User]
    user(id: ID!): User
  }
`;

const resolvers = {
  Query: {
    getUsername: () => os.userInfo().username,
    users: () => users,
    user: (parent, { id }, context, info) => {
      if (!id || Number.isNaN(parseInt(id, 10))) {
        throw new UserInputError(
          'Invalid argument value',
          /* We can enrich our error with whatever info we want,
             uncomment the following:
             , {
               pippo: 'ALOHA',
             }
          */
        );
      }

      return users.find((u) => {
        return u.id === parseInt(id, 10);
      });
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // formatError: error => {
  //   console.log(error);
  //   return new Error('Internal server error');
  // },
});

const app = express();

apolloServer.applyMiddleware({ app });

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) =>
  res.send({ username: os.userInfo().username }),
);

app.listen(process.env.PORT || 8080, () =>
  console.log(
    `🚀 Server is running at http://localhost:${process.env.PORT || 8080}`,
  ),
);
