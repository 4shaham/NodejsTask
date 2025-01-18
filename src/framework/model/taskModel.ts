import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

import Project from "./projectModel";  // Ensure this import is correct
import TaskEntity from "../../entity/taskEntity";



interface TaskCreationAttributes extends Optional<TaskEntity,"taskId"> {}

interface TaskInstance 
  extends Model<TaskEntity,TaskCreationAttributes>,
    TaskEntity{}

const Task = sequelize.define<TaskInstance>("Task",{
  taskId:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type:DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending","In Progress","Completed"),
    defaultValue: "pending",
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
