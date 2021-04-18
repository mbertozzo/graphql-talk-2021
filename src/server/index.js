const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const os = require('os');

const faker = require('faker');
const times = require('lodash').times;
const random = require('lodash').random;

const typeDefs = require('./gql/schema');
const resolvers = require('./gql/resolvers');

const db = require('./models');

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: { db },
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
  .sync({ force: true })
  .then(() => {
    // populate category table with dummy data
    db.category.bulkCreate(
      times(10, () => ({
        name: faker.random.word(),
        description: faker.lorem.paragraph(),
        category: random(1, 10),
      })),
    );

    // populate task table with dummy data
    db.task.bulkCreate(
      times(10, () => ({
        title: faker.lorem.sentence(),
        description: faker.lorem.paragraph(),
        categoryId: random(1, 10),
      })),
    );

    app.listen(process.env.PORT || 8080, () =>
      console.log(
        `🚀 Server is running at http://localhost:${process.env.PORT || 8080}`,
      ),
    );
  })
  .catch((e) => {
    console.log(
      `\n\n🔴 An error occurred while connecting to the database: ${e.message}\n`,
    );
  });
