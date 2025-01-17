import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db";
import userEntity from "../../entity/userEntity";

// Define creation attributes (Optional fields when creating a User, such as `id`)
interface UserCreationAttributes extends Optional<userEntity, "id"> {}

// Define the User model interface
interface UserInstance extends Model<userEntity, UserCreationAttributes>, userEntity {}

const User = sequelize.define<UserInstance>("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
  hooks: {
    beforeSave: (user) => {
      user.setDataValue('name', user.getDataValue('name').trim().toLowerCase());
      user.setDataValue('email', user.getDataValue('email').trim());
    },
  },
});

export default User;


