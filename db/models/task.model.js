const { Model, DataTypes, Sequelize } = require('sequelize')

const TASK_NAME = 'tasks'

const TaskSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  scrapedDate: {
    field: 'scraped_date',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}

class Task extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: TASK_NAME,
      modelName: 'Task',
      timestamps: false,
    }
  }
}

module.exports = { Task, TaskSchema, TASK_NAME }
