module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.tracks[0]) return client.error.NO_NEXT_TRACKS

        await queue.shuffle()
        return interaction.followUp({
            content:`Queue shuffled **${queue.tracks.length}** song(s) ! ✅`
        });
    }
}