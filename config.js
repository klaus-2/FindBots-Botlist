module.exports = {
	botconfig: {
		ownerID: 'id', // your discord userID
		token: 'token', // your bot token | https://discord.com/developers/applications/yourBotID/bot
		MongoDBURL: 'mongodburl', // https://www.mongodb.com/
	},
   site: {
	   client_id: "id", // bot clientID
	   secret: "secret", // bot client secret for auth
	   description: "desc...", // Description for site metatags
	   domain: "https://domain", // domain with protocol without / (E.g. http://127.0.0.1)
	   port: "port", // port (E.g 80)
	   analitics: false, // For Dashboard analitcs -[Page views, geo]-
	   fakeData: true,
	   tags: ['Music', 'Fun', 'Economy', 'Anime', 'Game', 'Meme', 'Social', 'Leveling', 'Roleplay', 'Logging', 'Dashboard', 'Stream', 'Utility', 'Moderation', 'Crypto', 'Media', 'Customizable', 'Nsfw', 'Infantil', 'Game', 'Multipurpose', 'Multiple-Language', 'Slash Commands'],
   },
   server: {
	   id: "ID"
   },
   // API SETTINGS (For future)
   API: {
	   port: 'port',
	   token: 'token',
   },
};