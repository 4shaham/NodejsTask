import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import TaskEntity from "../../entity/taskEntity";

interface TaskCreationAttributes extends Optional<TaskEntity, "id"> {}

interface TaskInstance
  extends Model<TaskEntity, TaskCreationAttributes>,
    TaskEntity {}

const Task = sequelize.define<TaskInstance>("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM("To Do", "In Progress", "Done"),
    allowNull: false,
    defaultValue: "To Do",
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Projects",
      key: "id",
    },
  },
}, {
  tableName: "tasks",
  timestamps: true,
});

export default Task;
