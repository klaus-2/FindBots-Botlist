const request = require('request'),
    { botconfig, server } = require("../../config.js");

async function getData(id) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${botconfig.token}`
        };
        request.get(
            `https://discord.com/api/guilds/${server.id}/members/${id}`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getUser(id) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${botconfig.token}`
        };
        request.get(
            `https://discord.com/api/users/${id}`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

async function getGuild(id) {
    return new Promise((resolve, reject) => {
        var headers = {
            'Authorization': `Bot ${botconfig.token}`
        };
        request.get(
            `https://discord.com/api/guilds/${id}`, { headers: headers },
            (error, res, body) => {
                if (error) {
                    return console.error(error)
                }
                try {
                    resolve(JSON.parse(body));
                } catch (e) {
                    reject(e)
                }
            }
        )
    });
}

module.exports = { getData, getUser, getGuild };