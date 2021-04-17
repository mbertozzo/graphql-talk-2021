const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const os = require('os');

const typeDefs = `
  type Query {
    getUsername: String
  }
`;

const resolvers = {
  Query: {
    getUsername: () => os.userInfo().username,
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
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
