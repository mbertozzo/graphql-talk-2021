const taskMoveUp = (db, id, oldPos, newPos) => {
  return db.task
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
};

module.exports = taskMoveUp;
