# Discord Music Bot
Music bot for Discord servers.

## Resources
Libraries used in this project:
1. [Androz2091/discord-player](https://github.com/Androz2091/discord-player)
2. [discord.js](https://github.com/discordjs/discord.js)
3. [@devraelfreeze/discordjs-pagination](https://github.com/devRael1/discordjs-pagination)

## Features
- Easy to use 📚
- Slash Command Support 👏
- Plays in multiple servers 🎮

## Commands
List of registered commands for the bot:
|      Name      |            Description             |  Options  |
|:---------------|:----------------------------------:|----------:|
|  **/autoplay** |        Toggle song autoplay        |           |
|   **/back**    |      Play the previous track       |           |
| **/bassboost** |      Toggle bassboost filter       |           |
|   **/clear**   |      Clear the current queue.      |           |
|  **/history**  |     Display the queue history      |           |
|   **/loop**    |        Turn on/off looping         | \<action> |
|   **/lyrics**  |       Show lyrics for a song       |  \<song>  |
|  **/history**  |     Display the queue history      |           |
|   **/pause**   |       Pause the current song       |           |
|   **/play**    |      Play a song from youtube      |  \<song>  |
| **/playnext**  | Add a song to the top of the queue |  \<song>  |
|   **/queue**   |           See the queue            |           |
|  **/remove**   |      Remove a specific track       |  \<song>  |
|  **/resume**   |      Resume the current song       |           |
|  **/shuffle**  |         Shuffle the queue          |           |
|   **/skip**    |        Skip the current song       |           |
|   **/stop**    |          Stop the player           |           |
|  **/volume**   |          Set music volume          | \<amount> |

## Requirements
- NodeJS v16.9.0 or higher

## Installation
1. Clone the repository
```sh
git clone https://github.com/ervin-sungkono/Discord-Music-Bot.git
```
2. Install dependencies
```sh
npm install
```
3. Copy .env.example and remove it, fill in the variables:
```sh
cp .env.example .env
```
- `DISCORD_TOKEN` is your Discord bot token, you can find it [here](https://discord.com/developers/applications)
- `GENIUS_API` is your Genius API token, you can find it [here](https://docs.genius.com/) (optional)
4. Start the bot
```sh
npm start
```
-  or in development mode, you can do this instead:
```sh
npm run dev
```

## References
1. [discord-music-bot](https://github.com/Androz2091/discord-music-bot) by [Androz2091](https://github.com/Androz2091)
2. [Music-bot](https://github.com/ZerioDev/Music-bot) by [ZerioDev](https://github.com/ZerioDev)
3. [Discord.js Guide](https://discordjs.guide/)
