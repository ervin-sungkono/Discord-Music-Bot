const { EmbedBuilder } = require('discord.js')

player.on('error', (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
});

player.on('trackStart', (queue, track) => {
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    const embed = new EmbedBuilder()
        .setTitle(`Now playing ${track.title} in ${queue.connection.channel.name} 🎧`)
        .setDescription(`Requested by: ${track.requestedBy}`)
        .setColor('#13f857')

    queue.metadata.send({ embeds: [embed] })
});

player.on('trackAdd', (queue, track) => {
    const embed = new EmbedBuilder()
        .setDescription(`Track **${track.title}** added in the queue ✅`)
        .setColor('#e6cc00')
    queue.metadata.send({ embeds: [embed] });
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('I was manually disconnected from the voice channel, clearing queue... ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('Nobody is in the voice channel, leaving the voice channel... ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('I finished reading the whole queue ✅');
});

player.on('tracksAdd', (queue, tracks) => {
    queue.metadata.send(`All the songs in playlist added into the queue ✅`);
});