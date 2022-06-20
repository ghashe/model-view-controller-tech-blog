// Importing important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");

// Create the Post model
class Post extends Model {}

Post.init(
  {
    // define columns

    // Defining id column
    id: {
      // These two define the post id as an integer value that cannot be null, otherwise it will be accepted
      type: DataTypes.INTEGER,
      allowNull: false,

      // Two of these define the post id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      // These two define the title as a string value that cannot be null, otherwise it will be inserted
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_content: {
      // These two define the post content as a text value that can be null
      type: DataTypes.TEXT,
      allowNull: true,
    },
    user_id: {
      // These one define the user id as an integer value
      type: DataTypes.INTEGER,

      // This one defines a foreign key that references to the user id
      refference: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
