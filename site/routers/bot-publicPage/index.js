const app = require('express').Router(),
    { DataSchema, voteSchema, feedbackSchema } = require('../../../database/models/index'),
    discordAPI = require('../../helpers/discordAPI.js'),
    { site } = require('../../../config'),
    markdown = require('markdown-it')({
        html: true,        // Enable HTML tags in source
        xhtmlOut: false,        // Use '/' to close single tags (<br />).
        // This is only for full CommonMark compatibility.
        breaks: true,        // Convert '\n' in paragraphs into <br>
        langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
        // useful for external highlighters.
        linkify: false,        // Autoconvert URL-like text to links

        // Enable some language-neutral replacement + quotes beautification
        // For the full list of replacements, see https://github.com/markdown-it/markdown-it/blob/master/lib/rules_core/replacements.js
        typographer: false,

        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '“”‘’',

        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externally.
        // If result starts with <pre... internal wrapper is skipped.
        highlight: function (/*str, lang*/) { return ''; }
    }),
    moment = require('moment'),
    fetch = require('node-fetch');

// currently returning to homepage, need to fix the problem of "many redirects" later
const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
}

app.get("/bot/:botID", async (req, res) => {

    let dbBot = await DataSchema.findOne({ botID: req.params.botID });
    if (!dbBot) return res.redirect("/403?error=You entered an invalid bot id.");

    if (dbBot.status == 'waiting for verification') {
        return res.redirect("/403?error=bot-awaiting-approval.");
    } else {

        const dbRank = await voteSchema.find({
            botID: req.params.botID,
        }).sort([
            ['Xp', 'descending'],
        ]).limit(10);

        const reviews = await feedbackSchema.find({
            botID: req.params.botID,
        }).sort([
            ['date', 'descending'],
        ]);

        const userData = await discordAPI.getUser(dbBot.ownerID);

        let coowner = new Array()
        let t = await Promise.all(dbBot.additionalOwners.map(async I => await discordAPI.getUser(I).then(b => coowner.push(b))));

        let reviwers = new Array()
        let r = await Promise.all(reviews.map(async p => await discordAPI.getUser(p.userID).then(f => reviwers.push(f))));

        let geoloc;
        if (site.analitics == true) geoloc = await fetch(encodeURI(`https://ip-api.io/json/${req.connection.remoteAddress || req.socket.remoteAddress}`)).then(res => res.json());

        let refURL = String(req.headers.referer).replace("undefined", "Unkown").split('.').join(',');
        let referDB = dbBot.referLink;

        if (referDB.length > 4) {
            referDB.splice(-5, 1);
            referDB.push(refURL);
        } else {
            referDB.push(refURL);
        }

        dbBot.save().catch(() => {
            //  do nothing.
        });

        let views = dbBot.views + 1 || 1;

        await dbBot.updateOne({
            views: views,
        });

        if (geoloc) {
            let countryCode = geoloc.country_code || "US";

            await DataSchema.updateOne({
                botID: req.params.botID
            }, {
                $inc: {
                    [`countryVisit.${countryCode}`]: 1
                }
            })
        }

        res.render("bot-publicPage/bot.ejs", {
            req: req,
            domain: site.domain,
            db: dbBot,
            tags: site.tags,
            dbRank: dbRank,
            ownerAvatar: userData.avatar,
            additionalOwners: coowner,
            moment: moment,
            markdown: markdown,
            reviews: reviews,
            rData: reviwers,
        })
    }
});

app.post("/bot/:botID", async (req, res) => {

    let dbBot = await DataSchema.findOne({ botID: req.params.botID });

    const dbRank = await voteSchema.find({
        botID: req.params.botID,
    }).sort([
        ['Xp', 'descending'],
    ]).limit(10);

    const reviews = await feedbackSchema.find({
        botID: req.params.botID,
    }).sort([
        ['date', 'descending'],
    ]);

    const userData = await discordAPI.getUser(dbBot.ownerID);
    const botData = await discordAPI.getUser(req.params.botID);

    let coowner = new Array()
    let t = await Promise.all(dbBot.additionalOwners.map(async I => await discordAPI.getUser(I).then(b => coowner.push(b))));

    let reviwers = new Array()
    let r = await Promise.all(reviews.map(async p => await discordAPI.getUser(p.userID).then(f => reviwers.push(f))));

    let geoloc;
    if (site.analitics == true) geoloc = await fetch(encodeURI(`https://ip-api.io/json/${req.connection.remoteAddress || req.socket.remoteAddress}`)).then(res => res.json());

    let refURL = String(req.headers.referer).replace("undefined", "Unkown").split('.').join(',');
    let referDB = dbBot.referLink;

    if (referDB.length > 4) {
        referDB.splice(-5, 1);
        referDB.push(refURL);
    } else {
        referDB.push(refURL);
    }

    dbBot.save().catch(() => {
        //  do nothing.
    });

    let views = dbBot.views + 1 || 1;

    await dbBot.updateOne({
        views: views,
    });

    if (geoloc) {
        let countryCode = geoloc.country_code || "US";

        await DataSchema.updateOne({
            botID: req.params.botID
        }, {
            $inc: {
                [`countryVisit.${countryCode}`]: 1
            }
        })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'newcomment')) {
        // Collecting all data and saving it to the database
        const newReviewer = new feedbackSchema({
            botID: req.params.botID,
            userID: req.user.id,
            userName: req.user.username,
            userTag: `${req.user.username}#${req.user.discriminator}`,
            comment: req.body.content,
            date: Date.now(),
            stars: 1,
        });
        await newReviewer.save().catch(() => {
            // do nothing.
        });

        res.render("bot-publicPage/bot.ejs", {
            req: req,
            domain: site.domain,
            db: dbBot,
            tags: site.tags,
            dbRank: dbRank,
            botAvatar: botData.avatar,
            ownerAvatar: userData.avatar,
            additionalOwners: coowner,
            moment: moment,
            markdown: markdown,
            reviews: reviews,
            rData: reviwers,
        })
    }

    if (Object.prototype.hasOwnProperty.call(req.body, 'refresh')) {
        let dbBot = await DataSchema.findOne({ botID: req.params.botID });
        // console.log('ok')
        dbBot.botAvatar = `https://cdn.discordapp.com/avatars/${req.params.botID}/${botData.avatar}.webp?size=1024`;

        dbBot.save().catch(() => {
            //  do nothing.
        });

        return res.redirect(`/bot/${req.params.botID}`)
    }


});

app.get("/bot/:botID/vote", checkAuth, async (req, res) => {

    let dbBot = await DataSchema.findOne({ botID: req.params.botID });
    if (!dbBot) return res.redirect("/403?error=You entered an invalid bot id.");

    if (dbBot.status == 'waiting for verification') {
        return res.redirect("/403?error=bot-awaiting-approval.");
    } else {
        res.render("bot-votePage/vote.ejs", {
            req: req,
            domain: site.domain,
            db: dbBot,
            tags: site.tags,
            moment: moment,
        })
    }
});

app.post("/bot/:botID/vote", checkAuth, async (req, res) => {

    let dbBot = await DataSchema.findOne({ botID: req.params.botID });
    if (!dbBot) return res.redirect("/403?error=You entered an invalid bot id.");

    if (dbBot.status == 'waiting for verification') {
        return res.redirect("/403?error=bot-awaiting-approval.");
    } else {

        let upvotes = dbBot.upvotes + 1 || 1;

        await dbBot.updateOne({
            upvotes: upvotes,
        });

        // user timed 12hours

        // send webhook log channel

        // notify user each 12hrs (optional)

        res.render("bot-votePage/vote.ejs", {
            req: req,
            domain: site.domain,
            db: dbBot,
            tags: site.tags,
            moment: moment,
        })
    }
});

module.exports = app;