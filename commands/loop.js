const { QueueRepeatMode } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name: 'loop',
    description: 'Turn on/off looping of a song or the whole queue',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'what action you want to preform on the loop',
        type: ApplicationCommandOptionType.Integer,
        required: true,
        choices: [
            { name: 'Song', value: QueueRepeatMode.TRACK },
            { name: 'Queue', value: QueueRepeatMode.QUEUE },
            { name: 'Off', value: QueueRepeatMode.OFF },
        ],
    }],

    async execute({ interaction }) {
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if(!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)

        switch (interaction.options.getInteger('action')) {
            case QueueRepeatMode.TRACK: {
                queue.setRepeatMode( QueueRepeatMode.TRACK )
                
                return interaction.followUp({
                    content: 'Repeat mode **enabled** the current song will be repeated endlessly 🔁'
                })
            }

            case QueueRepeatMode.QUEUE: {
                queue.setRepeatMode( QueueRepeatMode.QUEUE );

                return interaction.followUp({
                    content: 'Repeat mode **enabled** the whole queue will be repeated endlessly 🔁'
                })
            }

            case QueueRepeatMode.OFF: {
                queue.setRepeatMode( QueueRepeatMode.OFF );

                return interaction.followUp({
                    content: 'Repeat mode **disabled**'
                })
            }
        }
    },
};