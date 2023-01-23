module.exports = {
    name: 'bassboost',
    description: 'Toggle bassboost filter',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)

        if (!queue) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

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