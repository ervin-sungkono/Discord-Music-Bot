const { EmbedBuilder, InteractionType } = require('discord.js')

module.exports = async(client, interaction) => {
    if (interaction.type === InteractionType.ApplicationCommand) {
        const command = client.commands.get(interaction.commandName);

        if (!command) return interaction.reply({ 
            embeds: [ 
                new EmbedBuilder()
                    .setColor('#ff0000')
                    .setDescription('❌ | Error! Please contact Developers!')], 
            ephemeral: true, 
        }), client.slash.delete(interaction.commandName)

        if(command.voiceChannel){
            if (!interaction.member.voice.channel) {
                return interaction.reply({ content: "You are not in a voice channel!", ephemeral: true })
            }
        
            if (interaction.guild.members.me.voice.channelId && interaction.member.voice.channel.id !== interaction.guild.members.me.voice.channel.id) {
                return interaction.reply({ content: "You are not in my voice channel!", ephemeral: true })
            }
        }
        command.execute({ client, interaction })
    }
    else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
        const command = client.commands.get(interaction.commandName);
        await command.autocomplete({ interaction });
    }
}