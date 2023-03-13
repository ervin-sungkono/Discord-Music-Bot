module.exports = {
    name: 'skip',
    description: 'Skip current song',
    voiceChannel: true,

    async execute({ interaction }) {
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)

        const currentTrack = queue.currentTrack
        const success = await queue.node.skip();

        return interaction.followUp({ 
            content: success ? 
            `Skipped track **${currentTrack.title}** ✅` : 
            `Something went wrong ${interaction.member}... try again ? ❌`,
        });
    },
};