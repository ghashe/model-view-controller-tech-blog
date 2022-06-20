// Importing important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");
const bcrypt = require("bcrypt");

// Create the User model
class User extends Model {
  // Create a method for checking passwords with instance data (per user)
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Defining id column
User.init(
  {
    // define columns

    // Defining id column
    id: {
      // These two define the user id as an integer value that cannot be null, otherwise it will be accepted
      type: DataTypes.INTEGER,
      allowNull: false,

      // Two of these define the user id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      // These two define the username as a string value that cannot be null, otherwise it will be inserted
      type: DataTypes.STRING,
      allowNull: false,
    },
    twitter: {
      // These two define the twitter as a string value that can be null, which means it is optional
      type: DataTypes.STRING,
      allowNull: true,
    },
    github: {
      // These two define the github account as a string value that can be null, which means it is optional
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      // These two define the email address as a string value that cannot be null, otherwise it will be inserted
      type: DataTypes.STRING,
      allowNull: false,
      // These one defines the email address as should be unique, otherwise it will be inserted
      unique: true,
      // checks for email format (emai@sample.com)
      validate: {
        isEmail: true,
      },
    },

    password: {
      // These two define the password as a string value that cannot be null, otherwise it will be inserted
      type: DataTypes.STRING,
      allowNull: false,
      // only allow values with length between 4 and 50
      validate: {
        len: {
          args: [4, 50],
          msg: "The password length should be between 4 and 50 characters.",
        },
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      async beforeUpdate(updateedUserData) {
        updateedUserData.password = await bcrypt.hash(
          updateedUserData.password,
          10
        );
        return updateedUserData;
      },
    },

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
