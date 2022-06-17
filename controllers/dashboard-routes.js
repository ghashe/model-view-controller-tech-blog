const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connections");
const withAuth = require("../utils/auth");

router.get("/", withAuth, (request, response) => {
  Post.findAll({
    where: {
      // The ID from the session should be used
      user_id: request.session.user_id,
    },
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],
    // Including associated Comments and User data

    include: [
      // Including associated Comments data
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
      //  Ensure data is serialized before passing to the template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      response.render("dashboard", { posts, loggedIn: true });
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (request, response) => {
  Post.findAll({
    where: {
      id: request.params.id,
    },
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],

    // Including associated Comments and User data

    include: [
      // Including associated Comments data
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
        // Sending a status 404 message to the user if post with the given id is not found
        response.status(404).json({
          message: `Sorry, no post with id ${request.params.id} has been found! Please check your input and try again!`,
        });
        return;
      }
      //  Ensure data is serialized before passing to the template
      const post = dbPostData.get({ plain: true });

      response.render("edit-post", { post, loggedIn: true });
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.get("/create/", withAuth, (request, response) => {
  Post.findAll({
    where: {
      // The ID from the session should be used
      user_id: request.session.user_id,
    },
    attributes: ["id", "title", "created_at", "post_content"],
    order: [["created_at", "DESC"]],

    // Including associated Comment and User data

    include: [
      // Including associated Comment data
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
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
      ///  Ensure data is serialized before passing to the template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      response.render("create-post", { posts, loggedIn: true });
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});
module.exports = router;
