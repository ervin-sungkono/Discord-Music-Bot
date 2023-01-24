const { EmbedBuilder } = require('discord.js');
const { pagination, TypesButtons, StylesButton } = require('@devraelfreeze/discordjs-pagination')

const ITEMS_PER_PAGE = client.config.paginate.itemsPerPage

module.exports = {

    name: 'queue',
    description: 'Show list of queued songs',
    voiceChannel: true,

    async execute({ interaction }){
        await interaction.deferReply()

        const queue = player.getQueue(interaction.guildId)
        if (!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)
        if (!queue.tracks[0]) return client.error.NO_NEXT_TRACKS(interaction)

        const songs = queue.tracks.length
        const tracks = queue.tracks.map((track, i) => `**${i + 1} - ${track.title} | ${track.author}** (requested by : ${track.requestedBy.username})`)
        const mode = ['', '🔁', '🔂', '🅰️'];
        const pages = []

        for(let i = 0; i < Math.ceil(tracks.length / ITEMS_PER_PAGE); i++){
            const startIndex = i * ITEMS_PER_PAGE
            const endIndex = startIndex + ITEMS_PER_PAGE
            const nextSongs = songs > ITEMS_PER_PAGE ? endIndex > songs ? '~ End of the queue ~' : `And **${songs - endIndex}** other song(s)...` : `**${songs}** song(s) in the playlist`
            const embed = new EmbedBuilder()
                .setTitle(`Queue List - Page ${i+1} | Mode: ${mode[queue.repeatMode]}`)
                .setDescription(`Now playing: ${queue.current.title}\n\n${tracks.slice(startIndex, endIndex).join('\n')}\n\n${nextSongs}`)
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
                    value: TypesButtons.previous,
                    label: 'Previous',
                    style: StylesButton.Secondary
                },
                {
                    value: TypesButtons.next,
                    label: 'Next',
                    style: StylesButton.Primary
                }
            ]
        })
        else interaction.followUp({
            embeds: [pages[0]],
            ephemeral: true
        })
        
    }
}