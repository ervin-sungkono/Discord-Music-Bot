const { QueryType } = require('discord-player')
const { ApplicationCommandOptionType } = require('discord.js')
const MAX_NUMBER_OF_CHOICES = client.config.opt.maxNumberOfChoices

module.exports = {
    name : 'play',
    description : 'Play a song of your choice!',
    voiceChannel : true,
    options : [
        {
            name : 'song',
            description: 'name of song to play',
            type : ApplicationCommandOptionType.String,
            required : true,
            autocomplete : true
        }
    ],

    async autocomplete({ interaction }) {
        const query = interaction.options.getString('song', true);
        const results = await player.search(query);

        return interaction.respond(
            results.tracks.slice(0, MAX_NUMBER_OF_CHOICES).map((t) => ({
                name: t.title,
                value: t.url
            }))
        );
    },

    async execute ({ interaction }) {
        await interaction.deferReply()
        
        const songName = interaction.options.getString('song')

        const result = await player.search(songName, {
            requestedBy: interaction.member,
            searchEngine: QueryType.AUTO
        })
        .catch(error => console.log(error))

        if (!result || !result.tracks.length) return client.error.NO_RESULTS_FOUND(interaction)

        const queue = await player.nodes.create(interaction.guild, {
            metadata: {
                channel: interaction.channel,
                client: interaction.guild.members.me,
                requestedBy: interaction.user,
            },
            selfDeaf: true,
            volume: client.config.opt.defaultvolume,
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
            queue.addTrack(result.playlist ? result.tracks : result.tracks[0])
            if (!queue.node.isPlaying()) await queue.node.play()
            message.delete()
        });
    }
}