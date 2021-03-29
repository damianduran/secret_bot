/** 
 * about.js
 * 
 * 
 */
const Discord = require("discord.js");
const { prefix } = require('../../config.json')

module.exports = {

	name: 'about',
	description: 'Display info about the server.',
    
	execute(message) {

        const embedMessage = new Discord.MessageEmbed()
            .setTitle('Hello! :wave::sunglasses: ')
			.setDescription(`I\'m a Discord bot.\n Run ${prefix}help for a list of commands.`)
			.setColor('#fc03fc')
            .attachFiles(["./assets/cat.jpg"])
			.setThumbnail("attachment://cat.jpg");

		message.channel.send(embedMessage);
	},
};