module.exports = {
    DEFAULT_ERROR: function(interaction) {
        return interaction.followUp({ 
            content: `No music currently playing ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })
    },
    NO_NEXT_TRACKS: function (interaction) {
        return  interaction.followUp({
            content: `No music in the queue after the current one ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })
    },
    NO_PREVIOUS_TRACKS: function(interaction) {
        return interaction.followUp({
            content: `There was no music played before ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })
    },
    NO_RESULTS_FOUND: function(interaction) {
        return interaction.followUp({
            content: `No results found ${interaction.member}... try again ? ❌`,
            ephemeral: true
        })
    },
    CONNECTION_FAIL: function(interaction) {
        return interaction.followUp({
            content: "Could not join your voice channel!, try again ? ❌",
            ephemeral: true
        })
    }
}