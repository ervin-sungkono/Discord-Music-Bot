const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name : 'playnext',
    description : 'Add a song to the top of the queue',
    voiceChannel : true,
    options : [
        {
            name : 'song',
            description: 'name of song to play next',
            type : ApplicationCommandOptionType.String,
            required : true
        }
    ],

    async execute ({ interaction }) {
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId);
        if (!queue || !queue.playing) return interaction.followUp({ 
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        });

        const songName = interaction.options.getString('song')
        const result = await player.search(songName, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        })
        .catch(() => {})

        if (!result || !result.tracks.length) return interaction.followUp({
            content: `No results found ${interaction.member}... try again ? `,
            ephemeral: true
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel)
        } catch {
            void player.deleteQueue(interaction.guildId);
            return void interaction.followUp({
                content: "Could not join your voice channel!, try again ? ❌",
                ephemeral: true
            })
        }

        await interaction.followUp({
            content: `⏱| Loading your ${result.playlist ? "playlist" : "track"}`,
            ephemeral: true
        }).then(async (message) => {
            result.playlist ? queue.insert(result.tracks) : queue.insert(result.tracks[0])
            if (!queue.playing) await queue.play()
            message.delete()
        })
    }
}