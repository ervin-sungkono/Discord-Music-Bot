module.exports = {
    name: 'skip',
    description: 'Skip current song',
    voiceChannel: true,

    async execute({ interaction }) {
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)

        const currentTrack = queue.current
        const success = await queue.skip();

        return interaction.followUp({ 
            content: success ? 
            `Skipped track "${currentTrack.title}" ! ✅` : 
            `Something went wrong ${interaction.member}... try again ? ❌`,
        });
    },
};