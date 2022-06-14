const express = require("express");
const sequelize = require("./config/connections");

const app = express();
const PORT = process.env.PORT || 3001;

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App now listening on port ${PORT}!`));
});
