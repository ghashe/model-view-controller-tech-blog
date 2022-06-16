const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// The `/api/comments` endpoint

// get all comments
router.get("/", (request, response) => {
  Comment.findAll({})
    .then((dbCommentData) => response.json(dbCommentData))
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

// Create new comment
router.post("/", withAuth, (request, response) => {
  // Make sure the session is active
  if (request.session) {
    Comment.create({
      comment_text: request.body.comment_text,
      post_id: request.body.post_id,

      // Then we use the id that is generated from the session
      user_id: request.session.user_id,
    })
      .then((dbCommentData) => response.json(dbCommentData))
      .catch((err) => {
        console.log(err);
        response.status(400).json(err);
      });
  }
});

// Delete a comment
router.delete("/:id", withAuth, (request, response) => {
  Comment.destroy({
    where: {
      id: request.params.id,
    },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        response
          .status(400)
          .json(
            `Sorry, No comment with id ${request.params.id} has been found! Please check your input and try again!`
          );
        return;
      }
      response.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

module.exports = router;
