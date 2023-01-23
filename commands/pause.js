module.exports = {
    name: 'pause',
    description: 'Pause the current song',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)

        if(!queue || !queue.playing) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        const paused = await queue.setPaused(true);
        return interaction.followUp({
            content: paused ? 
            'Player has been paused! ⏸' :
            `Something went wrong ${interaction.member}... try again ? ❌`
        });
    }
}