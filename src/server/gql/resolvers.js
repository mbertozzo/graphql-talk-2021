const { UserInputError } = require('apollo-server-express');
const os = require('os');

const users = require('../users');

const resolvers = {
  Column: {
    tasks: (parent, args, context, info) =>
      parent.getTasks({ order: [['position', 'ASC']] }),
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
  Mutation: {
    changePos: (parent, { type, id, oldPos, newPos }, { db }, info) => {
      if (oldPos < newPos) {
        /* Move down */
        db.task
          .decrement('position', {
            by: 1,
            where: {
              id: { [db.Sequelize.Op.gt]: 0 },
              position: {
                [db.Sequelize.Op.lte]: newPos,
                [db.Sequelize.Op.gte]: oldPos,
              },
            },
          })
          .then(() => {
            db.task.update({ position: newPos }, { where: { id: id } });
          });
      } else {
        /* Move up */
        db.task
          .increment('position', {
            by: 1,
            where: {
              id: { [db.Sequelize.Op.gt]: 0 },
              position: {
                [db.Sequelize.Op.lt]: oldPos,
                [db.Sequelize.Op.gte]: newPos,
              },
            },
          })
          .then(() => {
            db.task.update({ position: newPos }, { where: { id: id } });
          });
      }

      return 'ALOHA';
    },
  },
};

module.exports = resolvers;
