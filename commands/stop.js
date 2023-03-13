module.exports = {
    name: 'stop',
    description: 'Stop the track',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)

        await queue.delete();
        await client.emit('trackEnd', interaction.guildId)

        return interaction.followUp({ content: "Player has been stopped, see you next time! ✅" });
    }
}
