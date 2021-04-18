const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const os = require('os');

const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');

const db = require('./models');

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

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 8080, () =>
      console.log(
        `🚀 Server is running at http://localhost:${process.env.PORT || 8080}`,
      ),
    );
  })
  .catch((e) => {
    console.log(
      `\n\n🔴 An error occurred while connecting to the database: ${e.message}`,
    );
  });
