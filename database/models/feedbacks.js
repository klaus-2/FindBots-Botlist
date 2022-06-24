const { Schema, model } = require('mongoose');

const commentData = Schema({
    // Bot comment system w/ star evallute
    botID: { type: String, default: null },
    userID: { type: String, default: null },
    userName: { type: String, default: null },
    userTag: { type: String, default: null },
    comment: { type: String, default: null },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 },
    date: { type: Date, default: null },
    stars: { type: Number, default: 1 },
    // Bot Owner Reply
    botReply: {
        comment: { type: String, default: null },
        date: { type: Date, default: null },
        like: { type: Number, default: 0 },
        dislike: { type: Number, default: 0 },
    }
});

module.exports = model('feedbacks', commentData);
