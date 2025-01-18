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
  role: {
    type: DataTypes.ENUM("owner", "member"),  // Define the role as either 'owner' or 'member'
    allowNull: false,
    defaultValue: "member",  // Default value for a user
  },
}) ;


// Define the associations with custom foreign keys
User.belongsToMany(Project, {
  through: UserProjects,
  foreignKey: "userId",  // Explicitly define the foreign key name for the User model
});

Project.belongsToMany(User, {
  through: UserProjects,
  foreignKey: "projectId",  // Explicitly define the foreign key name for the Project model
});


export default UserProjects