import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./userModel";
import Project from "./projectModel";

// Define the junction table (many-to-many relationship)
const UserProjects = sequelize.define("UserProjects", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Users", // References the 'Users' table
      key: "id",
    },
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "Projects", // References the 'Projects' table
      key: "id",
    },
  },
}, {
  tableName: "user_projects", // Name of the junction table
  timestamps: false, // No need for timestamps in this table
});

// Define the associations
User.belongsToMany(Project, { through: UserProjects });
Project.belongsToMany(User, { through: UserProjects });

export default UserProjects;
