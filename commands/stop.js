module.exports = {
    name: 'stop',
    description: 'Stop the track',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)

        await queue.destroy();
        await client.emit('trackEnd', interaction.guildId)

        return interaction.followUp({ content: "Player has been stopped, see you next time! ✅" });
    }
}
