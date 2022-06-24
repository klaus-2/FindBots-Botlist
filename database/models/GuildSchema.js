const { Schema, model } = require('mongoose');

const guildSchema = Schema({
	guildID: String,
	guildName: String,
	prefix: String,
});

module.exports = model('guild', guildSchema);
