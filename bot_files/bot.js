/** 
 * bot.js
 * 
 * This file establishes a client to interact with the Discord API.
 * Messages are handled and commands are sent to respective module.
 * Some code borrowed from discordjs.guide
 *  
 */

// Dependencies and constants
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, discordToken } = require('./config.json')

// Instantiate client
const client = new Discord.Client();            // Discord client
client.commands = new Discord.Collection();     // stores command list
client.playQueue = new Discord.Collection();    // stores song queue
client.connection = 'disconnected';             // connection state of client in a voice chat

// Add commands from files
const commandCategories = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));
const commandFiles = [];

for( const category of commandCategories){

    commandFiles.push( fs.readdir(`./commands/${category}`, (err,files) => {

        for( const file of files){
            const command = require(`./commands/${category}/${file}`);
            client.commands.set(command.name, command);
        }
        
    }));
}

// Client ready event listener
client.once('ready', () => {
    console.log('Beep, boop I am ready (:');

    // Set the client user's status
    client.user.setStatus('online')
        .catch(console.error);  
    
});

// Client message event listener
client.on('message', message => {
    
    // Check if message is a command
    if(!message.content.startsWith(prefix) || message.author.bot) return; 
      
    // Getting arguments and command 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Command aliases
    const command = client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    // Command exists?
    if(!command) return message.channel.send(':face_with_raised_eyebrow:');

    // Some commands can be executed in dm's (!help)
    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply('I can\'t execute that command inside DMs!');
    }
    
    // Check if command needs arguments
    if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}.`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }   
    
    // Execute command 
	try {
        command.execute(message, args);
	} catch (err) {
		console.error(err);
        message.reply('there was an error trying to execute that command!');
	}   

}); // end on.message

// Log in using token
client.login(discordToken)
    .catch((err) => console.log(err));
