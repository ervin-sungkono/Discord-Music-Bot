module.exports = {
    name: 'back',
    description: 'Play the previous track',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if(!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.previousTracks[1]) return client.error.NO_PREVIOUS_TRACKS(interaction)

        await queue.back()
        interaction.followUp({
            content:`Playing the **previous** track ✅`
        });
    }   
}