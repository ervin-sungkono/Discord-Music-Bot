const { Client, GatewayIntentBits } = require('discord.js')
const { Player } = require('discord-player')

require('dotenv').config()

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
})

client.config = require('./config')
client.error = require('./error')

const player = new Player(client, client.config.opt.discordPlayer)
player.extractors.loadDefault() // Load all extractors by default

global.player = player

require('./src/playerEvents')
require('./src/loader')

client.login(client.token)