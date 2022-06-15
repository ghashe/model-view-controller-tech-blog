// Importing important parts of sequelize library
const { Model, DataTypes, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Comment extends Model {}

Comment.init(
  {
    // define columns

    // Defining id column
    id: {
      // These two define the comment id as an integer value that cannot be null, otherwise it will be rejected
      type: DataTypes.INTEGER,
      allowNull: false,

      // Two of these define the comment id as a unique identifier that is automatically generated, incremented, and inserted
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      // These two define the user id as an integer value that cannot be null, otherwise it will be rejected
      type: DataTypes.INTEGER,
      allowNull: false,

      // This defines a foreign key that references to the user id
      refference: {
        model: "user",
        key: "id",
      },
    },

    post_id: {
      // These two define the user id as an integer value that cannot be null, otherwise it will be rejected
      type: DataTypes.INTEGER,
      allowNull: false,

      // This defines a foreign key that references to the post id
      refference: {
        model: "post",
        key: "id",
      },
    },

    comment_text: {
      // These two define the comment text type as a string value that cannot be null, otherwise it will be accepted
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);
module.exports = Comment;
