module.exports = {
    name: 'resume',
    description: 'Resume the current song',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if(!queue) return client.error.DEFAULT_ERROR(interaction)

        const resumed = await queue.node.resume()
        return interaction.followUp({
            content: resumed ? 
            'Player has been resumed! ▶️' :
            `Something went wrong ${interaction.member}... try again ? ❌`
        });
    }
}