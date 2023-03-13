module.exports = {
    name: 'pause',
    description: 'Pause the current song',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if(!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)

        const paused = await queue.node.pause();
        return interaction.followUp({
            content: paused ? 
            'Player has been paused! ⏸' :
            `Something went wrong ${interaction.member}... try again ? ❌`
        });
    }
}