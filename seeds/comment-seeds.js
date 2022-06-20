const { Comment } = require("../models");

const sampleCommentData = [
  {
    user_id: 2,
    post_id: 3,
    comment_text: "This is really amazing!",
  },

  {
    user_id: 4,
    post_id: 3,
    comment_text: "What a news!",
  },
  {
    user_id: 1,
    post_id: 5,
    comment_text: "Thanks Heineken for the info!",
  },
  {
    user_id: 7,
    post_id: 5,
    comment_text: "How are get scammed!",
  },

  {
    user_id: 1,
    post_id: 5,
    comment_text: "How could they scam us?",
  },
  {
    user_id: 1,
    post_id: 9,
    comment_text: "Well done Nigeria!",
  },
  {
    user_id: 6,
    post_id: 9,
    comment_text:
      "These guidelines should be applied not only in Nigeria, but also in other countries too!!",
  },
  {
    user_id: 6,
    post_id: 9,
    comment_text:
      "These guidelines should be applied not only in Nigeria, but also in other countries too!!",
  },
  {
    user_id: 3,
    post_id: 9,
    comment_text: " That is not fair!!",
  },
];

const seedSampleComment = () => Comment.bulkCreate(sampleCommentData);

module.exports = seedSampleComment;
