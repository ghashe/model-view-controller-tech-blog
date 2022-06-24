const router = require("express").Router();

const homeRoutes = require("./home-page-routes");
const dashboardRoutes = require("./dashboard-routes");
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

router.use((request, response) => {
  response.status(404).end();
});

module.exports = router;
