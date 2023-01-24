const { EmbedBuilder } = require('discord.js')
const { Lyrics } = require('@discord-player/extractor')
const lyricsClient = Lyrics.init(process.env.GENIUS_API)

module.exports = {
    name: 'lyrics',
    description: 'Show lyrics for now playing song',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)

        if(!queue || !queue.playing) return interaction.followUp({
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        const lyrics = await lyricsClient.search(queue.current.title)
            .then(x => x.lyrics)
            .catch(error => console.log(error))

        if(!lyrics) return interaction.followUp({
            content: `No lyrics found ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        const embed = new EmbedBuilder()
            .setTitle(queue.current.title)
            .setDescription(lyrics.substring(0,4095))
            .setColor("#3498DB")

        return interaction.followUp({
            embeds: [embed]
        })
    }
}