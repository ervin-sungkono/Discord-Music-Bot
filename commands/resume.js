module.exports = {
    name: 'resume',
    description: 'Resume the current song',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)

        if(!queue || !queue.playing) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        const resumed = queue.setPaused(false)
        return interaction.followUp({
            content: resumed ? 
            'Player has been resumed! ▶️' :
            `Something went wrong ${interaction.member}... try again ? ❌`
        });
    }
}