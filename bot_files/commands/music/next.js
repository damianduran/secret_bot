/**
 * next.js
 *
 * This handles !next command.
 *  
 */

const Discord = require("discord.js");
const ytdl = require("ytdl-core");

// play next in queue
module.exports = {

	name: "next",
    description: "Skips to the next song in the queue",
    aliases: ['skip'],
    category: 'music',
   
	execute(message, args) {

		const embedMessage = new Discord.MessageEmbed();
        const client = message.client;
        const playQueue =  message.client.playQueue;

		// play() options
		const streamOptions = {
			seek: 0,
			volume: 1,
		};
      
        // Skip logic
        if(args==1) {
            //message.channel.send('...')
        }
        else{
            message.channel.send('Song skipped...')
            playQueue.delete(playQueue.firstKey());
        }

        // Queue is empty 
        if( playQueue.size == 0 ) {
            client.dispatcher.pause();
            return message.channel.send('Queue is empty');
        }
        // Play next in queue
        const stream = ytdl(playQueue.firstKey()[0].link ,{quality: "highestaudio",});
        client.dispatcher = client.connection.play(stream, streamOptions);

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

    },  // end execute()

}