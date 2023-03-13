const { EmbedBuilder } = require('discord.js');
const { pagination, ButtonTypes, ButtonStyles } = require('@devraelfreeze/discordjs-pagination');

const ITEMS_PER_PAGE = client.config.paginate.itemsPerPage

module.exports = {
    name: 'history',
    description: 'Show the queue history',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.nodes.get(interaction.guildId)
        if (!queue) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.history.previousTrack) return client.error.NO_PREVIOUS_TRACKS(interaction)

        const previousTracks = queue.history.tracks.toArray()
        const songs = previousTracks.length
        const tracks = previousTracks.map((track, i) => `**${i + 1} - ${track.title} | ${track.author}** (requested by : ${track.requestedBy.username})`)
        const pages = []

        for(let i = 0; i < Math.ceil(tracks.length / ITEMS_PER_PAGE); i++){
            const startIndex = i * ITEMS_PER_PAGE
            const endIndex = startIndex + ITEMS_PER_PAGE
            const nextSongs = songs > ITEMS_PER_PAGE ? endIndex > songs ? '~ End of the queue history ~' : `And **${songs - endIndex}** other song(s)...` : `**${songs}** song(s) in the playlist`
            const embed = new EmbedBuilder()
                .setTitle(`Queue History - Page ${i+1}`)
                .setDescription(`Now playing: **${queue.currentTrack?.title || "Nothing"}**\n\n${tracks.slice(startIndex, endIndex).join('\n')}\n\n${nextSongs}`)
                .setColor('#ff0000')

            pages.push(embed)
        }

        if(pages.length > 1) await pagination({
            embeds: pages,
            author: interaction.member.user,
            interaction: interaction,
            ephemeral: true,
            time: client.config.paginate.time,
            disableButtons: client.config.paginate.disableButtons,
            fastSkip: client.config.paginate.fastSkip,
            pageTravel: client.config.paginate.pageTravel,
            buttons: [
                {
                    value: ButtonTypes.previous,
                    label: 'Previous',
                    style: ButtonStyles.Secondary
                },
                {
                    value: ButtonTypes.next,
                    label: 'Next',
                    style: ButtonStyles.Primary
                }
            ]
        })
        else interaction.followUp({
            embeds : [pages[0]],
            ephemeral: true
        })
    }
}