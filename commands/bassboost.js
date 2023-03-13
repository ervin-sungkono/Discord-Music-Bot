module.exports = {
    name: 'bassboost',
    description: 'Toggle bassboost filter',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if (!queue) return client.error.DEFAULT_ERROR(interaction)

        await queue.filters.ffmpeg.toggle(['bassboost', 'normalizer2']);

        setTimeout(() => {
            return interaction.followUp({
                content: `Bassboost ${queue.filters.ffmpeg.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}! ✅` 
            });
        }, queue.options.bufferingTimeout);
    }
}