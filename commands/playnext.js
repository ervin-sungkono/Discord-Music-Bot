const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')
const MAX_NUMBER_OF_CHOICES = client.config.opt.maxNumberOfChoices

module.exports = {
    name : 'playnext',
    description : 'Add a song to the top of the queue',
    voiceChannel : true,
    options : [
        {
            name : 'song',
            description: 'name of song to play next',
            type : ApplicationCommandOptionType.String,
            required : true,
            autocomplete : true
        }
    ],

    async autocomplete({ interaction }) {
        const query = interaction.options.getString('song', true)
        const results = await player.search(query)

        return interaction.respond(
            results.tracks.slice(0, MAX_NUMBER_OF_CHOICES).map((t) => ({
                name: (`(${t.duration}) - ${t.title}`).slice(0,100),
                value: t.url
            }))
        )
    },

    async execute ({ interaction }) {
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId);
        if (!queue || !queue.node.isPlaying()) return client.error.DEFAULT_ERROR(interaction)

        const songName = interaction.options.getString('song')
        const result = await player.search(songName, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        })
        .catch((error) => console.log(error))

        if (!result || !result.tracks.length) return client.error.NO_RESULTS_FOUND

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch {
            player.deleteQueue(interaction.guildId);
            return client.error.CONNECTION_FAIL(interaction)
        }

        await interaction.followUp({
            content: `⏱| Loading your ${result.playlist ? "playlist" : "track"}`,
            ephemeral: true
        }).then(async (message) => {
            result.playlist ? queue.insertTrack(result.tracks) : queue.insertTrack(result.tracks[0])
            if (!queue.node.isPlaying()) await queue.node.play()
            message.delete()
        })
    }
}