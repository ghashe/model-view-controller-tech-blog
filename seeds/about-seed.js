const { About } = require("../models");

const sampleAboutData = [
  {
    title: "About",
    about_content: "This App is made by Abyou",
  },
];

const seedSampleAbout = () => About.bulkCreate(sampleAboutData);

module.exports = seedSampleAbout;
