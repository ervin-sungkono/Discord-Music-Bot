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

global.player = new Player(client, client.config.opt.discordPlayer)

require('./src/playerEvents')
require('./src/loader')

client.login(client.token)