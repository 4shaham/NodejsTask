import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";

import ProjectEntity from "../../entity/projectEntity";

interface ProjectCreationAttributes extends Optional<ProjectEntity, "id"> {}

interface ProjectInstance
  extends Model<ProjectEntity, ProjectCreationAttributes>,
    ProjectEntity {}    

const Project = sequelize.define<ProjectInstance>("Project",{
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

export default Project;
