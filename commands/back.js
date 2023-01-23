module.exports = {
    name: 'back',
    description: 'Play the previous track',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)

        if(!queue || !queue.playing) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        if (!queue.previousTracks[1]) return interaction.followUp({
            content: `There was no music played before ${interaction.member}... try again ? ❌`,
            ephemeral: true });

        await queue.back()
        interaction.followUp({
            content:`Playing the **previous** track ✅`
        });
    }   
}