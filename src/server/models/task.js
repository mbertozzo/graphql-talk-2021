module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    'task',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.TEXT,
    },
    {
      freezeTableName: true,
    },
  );

  Task.associate = (models) => {
    Task.belongsTo(models.column);
  };

  return Task;
};
