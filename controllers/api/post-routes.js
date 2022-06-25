const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const sequelize = require("../../config/connections");
const withAuth = require("../../utils/auth");

// The `/api/posts` endpoint

// get all posts
router.get("/", (request, response) => {
  Post.findAll({
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],
    // Including associated Comments and User data

    include: [
      // Including associated Comments data
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username", "twitter", "github"],
        },
      },
      // Including associated User data
      {
        model: User,
        attributes: ["username", "twitter", "github"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        // Sending a status 400 message to the user if post with the given id is not found
        response
          .status(400)
          .json(
            `Sorry, No post with id ${request.params.id} has been found! Please check your input and try again!`
          );

        // Sending the post to the user if post with the given id is found
        return;
      }

      // Converting data to json format
      response.json(dbPostData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// get post by id
router.get("/:id", (request, response) => {
  Post.findOne({
    where: {
      id: request.params.id,
    },
    attributes: ["id", "title", "created_at", "post_content"],
    // Including associated Comments and User data

    include: [
      // Including associated Comments data
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id"],
        include: {
          model: User,
          attributes: ["username", "twitter", "github"],
        },
      },
      // Including associated User data
      {
        model: User,
        attributes: ["username", "twitter", "github"],
      },
    ],
  })
    .then((dbPostData) => response.json(dbPostData))
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// Create new post
router.post("/", withAuth, (request, response) => {
  Post.create({
    title: request.body.title,
    post_content: request.body.post_content,
    user_id: request.session.user_id,
  })
    .then((dbPostData) => response.json(dbPostData))
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// Update a post
router.put("/:id", withAuth, (request, response) => {
  Post.update(
    {
      title: request.body.title,
      post_content: request.body.post_content,
    },
    {
      where: {
        id: request.params.id,
      },
    }
  )
    .then((dbPostData) => {
      if (!dbPostData) {
        // Sending a status 400 message to the user if post with the given id is not found
        response
          .status(400)
          .json(
            `Sorry, No post with id ${request.params.id} has been found! Please check your input and try again!`
          );

        // Sending the post to the user if post with the given id is found
        return;
      }

      // Converting data to json format
      response.json(dbPostData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// Delete a post
router.delete("/:id", withAuth, (request, response) => {
  Post.destroy({
    where: {
      id: request.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        response
          .status(400)
          .json(
            `Sorry, No post with id ${request.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      response.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

module.exports = router;
