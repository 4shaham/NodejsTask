import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

const UserProjects = sequelize.define("UserProjects", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Projects",
      key: "id",
    },
  },
},{
  tableName: "user_projects",
  timestamps: false, // This table doesn't need createdAt/updatedAt
});

export default UserProjects;
