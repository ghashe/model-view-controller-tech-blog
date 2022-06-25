const { User } = require("../models");

const sampleUserData = [
  {
    username: "user_one",
    twitter: "user_one@twitter",
    github: "user_one@github",
    email: "user_one@gmail.com",
    password: "pass@user_one",
  },
  {
    username: "user_two",
    twitter: "user_two@twitter",
    github: "user_two@github",
    email: "user_two@gmail.com",
    password: "pass@user_two",
  },

  {
    username: "user_three",
    twitter: "user_three@twitter",
    github: "user_three@github",
    email: "user_three@gmail.com",
    password: "pass@user_three",
  },

  {
    username: "user_four",
    twitter: "user_four@twitter",
    github: " user_four@github",
    email: "user_four@gmail.com",
    password: "pass@user_four",
  },

  {
    username: "user_five",
    twitter: "user_five@twitter",
    github: " user_five@github",
    email: "user_five@gmail.com",
    password: "pass@user_five",
  },

  {
    username: "user_six",
    twitter: "user_six@twitter",
    github: " user_six@github",
    email: "user_six@gmail.com",
    password: "pass@user_six",
  },

  {
    username: "user_seven",
    twitter: "user_seven@twitter",
    github: " user_seven@github",
    email: "user_seven@gmail.com",
    password: "pass@user_seven",
  },
];

const seedSampleUsers = () => User.bulkCreate(sampleUserData);

module.exports = seedSampleUsers;
