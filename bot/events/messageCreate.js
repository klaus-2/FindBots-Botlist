const { GuildSchema } = require('../../database/models'),
	Event = require('../structures/Event');

class MessageCreate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	async run(bot, message) {

		if (message.author.bot) return;
		const settings = await GuildSchema.findOne({ guildID: message.guild.id });

		// Check if message was a command
		const args = message.content.split(/ +/);
		if ([settings.prefix, `<@!${bot.user.id}>`].find(p => message.content.startsWith(p))) {
			const command = args.shift().slice(settings.prefix.length).toLowerCase();
			let cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
			if (!cmd && message.content.startsWith(`<@!${bot.user.id}>`)) {
				// Check to see if user is using mention as prefix
				cmd = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));
				args.shift();
				if (!cmd) return;
			} else if (!cmd) {
				return;
			}
			message.args = args;

			// Run the command
			cmd.run(bot, message, settings);
		}
	}
}

module.exports = MessageCreate;
