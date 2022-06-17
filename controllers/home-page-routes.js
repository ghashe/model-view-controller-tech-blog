const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connections");
const withAuth = require("../utils/auth");

router.get("/", (request, response) => {
  Post.findAll({
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
      //  Ensure data is serialized before passing to the template
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      response.render("homepage", {
        posts,
        loggedIn: request.session.loggedIn,
      });
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

router.get("/login", (request, response) => {
  if (request.session.loggedIn) {
    response.redirect("/");
    return;
  }
  response.render("login");
});

router.get("/signup", (request, response) => {
  if (request.session.loggedIn) {
    response.redirect("/");
    return;
  }
  response.render("signup");
});

router.get("/post:id", (request, response) => {
  Post.findOne({
    where: {
      id: request.params.id,
    },
    attributes: ["id", "title", "created_at", "post_content"],

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
      if (!dbPostData) {
        // Sending a status 404 message to the user if post with the given id is not found
        response.status(404).json({
          message: `Sorry, no post with id ${request.params.id} has been found! Please check your input and try again!`,
        });
        return;
      }
      //  Ensure data is serialized before passing to the template
      const post = dbPostData.get({ plain: true });

      // Provide template with data
      response.render("single-post", {
        post,
        loggedIn: request.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

module.exports = router;
