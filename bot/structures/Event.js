const path = require('path');

class Event {
	constructor(bot, name, {
		dirname = false,
	}) {
		const category = (dirname ? dirname.split(path.sep)[parseInt(dirname.split(path.sep).length - 1, 10)] : 'Other');
		this.conf = { name, category };
	}

	async run(...args) {
		throw new Error(`Event: ${this.name} does not have a run method`);
	}
}

module.exports = Event;
