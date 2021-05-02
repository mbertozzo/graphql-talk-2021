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
      taskId: {
        type: DataTypes.STRING,
        get() {
          return this.getDataValue('taskId').split(';');
        },
        set(val) {
          this.setDataValue('taskId', val.join(';'));
        },
      },
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
