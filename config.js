module.exports = {
    app: {
        playing: 'Music Bot by Ervin 🎮',
    },
    opt: {
        maxVol: 100,
        defaultvolume: 75,
        minVol: 0,
        leaveOnEnd: true,
        leaveOnEndCooldown: 300000, // 5 minutes
        leaveOnStop: true,
        leaveOnEmpty: true,
        leaveOnEmptyCooldown: 5000, // 5 seconds
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio',
                highWaterMark: 1 << 25
            }
        }
    },
    paginate: {
        fastSkip: true, // creates two additional button, one for skip to end, one for skip to first
        pageTravel: true, // travel between pages by sending page numbers
        disableButtons: false, // remove buttons after timeout
        time: 60000, // 60 seconds
        itemsPerPage: 5,
    }
};