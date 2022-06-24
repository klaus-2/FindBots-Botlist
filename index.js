// Dependencies
const { Client, Collection } = require('discord.js'),
	{ botconfig } = require('./config'),
	bot = new Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_MESSAGES', 'GUILD_MESSAGE_REACTIONS', 'DIRECT_MESSAGES', 'GUILD_VOICE_STATES', 'GUILD_INVITES'] }),
	{ promisify } = require('util'),
	readdir = promisify(require('fs').readdir),
	path = require('path');

(async () => {
	bot.aliases = new Collection();
	bot.commands = new Collection();
	bot.interactions = new Collection();
	bot.cooldowns = new Collection();
	bot.config = require('./config');
	bot.mongoose = require('./database/mongoose');

	await loadCommands();
	await loadEvents();

	bot.login(botconfig.token).catch(e => bot.logger.error(e.message));
})();

async function loadCommands() {
	const commands = (await readdir('./bot/commands/')).filter((v, i, a) => a.indexOf(v) === i);

	for (const command of commands) {
		const cmd = new (require(`./bot/commands/${command}`))(bot);
		bot.commands.set(cmd.help.name, cmd);
		cmd.help.aliases.forEach((alias) => {
			bot.aliases.set(alias, cmd.help.name);
		});
	}
}

async function loadEvents() {
	const events = await readdir('./bot/events/');

	for (const file of events) {
		delete require.cache[file];
		const { name } = path.parse(file);
		const event = new (require(`./bot/events/${file}`))(bot, name);
		bot.on(name, (...args) => event.run(bot, ...args));
	}
}