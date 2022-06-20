const sampleSeedPosts = require("./post-seeds");
const sampleSeedUsers = require("./user-seeds");
const sampleSeedComments = require("./comment-seeds");

const sequelize = require("../config/connections");

const seedAllSamples = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");

  await sampleSeedUsers();
  console.log("\n----- USERS SEEDED -----\n");

  await sampleSeedPosts();
  console.log("\n----- POSTS SEEDED -----\n");

  await sampleSeedComments();
  console.log("\n----- COMMENTS SEEDED -----\n");

  process.exit(0);
};

seedAllSamples();
