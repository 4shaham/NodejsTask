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
      model: User,  // Reference the 'User' model
      key: "id",  // Reference the 'id' column of the User model
    },
  },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Project,  // Reference the 'Project' model
      key: "id",  // Reference the 'id' column of the Project model
    },
  },
}, {
  tableName: "user_projects",  // Name of the junction table
  timestamps: false,  // No need for timestamps in this table
});

// Define the associations with custom foreign keys
User.belongsToMany(Project, {
  through: UserProjects,
  foreignKey: "userId",  // Explicitly define the foreign key name for the User model
});

Project.belongsToMany(User, {
  through: UserProjects,
  foreignKey: "projectId",  // Explicitly define the foreign key name for the Project model
});

export default UserProjects;
