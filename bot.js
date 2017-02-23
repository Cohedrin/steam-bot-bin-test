'use strict';
const fs = require('fs');
const SteamUser = require('steam-user');
const SteamTotp = require('steam-totp');
const SECRETS = JSON.parse(fs.readFileSync('./secrets.json'));

function SteamBot() {
  /**
   * Username of bot
   * @type {String}
   */
  this.username = SECRETS.username;
  /**
   * Steam id of bot, set after logged in
   * @type {String}
   */
  this.steamId = undefined;
  /**
   * Password for account
   * @type {String}
   */
  this.password = SECRETS.password;
  /**
   * Steam Shared secret (used for logging into steam)
   * @type {String}
   */
  this.sharedSecret = SECRETS.shared_secret;
  /**
   * Steam user instance for this bot
   * @type {SteamUser}
   */
  this.steamUser = new SteamUser();
  /**
   * Steam client instance for this bot
   * @type {SteamClient}
   */
  this.steamClient = this.steamUser.client;
  setupCallbacks(this);
  this.logIn();
}

SteamBot.prototype.logIn = function() {
  console.log('logging in...');
  const authCode = SteamTotp.generateAuthCode(this.sharedSecret);

  this.steamUser.logOn({
    accountName: this.username,
    password: this.password,
    twoFactorCode: authCode });
};

module.exports = SteamBot;

function setupCallbacks(ctx) {
  ctx.steamUser.on('loggedOn', (_details, _parental) => {
    console.log('logged in');
    console.log('setting games played');
    ctx.steamUser.steamID.getSteam3RenderedID()
    ctx.steamUser.setPersona(SteamUser.EPersonaState.Online);
    ctx.steamUser.gamesPlayed(730);
  });
}
