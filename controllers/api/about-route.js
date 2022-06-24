const router = require("express").Router();
const { About } = require("../../models");
const sequelize = require("../../config/connections");

// The `/api/about` endpoint

// get about
router.get("/", (request, response) => {
  About.findAll({
    attributes: ["title", "about_content"],
  })
    .then((dbAboutData) => {
      if (!dbAboutData) {
        // Sending a status 400 message to the user if post with the given id is not found
        response
          .status(400)
          .json(
            `Sorry, About has been found! Please check your input and try again!`
          );

        // Sending the post to the user if post with the given id is found
        return;
      }

      // Converting data to json format
      response.json(dbAboutData);
    })
    // Sending a status 500 to the user if the server encountered an unexpected condition that prevented it from fulfilling the request.
    .catch((err) => {
      console.log(err);
      response.status(500).json(err);
    });
});

module.exports = router;
