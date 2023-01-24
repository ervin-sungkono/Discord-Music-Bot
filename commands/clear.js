module.exports = {
    name: 'clear',
    description: 'Clear all songs in the queue',
    voiceChannel: true,

    async execute({ interaction }) {
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.tracks[0]) return client.error.NO_NEXT_TRACKS(interaction)

        await queue.clear();
        interaction.followUp(`The queue has been cleared 🗑️`)
    },
};