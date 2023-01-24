const { ApplicationCommandOptionType } = require('discord.js')
const MIN_VOL = client.config.opt.minVol
const MAX_VOL = client.config.opt.maxVol

module.exports = {
    name: 'volume',
    description: 'Set volume to specific value',
    voiceChannel: true,
    options: [
        {
            name: 'amount',
            type: ApplicationCommandOptionType.Number,
            description: `Volume amount to set(${MIN_VOL}-${MAX_VOL})`,
            required: false,
            minValue: MIN_VOL,
            maxValue: MAX_VOL
        }
    ],

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if (!queue) return client.error.DEFAULT_ERROR(interaction)

        const volume = parseInt(interaction.options.getNumber('amount'))

        if(volume == null) return interaction.followUp({
            content: `🎧 Current volume is **${queue.volume}**%`,
            ephemeral: true
        })

        const success = queue.setVolume(volume)
        return interaction.followUp({
            content: success ?
            `Music volume set to **${volume}**%! ✅` :
            `Something went wrong ${interaction.member}... try again ? ❌`
        })
    }
}