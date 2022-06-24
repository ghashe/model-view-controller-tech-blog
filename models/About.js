// Importing important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

// Create the Post model
class About extends Model {}

About.init(
  {
    title: {
      // These two define the title as a string value that cannot be null, otherwise it will be inserted
      type: DataTypes.STRING,
      allowNull: false,
    },
    about_content: {
      // These two define the post content as a text value that can be null
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "about",
  }
);

module.exports = About;
