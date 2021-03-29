/**
 * play.js
 *
 * This handles !play commands.
 * 
 */
const Discord = require("discord.js");
const next = require("./next");
const search = require("youtube-search");
const { apiKeys } = require("../../config.json");

module.exports = {

	name: "play",
	description: "Play music from Youtube.",
	aliases: ['p'],
	usage: "[search string]",
	args: true,
	category: 'music',
    
	execute(message, args) {

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

		// YouTube search options
		const searchOptions = {
			maxResults: 1,
            key: apiKeys.youtubeKey,
            type: 'video',
		};

		// Make args list to string
		var searchString = "";
		JSON.stringify(args);
		args.forEach((element) => {
			searchString += element += " ";
		});

		// YouTube search
		search(searchString, searchOptions, (error, results) => {

            // Uh oh...
			if (error) return console.log(error);
			//console.dir(results);

			// Add results to queue
			playQueue.set(results);
			
			// If theres nothing playing yet
            if(playQueue.size == 1){
				//voiceChannel.client.playQueue.set(results);
                next.execute(message,1);
            }
			else{
				embedMessage.setTitle(playQueue.lastKey()[0].title);
				embedMessage.setURL(playQueue.lastKey()[0].link);
				embedMessage.setAuthor('Added to queue:');
				embedMessage.addFields({
					name: 'Channel:', value: playQueue.lastKey()[0].channelTitle
				});
				embedMessage.setThumbnail(playQueue.lastKey()[0].thumbnails.default.url);
				message.channel.send(embedMessage);
			}
			
        });	// end search()

		// Error listener
		voiceChannel.client.dispatcher.on("error", (error) => {
			message.channel.send('There was a problem playing that...')
			console.log(error);
		});

		// Song done listener play next
		voiceChannel.client.dispatcher.on("finish", () => {
			playQueue.delete(playQueue.firstKey());
			next.execute(message,1);
		
		});

    },	// end execute

};	// end module.exports

