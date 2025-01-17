import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

import Project from "./projectModel";  // Ensure this import is correct

interface TaskAttributes {
  taskId: number;
  title: string;
  status: string;
  projectId: number;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, "taskId"> {}

interface TaskInstance
  extends Model<TaskAttributes, TaskCreationAttributes>,
    TaskAttributes {}

const Task = sequelize.define<TaskInstance>("Task", {
  taskId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("To Do", "In Progress", "Done"),
    defaultValue: "To Do",
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "projects", 
      key: "projectId",
    },
  },
}, {
  tableName: "tasks",
  timestamps: true,
});

// Task.belongsTo(sequelize.models.Project, {
//   foreignKey: "projectId",
//    id: "project",
// });

// Task.hasOne(Project,{
//     sourceKey:'id',
//     foreignKey: 'projectId',
// })

export default Task;
