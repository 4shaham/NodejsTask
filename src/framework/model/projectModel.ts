import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

import ProjectEntity from "../../entity/projectEntity";
import Task from "./taskModel";  // Make sure this import is correct


interface ProjectCreationAttributes extends Optional<ProjectEntity, "projectId"> {}

interface ProjectInstance
  extends Model<ProjectEntity, ProjectCreationAttributes>,
    ProjectEntity {}

const Project = sequelize.define<ProjectInstance>("Project", {
  projectId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
}, {
  tableName: "projects",
  timestamps: true,
});

// Project.hasMany(Task, {
//   foreignKey: "projectId",
//   as: "tasks",
// });

export default Project;
