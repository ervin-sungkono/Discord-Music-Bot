const { QueueRepeatMode } = require('discord-player')
const { EmbedBuilder } = require('discord.js')

player.events.on('error', (queue, error) => {
    client.emit('trackEnd', queue.metadata.channel.guild.id)
    console.log(`Error emitted from the queue ${error.message}`)
})

player.events.on('playerError', (queue, error) => {
    client.emit('trackEnd', queue.metadata.channel.guild.id)
    console.log(`Error emitted from the connection ${error.message}`)
})

const messages = {}
player.events.on('playerStart', (queue, track) => {
    if (queue.repeatMode === QueueRepeatMode.TRACK) return;
    client.emit('trackEnd', queue.metadata.channel.guild.id)
    const embed = new EmbedBuilder()
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setTitle(`${track.title}`)
        .addFields(
            {name: `Now Playing in ${queue.channel.name} 🎧`, value: `Requested by ${track.requestedBy}`},
            {name: 'Duration', value: `\`(${track.duration})\``}
        )
        .setColor('#13f857')

    queue.metadata.channel.send({ embeds: [embed] }).then(message => messages[`${queue.metadata.channel.guild.id}`] = message)
})

player.events.on('playerSkip', (queue, track) => {
    queue.metadata.channel.send(`Skipping **${track.title}** due to an issue!`);
});

player.events.on('audioTrackAdd', (queue, track) => {
    const embed = new EmbedBuilder()
        .setThumbnail(track.thumbnail)
        .addFields({name: 'New Track Added! ✅', value: `${track.title} \`(${track.duration})\``})
        .setColor('#e6cc00')

    queue.metadata.channel.send({ embeds: [embed] })
})

client.on('trackEnd' , (guildId = 0) => {
    if(messages[`${guildId}`]) {
        messages[`${guildId}`].delete()
        messages[`${guildId}`] = null
    }
})

player.events.on('disconnect', (queue) => {
    client.emit('trackEnd', queue.metadata.channel.guild.id)
    queue.metadata.channel.send('My job is done here, leaving channel...👋')
})

player.events.on('emptyChannel', (queue) => {
    client.emit('trackEnd', queue.metadata.channel.guild.id)
    queue.metadata.channel.send('Nobody is in the voice channel, leaving the voice channel... ❌')
})

player.events.on('emptyQueue', (queue) => {
    client.emit('trackEnd', queue.metadata.channel.guild.id)
    queue.metadata.channel.send('I finished reading the whole queue ✅')
})

player.events.on('audioTracksAdd', (queue, tracks) => {
    const embed = new EmbedBuilder()
        .setURL(tracks[0].playlist.url)
    	.setTitle(tracks[0].playlist.title)
        .setThumbnail(tracks[0].playlist.thumbnail.url ?? tracks[0].playlist.thumbnail)
        .addFields({name: 'New Playlist Added! ✅', value: `${tracks.length} song(s) have been added to queue`})
        .setColor('#e6cc00')

    queue.metadata.channel.send({ embeds: [embed] })
})