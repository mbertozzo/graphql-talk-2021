module.exports = (sequelize, DataTypes) => {
  const Column = sequelize.define(
    'column',
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
      position: DataTypes.INTEGER,
    },
    {
      freezeTableName: true,
    },
  );

  Column.associate = (models) => {
    Column.hasMany(models.task);
  };

  return Column;
};
