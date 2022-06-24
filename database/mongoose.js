const mongoose = require('mongoose');

module.exports = {
	init: (bot) => {
		const dbOptions = {
			useNewUrlParser: true,
			autoIndex: false,
			connectTimeoutMS: 10000,
			family: 4,
			useUnifiedTopology: true,
		};
		mongoose.connect(bot.config.botconfig.MongoDBURL, dbOptions);
		mongoose.Promise = global.Promise;
		mongoose.connection.on('connected', () => {
			console.log('Mongoose successfully connected');
		});
		mongoose.connection.on('err', (err) => {
			console.log(`Mongoose has encountered an error: \n ${err.stack}`);
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose disconnected');
		});
	},
};
