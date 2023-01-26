const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { lyricsExtractor } = require('@discord-player/extractor')
const lyricsClient = lyricsExtractor(process.env.GENIUS_API)

module.exports = {
    name: 'lyrics',
    description: 'Show lyrics for a song/now playing',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'Name of song to get lyrics',
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if((!queue || !queue.playing) && !interaction.options.getString('song')) return client.error.DEFAULT_ERROR(interaction)

        const query = interaction.options.getString('song') || queue.current.title
        const data = await lyricsClient.search(query)
            .catch(error => console.log(error))

        if(!data) return interaction.followUp({
            content: `No lyrics found ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })

        const embed = new EmbedBuilder()
            .setThumbnail(data.thumbnail)
            .setTitle(data.title)
            .setDescription(data.lyrics.substring(0,4095))
            .setColor("#3498DB")

        return interaction.followUp({
            embeds: [embed],
            ephemeral: true
        })
    }
}