module.exports = {
    name: 'back',
    description: 'Play the previous track',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if (!queue) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.history.previousTrack) return client.error.NO_PREVIOUS_TRACKS(interaction)

        await queue.history.back()
        interaction.followUp({
            content:`Playing the **previous** track ✅`
        });
    }   
}