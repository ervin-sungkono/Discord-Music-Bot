module.exports = {
    name: 'clear',
    description: 'Clear all songs in the queue',
    voiceChannel: true,

    async execute({ interaction }) {
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if (!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.tracks.toArray()[0]) return client.error.NO_NEXT_TRACKS(interaction)

        await queue.tracks.clear();
        interaction.followUp(`The queue has been cleared 🗑️`)
    },
};