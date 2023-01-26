const { ApplicationCommandOptionType } = require("discord.js")

module.exports = {
    name: 'remove',
    description: 'Remove a specific song from queue',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'Name or URL of the track to remove',
            type: ApplicationCommandOptionType.String,
            required: false
        },
        {
            name: 'index',
            description: 'Song\'s current place at the queue',
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],

    async execute({ interaction }){
        await interaction.deferReply()

        const index = interaction.options.getInteger('index')
        const track = interaction.options.getString('song')

        const queue = player.getQueue(interaction.guildId)
        if(!queue || !queue.playing) return client.error.DEFAULT_ERROR(interaction)

        if (!track && !index) inter.reply({
            content: `You have to use one of the options to remove a song ${interaction.member}... try again ? ❌`,
            ephemeral: true
        });

        if(track){
            const selectedTrack = queue.tracks.filter(song => song.title === track || song.url === track)[0]
            if(selectedTrack){
                await queue.remove(selectedTrack)
                return interaction.followUp({
                    content: `Removed **${selectedTrack.title}** from the queue ✅`
                })
            }
            return interaction.followUp({
                content: `Couldn't find **${track}** ${inter.member}... try using the url or the full name of the song ? ❌`,
                ephemeral: true
            })
        }

        if(index){
            const trackIndex = index - 1
            const track = queue.tracks[trackIndex]

            if(!track) return interaction.followUp({
                content: `This track doesn't exist ${interaction.member}...  try again ?❌`,
                ephemeral: true
            })

            await queue.remove(trackIndex)
            return interaction.followUp({
                content: `Removed **${track.title}** from the queue ✅`
            })
        }
    }
}