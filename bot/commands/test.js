const Command = require('../structures/Command.js');

class test extends Command {
	constructor(bot) {
		super(bot, {
			name: 'test',
			ownerOnly: false,
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES'],
			description: 'test command.',
			usage: 'test',
			cooldown: 3000,
			examples: ['test'],
		});
	}
	async run(bot, message, settings) {
		message.channel.send('Hi :)')
	}
}

module.exports = test;
