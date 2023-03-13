module.exports = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.tracks.toArray()[0]) return client.error.NO_NEXT_TRACKS

        await queue.tracks.shuffle()
        return interaction.followUp({
            content:`Queue shuffled **${queue.getSize()}** song(s) ! ✅`
        });
    }
}