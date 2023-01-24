const { QueueRepeatMode } = require('discord-player');

module.exports = {
    name: 'autoplay',
    description: 'Toggle song autoplay',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId);

        if(!queue || !queue.playing) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        const action = (queue.repeatMode === 4) ? QueueRepeatMode.OFF : QueueRepeatMode.AUTOPLAY
        const success = await queue.setRepeatMode(action)

        return interaction.followUp({
            content: success ?
            `Autoplay ${action === QueueRepeatMode.OFF ? "Disabled" : "Enabled"}! ✅`:
            `Something went wrong ${interaction.member}... try again ? ❌`
        })
    }
}