const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/api", apiRoutes);
router.use("/posts", homeRoutes);
router.use("/comments", dashboardRoutes);

router.use((request, response) => {
  response.status(404).end();
});

module.exports = router;
