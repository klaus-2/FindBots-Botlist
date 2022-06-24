const Event = require('../structures/Event'),
	{ GuildSchema } = require('../../database/models');

class Ready extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
			once: true,
		});
	}

	async run(bot) {
		// Database
		bot.mongoose.init(bot);
		// Website
		require('../../site/base')(bot);
		// Ready log
		console.log(`Bot online on ${bot.guilds.cache.size} servers for ${bot.users.cache.size} users.`)
		// Create a new db for new guilds. (This method is simple and not recommended for "multiple servers". If you want, think of a method for the event => GuildCreate).
		for (const guild of [...bot.guilds.cache.values()]) {
			// Checks if the servers that the bot is on have a db created
			const db = await GuildSchema.findOne({ guildID: guild.id });
			if (!db) {
				const newDB = await GuildSchema.create({
					guildID: guild.id,
					guildName: guild.name,
					prefix: '!',
				});

				await newDB.save().catch(() => {
					// do nothing.
				});
			}
		}

		// Set the client user's presence
		bot.user.setPresence({ activities: [{ name: 'FindBots - A Botlist Open Source' }], status: 'dnd' }); // You can show online, idle....
	}
}

module.exports = Ready;
