module.exports = {
    name: 'clear',
    description: 'Clear all songs in the queue',
    voiceChannel: true,

    async execute({ interaction }) {
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)

        if (!queue || !queue.playing) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })
        if (!queue.tracks[0]) return interaction.followUp({
            content: `No music in the queue after the current one ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        await queue.clear();
        interaction.followUp(`The queue has been cleared 🗑️`)
    },
};