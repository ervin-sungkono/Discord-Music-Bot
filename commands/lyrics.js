const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const { Lyrics } = require('@discord-player/extractor')
const lyricsClient = Lyrics.init(process.env.GENIUS_API)

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
        if(!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)

        const query = interaction.options.getString('song') || queue.current.title
        const lyrics = await lyricsClient.search(query)
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
            embeds: [embed],
            ephemeral: true
        })
    }
}