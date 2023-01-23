module.exports = {
    name: 'stop',
    description: 'Stop the track',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId);

        if (!queue || !queue.playing) return interaction.followUp({
            content: "❌ | No music is being played!",
            ephemeral: true
        })
        await queue.destroy();

        return interaction.followUp({ content: "Player has been stopped, see you next time! ✅" });
    }
}
