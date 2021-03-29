/** 
 * help.js
 * 
 * This handles !help and !help [command] commands.
 * Some code borrowed from discordjs.guide
 * 
 */

const { prefix } = require('../../config.json');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {

	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	category: 'misc',
    
	execute(message, args) {

        const data = [];
		const { commands } = message.client;

		// Add commands from files
		const commandCategories = fs.readdirSync('./commands').filter(file => !file.endsWith('.js'));
		const commandFiles = [];

        // Basic !help command
		if (!args.length) {

			//
            const attachment = new Discord.MessageAttachment('assets/thisguy.png');
	        message.channel.send(attachment);

			const sleep = (ms) => {
				return new Promise( resolve => setTimeout(resolve, ms));
			}

			const asyncFoo = async () => {
				await sleep(1000);
			}

			data.push('**Here\'s a list of all my commands:**');

			for( const category of commandCategories){

				commandFiles.push( fs.readdir(`./commands/${category}`, (err,files) => {
		
					data.push(`**Category: ${category}**`);
					//console.log(category);
	
					for( const file of files){
						data.push(`\t${file}`);
					}
		
				}));
			}

			asyncFoo;

			data.push(`You can send \`${prefix}help [command name]\` to get info on a specific command!`);
            
            // Send help as dm to requestee
			return message.author.send(data, { split: true })
				.then( () => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                    
				})
				.catch(error => {
					console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you!');
                    
                });
		     
		}   // end if

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
            return message.reply('that\'s not a valid command!');
		}

        // !help with arguments
		data.push(`**Name:** ${command.name}`);
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        
        message.channel.send(data, { split: true });	    
        
	},
};