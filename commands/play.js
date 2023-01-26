const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')

module.exports = {
    name : 'play',
    description : 'Play a song of your choice!',
    voiceChannel : true,
    options : [
        {
            name : 'song',
            description: 'name of song to play',
            type : ApplicationCommandOptionType.String,
            required : true
        }
    ],

    async execute ({ interaction }) {
        await interaction.deferReply()
        
        const songName = interaction.options.getString('song')

        const result = await player.search(songName, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        })
        .catch(error => console.log(error))

        if (!result || !result.tracks.length) return client.error.NO_RESULTS_FOUND(interaction)

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel,
            initialVolume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnStop: client.config.opt.leaveOnStop,
            leaveOnEmpty: client.config.opt.leaveOnEmpty,
            leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown
        });

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
            result.playlist ? queue.addTracks(result.tracks) : queue.addTrack(result.tracks[0])
            if (!queue.playing) await queue.play()
            message.delete()
        });
    }
}