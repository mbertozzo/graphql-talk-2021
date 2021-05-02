const taskMoveDown = (db, id, oldPos, newPos) => {
  return db.task
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
};

module.exports = taskMoveDown;
