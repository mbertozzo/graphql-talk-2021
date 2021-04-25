const { UserInputError } = require('apollo-server-express');
const os = require('os');

const users = require('../users');

const resolvers = {
  Column: {
    tasks: (parent, args, context, info) => parent.getTasks(),
  },
  Task: {
    column: (parent, args, context, info) => parent.getColumn(),
  },
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

      return users.find((u) => u.id === parseInt(id, 10));
    },
    tasks: (parent, args, { db }, info) => db.task.findAll(),
    columns: (parent, args, { db }, info) => db.column.findAll(),
  },
};

module.exports = resolvers;
