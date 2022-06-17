const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// The /api/users endpoint

// GET all users (GET /api/users)
router.get("/", (request, response) => {
  // Find all User objects in our User model with the .findAll() method
  User.findAll({
    attributes: { exclude: ["password"] },
  })
    .then((dbUserData) => response.json(dbUserData))
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// GET user by id (GET /api/users/id)
router.get("/:id", (request, response) => {
  User.findOne({
    attributes: { exclude: ["password"] },
    where: {
      id: request.params.id,
    },

    // Including associated Post and Comments data

    include: [
      // Including associated Post data
      {
        model: Post,
        attributes: ["id", "title", "post_content", "created_at"],
      },

      // Including associated Comments data
      {
        model: Comment,
        attributes: ["id", "comment_text", "created_at"],
        include: {
          model: Post,
          attributes: ["title"],
        },
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // Sending a status 400 message to the user if user with the given id is not found
        response.status(400).json({
          message: `Sorry, no user with id ${request.params.id} has been found! Please check your input and try again!`,
        });
        return;
      }

      // If a user with the given id is found, convert data to JSON format and send that user
      response.json(dbUserData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// Create new post (POST /api/users)
router.post("/", (request, response) => {
  User.create({
    username: request.body.username,
    email: request.body.email,
    password: request.body.password,
    twitter: request.body.twitter,
    github: request.body.github,
  }).then((dbPostData) => {
    request.session.save(() => {
      request.session.user_id = dbUserData.id;
      request.session.username = dbUserData.username;
      request.session.twitter = dbUserData.twitter;
      request.session.github = dbUserData.github;
      request.session.loggedIn = true;

      // Once a user has been successfully created, convert the data to JSON format and send it to the client
      response.json(dbPostData);
    });
  });
});

// LOGIN
router.post("/login", (request, response) => {
  User.findOne({
    where: {
      email: request.body.email,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      // Sending a status 400 message to the user if a user with the given id is not found
      response.status(400).json({
        message: `Sorry, no user with email ${request.body.email} has been found! Please check your input and try again!`,
      });
      return;
    }
    const validPassword = dbUserData.checkPassword(request.body.password);

    // Verify the password the user provided
    if (!validPassword) {
      // Sending a status 400 message to the user if the password  the user provided is incorrect.
      response.status(400).json({
        message:
          "Sorry, the password provided is invalid! Please check your input and try again!",
      });
      return;
    }
    request.session.save(() => {
      // Defining session variables
      request.session.user_id = dbUserData.id;
      request.session.username = dbUserData.username;
      request.session.twitter = dbUserData.twitter;
      request.session.github = dbUserData.github;
      request.session.loggedIn = true;

      response.json({
        user: dbPostData,
        message: "You have now successfully logged in!",
      });
    });
  });
});

// Logout
router.post("/logout", (request, response) => {
  if (request.session.loggedIn) {
    request.session.destroy(() => {
      response.status(204).end();
    });
  } else {
    response.status(404).end();
  }
});

// Update a post (PUT /api/users/id)
router.put("/:id", withAuth, (request, response) => {
  User.update(request.body, {
    individualHooks: true,
    where: {
      id: request.params.id,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData[0]) {
        // Sending a status 404 message to the user if a user with the given id is not found
        response.status(404).json({
          message: `Sorry, no user with id ${request.params.id} has been found! Please check your input and try again!`,
        });
        return;
      }

      // If a user with the given id is found, convert data to JSON format and send that user to the client
      response.json(dbUserData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// Delete a post (DELETE /api/users/id)
router.delete("/:id", withAuth, (request, response) => {
  User.destroy({
    where: {
      id: request.params.id,
    },
  })
    .then((dbUserData) => {
      // Sending a status 404 message to the user if a user with the given id is not found
      if (!dbUserData) {
        response.status(404).json({
          message: `Sorry, no user with id ${request.params.id} has been found! Please check your input and try again!`,
        });
        return;
      }
      // If a user with the given id is found, convert data to JSON format and send it to the user who has been deleted
      response.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

module.exports = router;
