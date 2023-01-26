const { QueueRepeatMode } = require('discord-player');
const { EmbedBuilder } = require('discord.js')

player.on('error', (queue, error) => {
    client.emit('trackEnd', queue.metadata.guild.id)
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    client.emit('trackEnd', queue.metadata.guild.id)
    console.log(`Error emitted from the connection ${error.message}`);
});

const messages = {}
player.on('trackStart', (queue, track) => {
    if (queue.repeatMode === QueueRepeatMode.TRACK) return;
    client.emit('trackEnd', queue.metadata.guild.id)
    const embed = new EmbedBuilder()
        .setURL(track.url)
        .setThumbnail(track.thumbnail)
        .setTitle(`${track.title}`)
        .addFields({name: `Now Playing in ${queue.connection.channel.name} 🎧`, value: `Requested by ${track.requestedBy}`})
        .setColor('#13f857')

    queue.metadata.send({ embeds: [embed] }).then(message => messages[`${queue.metadata.guild.id}`] = message)
});

player.on('trackAdd', (queue, track) => {
    const embed = new EmbedBuilder()
        .setThumbnail(track.thumbnail)
        .addFields({name: 'New Track Added! ✅', value: `${track.title}`})
        .setColor('#e6cc00')

    queue.metadata.send({ embeds: [embed] }).then(message => setTimeout(() => message.delete(), 30000)) // Delete after 30 seconds
});

client.on('trackEnd' , (guildId = 0) => {
    if(messages[`${guildId}`]) {
        messages[`${guildId}`].delete()
        messages[`${guildId}`] = null
    }
})

player.on('botDisconnect', (queue) => {
    client.emit('trackEnd', queue.metadata.guild.id)
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
});

player.on('channelEmpty', (queue) => {
    client.emit('trackEnd', queue.metadata.guild.id)
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
});

player.on('queueEnd', (queue) => {
    client.emit('trackEnd', queue.metadata.guild.id)
    queue.metadata.send('I finished reading the whole queue ✅');
});

player.on('tracksAdd', (queue) => {
    queue.metadata.send(`All the songs in playlist added into the queue ✅`);
});