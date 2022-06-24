const { Schema, model } = require('mongoose');

const votesData = Schema({
    // Base
    botID: { type: String, default: null },
    userID: { type: String, default: null },
    userName: { type: String, default: null },
    userTag: { type: String, default: null },
    userAvatar: { type: String, default: null },
    totalVotes: { type: Number, default: 0 },
});

module.exports = model('votesRank', votesData);
