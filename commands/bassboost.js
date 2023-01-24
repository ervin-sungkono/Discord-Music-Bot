module.exports = {
    name: 'bassboost',
    description: 'Toggle bassboost filter',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if (!queue) return client.error.DEFAULT_ERROR(interaction)

        await queue.setFilters({
            bassboost: !queue.getFiltersEnabled().includes('bassboost'),
            normalizer2: !queue.getFiltersEnabled().includes('bassboost')
        });

        setTimeout(() => {
            return interaction.followUp({
                content: `Bassboost ${queue.getFiltersEnabled().includes('bassboost') ? 'Enabled' : 'Disabled'}! ✅` 
            });
        }, queue.options.bufferingTimeout);
    }
}