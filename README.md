<!-- LOGO -->
<br />
<div align="center">
  <a href="https://github.com/klaus-2/FindBots-Botlist">
    <img src="site/static/assets/github-images/findbots-icon-logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">FindBots Botlist</h3>

  <p align="center">
    A botlist made in nodejs + mongoose open source.
    <br />
    <a href="#"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="#">View Demo</a>
    ·
    <a href="https://github.com/klaus-2/FindBots-Botlist/issues">Report Bug</a>
    ·
    <a href="https://github.com/klaus-2/FindBots-Botlist/issues">Request Feature</a>
  </p>
</div>

---

<p align="center"><strong>WORK IN PROGRESS</strong></p>

---

<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

[![FindBots Homepage Preview][product-screenshot]](#)

<p align="center">(<a href="site/static/assets/github-images">More screenshots</a>)</p>

I'm creating this botlist for learning purposes. It won't be a perfect project, far from it, but I'll try to make it the best I can.

I'll be working slowly, gradually I'll finish this botlist. If you're interested in helping me, just look for me at Discord!

My goals are to create a website, a dashboard, an integrated bot and an api.

Feel free to suggest suggestions during the creation process, and if you like this project, please leave a ⭐.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Step 4 is optional. Note that you must configure all data inside config.js for the site to run smoothly._

1. Clone the repo
   ```sh
   git clone https://github.com/klaus-2/FindBots-Botlist.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter your data in `config.js`
   ```js
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
   	fakeData: false,
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
   ```
4. In config.js, `fakeData: false` change to true if you want to use dummy data for a better view of current site features.

5. Open `start.bat` to start the website and bot.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

## Roadmap

- [x] Website base structure
- [x] Basic Bot
- [ ] Advanced bot
  - [ ] Logs
  - [ ] Commands (Like !queue, !vote <bodID>)
- [ ] User Dashboard
  - [ ] Profile (Router /@me & /@users/userID)
  - [ ] Bot/Server Settings
  - [ ] API Settings
- [ ] Admin Dashboard
- [ ] API
- [ ] Multi-language Support
  - [ ] Portuguese
  - [ ] English
  - [ ] Others...
- [ ] Add Servers
- [ ] Badges for Users & Bots
- [ ] Areas for bot banners boosted
- [ ] Search System
- [ ] Queue System base
  - [ ] Admin page (View, approve and denied)
  - [ ] User page (View position)
- [ ] Finish the Comment System
  - [ ] Add Star Rating

See the [open issues](https://github.com/klaus-2/FindBots-Botlist/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Discord - [Klaus#1565](https://discordapp.com/users/622812963572809771/)

DawnForge Server - [Invite link](https://discord.gg/D8dWtRWfYt)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/klaus-2/FindBots-Botlist.svg?style=for-the-badge
[contributors-url]: https://github.com/klaus-2/FindBots-Botlist/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/klaus-2/FindBots-Botlist.svg?style=for-the-badge
[forks-url]: https://github.com/klaus-2/FindBots-Botlist/network/members
[stars-shield]: https://img.shields.io/github/stars/klaus-2/FindBots-Botlist.svg?style=for-the-badge
[stars-url]: https://github.com/klaus-2/FindBots-Botlist/stargazers
[issues-shield]: https://img.shields.io/github/issues/klaus-2/FindBots-Botlist.svg?style=for-the-badge
[issues-url]: https://github.com/klaus-2/FindBots-Botlist/issues
[license-shield]: https://img.shields.io/github/license/klaus-2/FindBots-Botlist.svg?style=for-the-badge
[license-url]: https://github.com/klaus-2/FindBots-Botlist/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: site/static/assets/github-images/home.png
