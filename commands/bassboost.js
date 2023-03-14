module.exports = {
    name: 'bassboost',
    description: 'Toggle bassboost filter',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if (!queue) return client.error.DEFAULT_ERROR(interaction)

        const success = await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer2']);

        setTimeout(() => {
            return interaction.followUp({
                content: success ? 
                `Bassboost ${queue.filters.ffmpeg.isEnabled('bassboost') ? 'Enabled' : 'Disabled'}! ✅` :
                `Something went wrong ${interaction.member}... try again ? ❌`
            })
        }, queue.node.bufferingTimeout)
    }
}