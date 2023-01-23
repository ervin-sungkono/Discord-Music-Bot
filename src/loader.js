const { Collection } = require("discord.js")
const { readdirSync } = require('fs')

client.commands = new Collection()
commandsList = []

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'))

console.log(`Loading commands...`);

for(const file of commandFiles){
    const command = require(`../commands/${file}`)
    if(command.name && command.description){
        commandsList.push(command)
        console.log(`=> [Loaded Command] -- ${command.name.toLowerCase()}`)
        client.commands.set(command.name.toLowerCase(), command)
        delete require.cache[require.resolve(`../commands/${file}`)];
    }else{
        console.log(`XX [Failed Command] -- ${file.split('.')[0].toLowerCase()}`)
    }
}

const events = readdirSync('./events/').filter(file => file.endsWith('.js'));

console.log(`Loading events...`);

for (const file of events) {
    const event = require(`../events/${file}`);
    console.log(`=> [Loaded Event] -- ${file.split('.')[0]}`);
    client.on(file.split('.')[0], event.bind(null, client));
    delete require.cache[require.resolve(`../events/${file}`)];
};

client.on('ready', (client) => {
    client.application.commands.set(commandsList)
})