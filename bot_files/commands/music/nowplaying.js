/**
 * nowplaying.js
 *
 * This handles !nowplaying commands.
 * 
 */
const Discord = require("discord.js");

module.exports = {

    name: "nowplaying",
	description: "Shows currently playing song",
    aliases: ['np'],
	category: 'music',
    
	execute(message) {

		const embedMessage = new Discord.MessageEmbed();
		const voiceChannel = message.member.voice.channel;
		const sender = message.author.id;
        const playQueue =  message.client.playQueue;

		// Check if sender is in vc
        try {
            // If user is not connected, channel is not defined (error)
            if( voiceChannel.members.has( sender ) === null );
        } catch (error){
			console.log(error);
            return message.reply(' you must be connected to a voice channel.');
        }
        
        // Bot connected to vc check
        if (message.client.connection == 'disconnected'){
            message.reply(' add bot to voice channel first with !join');
            return;
        }

        // Show whats playing
		embedMessage.setColor("#0099ff");
        embedMessage.setAuthor('Now Playing:')
		embedMessage.setTitle(playQueue.firstKey()[0].title);
        embedMessage.setURL(playQueue.firstKey()[0].link);
        embedMessage.addFields(
            { name: 'Channel:', value: playQueue.firstKey()[0].channelTitle},
        );
		embedMessage.setThumbnail(playQueue.firstKey()[0].thumbnails.default.url);
        message.channel.send(embedMessage);

    },	// end execute

};	// end module.exports