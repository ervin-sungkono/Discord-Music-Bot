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
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    client.emit('trackEnd', queue.metadata.guild.id)
    const embed = new EmbedBuilder()
        .setTitle(`Now playing ${track.title} in ${queue.connection.channel.name} 🎧`)
        .setDescription(`Requested by: ${track.requestedBy}`)
        .setColor('#13f857')

    queue.metadata.send({ embeds: [embed] }).then(message => messages[`${queue.metadata.guild.id}`] = message)
});

player.on('trackAdd', (queue, track) => {
    const embed = new EmbedBuilder()
        .setDescription(`Track **${track.title}** added in the queue ✅`)
        .setColor('#e6cc00')
    queue.metadata.send({ embeds: [embed] }).then(message => setTimeout(message.delete(), 30000)) // Delete after 30 seconds
});

client.on('trackEnd' , (guildId = 0) => {
    if(!messages[`${guildId}`]) {
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