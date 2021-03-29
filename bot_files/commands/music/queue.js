/**
 * queue.js
 *
 * This handles !queue command.
 * 
 */
const Discord = require("discord.js");

module.exports = {

	name: "queue",
    description: "Shows the !play queue",
    aliases: ['q'],
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
			//console.log(error);
            return message.reply(' you must be connected to a voice channel.');
        }

        // Bot connected to vc check
        if (message.client.connection == 'disconnected'){
            message.reply(' add me to a voice channel first with !join');
            return;
        }

        // Queue empty?
        if(playQueue.size == 0) return message.channel.send('Queue is empty');

        // Show the queue
		embedMessage.setColor("#0099ff");
        embedMessage.setTitle('Queue:')

        // Formatting...
        var count = 0;
        var pre = ''

        // Add queue contents to a message
        for( const song of playQueue.entries() ){

            if(count == 0 ){

                pre = '__Now Playing:__'

            }

            // Formatting
            else if(count == 1) pre = '__Up Next:__';
            else pre =  '\u200b';

            embedMessage.addFields({ 
                name: pre, 
                value: '`' + count + ':` ['+ song[0][0].title +']('
                + song[0][0].link +')'
            })
            count++;

        }

        // Send it
        message.channel.send(embedMessage);

    },  // end execute()

}