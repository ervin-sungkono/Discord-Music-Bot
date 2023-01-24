module.exports = {
    name: 'pause',
    description: 'Pause the current song',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if(!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)

        const paused = await queue.setPaused(true);
        return interaction.followUp({
            content: paused ? 
            'Player has been paused! ⏸' :
            `Something went wrong ${interaction.member}... try again ? ❌`
        });
    }
}