/** ------------------------------------------------------------------------------------------------
* [DEPENDENCIES] NPM INSTALL
* ------------------------------------------------------------------------------------------------ */
const Discord = require("discord.js"),
    { DataSchema } = require('../database/models/index'),
    Sentry = require("@sentry/node"),
    Tracing = require("@sentry/tracing"),
    minifyHTML = require('express-minify-html-terser'),
    url = require("url"),
    path = require("path"),
    express = require("express"),
    axios = require('axios'),
    app = express(),
    passport = require("passport"),
    session = require('express-session'),
    MemoryStore = require("memorystore")(session),
    Strategy = require("passport-discord").Strategy,
    { site, server, botconfig } = require("../config.js"),
    discordAPI = require("./helpers/discordAPI.js"),
    { randomToken } = require("./helpers/index.js"),
    ejs = require("ejs"),
    bodyParser = require("body-parser"),
    moment = require('moment'),
    Parser = require('rss-parser'),
    parser = new Parser();

/** ------------------------------------------------------------------------------------------------
* [DATABASE] MODELS
* ------------------------------------------------------------------------------------------------ */

/** ------------------------------------------------------------------------------------------------
* [MINIFY-HTML] SETTINGS
* ------------------------------------------------------------------------------------------------ */
app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));

/** ------------------------------------------------------------------------------------------------
* [IMPORTANT] STRINGS
* ------------------------------------------------------------------------------------------------ */
const domain = site.domain,
    clientID = site.client_id,
    secret = site.secret;

/** ------------------------------------------------------------------------------------------------
* [BASE] CONNECTIONS SETTINGS
* ------------------------------------------------------------------------------------------------ */
module.exports = async (client) => {
    app.set('views', path.join(__dirname, '/static'));
    const templateDir = path.resolve(`${process.cwd()}${path.sep}site/static`);

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((obj, done) => done(null, obj));

    //------------------- DISCORD AUTH W/ PASSPORT -------------------//
    passport.use(new Strategy({
        clientID: `${clientID}`,
        clientSecret: `${secret}`,
        callbackURL: `${domain}/callback`,
        scope: ["identify", "guilds", "guilds.join"]
    },
        (accessToken, refreshToken, profile, done) => {
            process.nextTick(() => done(null, profile));
        }));

    //------------------- SESSION CONTROLLER  -------------------//
    app.use(session({
        cookie: { maxAge: 7200000 },
        store: new MemoryStore({
            checkPeriod: 7200000 // prune expired entries every 24h
        }),
        resave: false,
        secret: "aWdbd*XUqNFBPJTY6",
        saveUninitialized: false,
    }));

    //------------------- SENTRY SETTINGS -------------------//
    Sentry.init({
        dsn: "https://9ad5ba2cda0a46cbb90923c582fb4a6e@o1129635.ingest.sentry.io/6173556",
        integrations: [new Sentry.Integrations.Http({ tracing: true }), new Tracing.Integrations.Express({ app })],
        tracesSampleRate: 1.0,
    });

    //------------------- INITIALIZE PASSPORT MIDDLEWARE -------------------//
    app
        .use("/css", express.static(path.resolve(`${templateDir}${path.sep}assets/css`)))
        .use("/js", express.static(path.resolve(`${templateDir}${path.sep}assets/js`)))
        .use("/images", express.static(path.resolve(`${templateDir}${path.sep}assets/images`)))
        .use("/fonts", express.static(path.resolve(`${templateDir}${path.sep}assets/fonts`)))
        .use(passport.initialize())
        .use(passport.session())
        .use(Sentry.Handlers.requestHandler())
        .use(Sentry.Handlers.tracingHandler())
        .engine("html", ejs.renderFile)
        .set("view engine", "html")
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true
        }));

    //------------------- METHOD RENDER-TEMPLATE OPTIONAL -------------------//        
    const renderTemplate = (res, req, template, data = {}) => {
        var hostname = req.headers.host;
        var pathname = url.parse(req.url).pathname;

        const baseData = {
            https: site.https,
            domain: site.domain,
            bot: client,
            hostname: hostname,
            pathname: pathname,
            path: req.path,
            user: req.isAuthenticated() ? req.user : null,
            description: site.description,
            url: res,
            req: req,
            image: `${site.domain}/logo.png`,
            name: client.username,
            tag: client.tag,
            analitics: site.analitics,
        };
        res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
    };

    //------------------- CHECK AUTH -------------------//
    const checkAuth = (req, res, next) => {
        if (req.isAuthenticated()) return next();
        req.session.backURL = req.url;
        res.redirect("/login");
    }

    //------------------- INIT SENTRY -------------------//
    app.use(Sentry.Handlers.errorHandler());

    //------------------- LOGIN ENDPOINT -------------------//
    app.get("/login", (req, res, next) => {

        if (req.session.backURL) {
            req.session.backURL = req.session.backURL;
        } else if (req.headers.referer) {
            const parsed = url.parse(req.headers.referer);
            if (parsed.hostname === app.locals.domain) {
                req.session.backURL = parsed.path;
            }
        } else {
            req.session.backURL = "/";
        }
        // Forward the request to the passport middleware.
        next();
    },
        passport.authenticate("discord"));

    //------------------- CALLBACK ENDPOINT -------------------//    
    app.get(
        "/callback",
        passport.authenticate("discord", {
            failureRedirect: "/?error=oauth-login-failed"
        }), async (req, res) => {

            try {
                if (req.session.backURL) {

                    const url = req.session.backURL;
                    req.session.backURL = null;
                    res.redirect(url);
                } else {
                    res.redirect(req.session.backURL || '/');
                }
                const accessToken = req.user.accessToken;
                await axios({
                    method: 'PUT',
                    url: `https://discord.com/api/guilds/${server.id}/members/${req.user.id}`,
                    headers: {
                        'Authorization': `Bot ${botconfig.token}`,
                        'Content-type': 'application/json'
                    },
                    data: {
                        'access_token': `${accessToken}`
                    }
                }).then().catch(err => { console.log(`[Auto-Join Server error]: ${err}.`); })
            } catch (err) {
                console.log(`[Callback error]: ${err}.`);
            }
        });

    //------------------- LOGOUT ENDPOINT -------------------//
    app.get("/logout", async function (req, res) {

        if (req.user) {
            const member = await client.users.fetch(req.user.id);
            if (member) {

                // Logout webhook logs
            }
        }

        req.session.destroy(() => {
            req.logout();
            res.redirect("/");
        });
    });

    /** ------------------------------------------------------------------------------------------------
    * [HOMEPAGE] INDEX ENDPOINT
    * ------------------------------------------------------------------------------------------------ */
    app.use("/", require('./routers/index.js'));
    /** ------------------------------------------------------------------------------------------------
    * [BOT] BOT PAGE VIEW ENDPOINT
    * ------------------------------------------------------------------------------------------------ */
    app.use("/", require('./routers/bot-publicPage/index.js'));
    /** ------------------------------------------------------------------------------------------------
    * [BOT] ADDBOT.EJS
    * ------------------------------------------------------------------------------------------------ */
    app.get("/addbot", checkAuth, async (req, res) => {

        const token = server.token;
        const userExists = await discordAPI.getData(req.user.id, token);

        // Checks if the user is on the FindBots server
        if (userExists.message == "Unknown Member") return res.redirect("/403?error=you-have-to-join-our-discord-server.");

        renderTemplate(res, req, "./bot-addPage/add.ejs", {
            userExists: userExists,
            tags: site.tags,
            error: '',
            success: '',
        });
    });

    app.post("/addbot", checkAuth, async (req, res) => {

        // Checks if the user is on the FindBots server
        const rb = req.body,
            token = server.token,
            userExists = await discordAPI.getData(req.user.id, token).catch(err => {
                console.log(`[ADD-PAGE]: ${err}.`);
                return res.redirect("/403?error=you-have-to-join-our-discord-server.");
            });

        let dbBot = await DataSchema.findOne({ botID: req.body.botID });
        if (dbBot) return res.redirect('/404?code=404&message=The bot you are trying to add exists in the system.');

        // Checks whether the ID entered is from a real bot
        const botID = await client.users.fetch(req.body.botID).then().catch(err => {
            console.log(`[ADD-PAGE]: ${err}.`);
            return res.redirect("/404?error=you-entered-an-invalid-id.");
        });

        let devs = [];
        if (rb.additionalOwners) {
            const array = rb.additionalOwners.split(' ');
            const formatted = array.join(" ");
            const data = formatted.split(" ")
            for (const dev of data) {
                devs.push(dev);
            }
        }

        if (botID && botID.bot == true) {
            // Collecting all data and saving it to the database
            const newData = new DataSchema({
                ownerID: req.user.id,
                ownerTag: `${req.user.username}#${req.user.discriminator}`,
                additionalOwners: devs || null,
                botID: rb.botID,
                botName: botID.username,
                botDiscriminator: botID.discriminator,
                botAvatar: botID.avatarURL() || null,
                library: rb.library,
                shortDesc: rb.shortDesc || null,
                longDesc: rb.longDesc || null,
                prefix: rb.prefix,
                tags: rb.tags,
                mainLanguage: rb.mainLanguage || null,
                subLanguage: rb.sunLanguage || null,
                inviteURL: rb.inviteURL || null,
                supportURL: rb.supportURL || null,
                socials: {
                    twitter: rb.twitter || null,
                    reddit: rb.reddit || null,
                    telegram: rb.telegram || null,
                    tiktok: rb.tiktok || null,
                    instagram: rb.instagram || null,
                    facebook: rb.facebook || null,
                    youtube: rb.youtube || null,
                },
                website: rb.website || null,
                github: rb.github || null,
                donationLink: rb.donationLink || null,
                joinDate: Date.now(),
                token: randomToken(15) + '.' + randomToken(25) + '.' + randomToken(15),
            });
            await newData.save().catch(() => {
                // do nothing.
            });

            renderTemplate(res, req, "./bot-addPage/add.ejs", {
                userExists: userExists,
                domain: site.domain,
                tags: site.tags,
                error: '',
                success: '',
            });
        } else {
            return res.redirect("/404?error=you-entered-an-invalid-bot-id.");
        }
    });

    /** ------------------------------------------------------------------------------------------------
    * [ERROR] ENDPOINTS
    * ------------------------------------------------------------------------------------------------ */
    //------------------- PAGE 403 - ENDPOINT -------------------//
    app.get("/403", (req, res, next) => {
        renderTemplate(res, req, "error-pages/403.ejs", {
            alert: null,
        });
    });
    //------------------- PAGE 404 - ENDPOINT -------------------//
    app.get("/404", (req, res, next) => {
        renderTemplate(res, req, "error-pages/404.ejs", {
            alert: null,
        });
    });
    //------------------- PAGE 500 - ENDPOINT -------------------//
    app.get("/500", (req, res, next) => {
        renderTemplate(res, req, "error-pages/500.ejs", {
            alert: null,
        });
    });
    //------------------- PAGE 408 - ENDPOINT -------------------//
    app.get("/408", (req, res, next) => {
        renderTemplate(res, req, "error-pages/408.ejs", {
            alert: null,
        });
    });
    //------------------- REDIRECT NON-EXISTENT PAGES TO 404 PAGE -------------------//
    app.get("*", (req, res) => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        if (fullUrl == domain || fullUrl == `https://hopebot.xyz/style.css` || fullUrl == `https://hopebot.xyz/style.css` || fullUrl == `https://hopebot.xyz/favico.ico`) {
            renderTemplate(res, req, "index.ejs");
        } else {
            res.redirect("/404?error=notfound");
        }
    });

    //------------------- LISTEN UP -------------------//
    app.listen(site.port || 5000, null, null, () => console.log(`Website is up and running on ${site.domain}:${site.port}.`)); // LOCAL MODE
    // app.listen(site.port || 5000, null, null, () => console.log(`Dashboard is up and running on ${site.domain}:${site.port}.`)); // HEROKU MODE
}
