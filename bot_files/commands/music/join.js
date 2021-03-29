/** 
 * join.js
 * 
 * This file handles !join command.
 * 
 */

const Discord = require('discord.js');

module.exports = {

    name: 'join',
    description: 'Asks the bot to join your voice channel',
    category: 'music',
    
    execute(message){

        const embedMessage = new Discord.MessageEmbed();
        const voiceChannel = message.member.voice.channel;
        const sender = message.author.id;

        // Check if sender is in vc
        try {
            // If user is not connected, channel is not defined (error)
            if( voiceChannel.members.has( sender ) === null );
        } catch {
            return message.reply(' you must be connected to a voice channel.');
        }
        
        // Bot must be connected to vc 
        if ( message.client.connection != 'disconnected' ){
            return message.reply(' I am already in a voice channel (;' );
        }
        
        // Join channel and play 
        voiceChannel.join().then( connection => {

            // Change to the DJ name B^)
            message.guild.me.setNickname('DJ '+ message.client.user.username);

            // Save connection obj on our client
            voiceChannel.client.connection = connection;
            voiceChannel.client.dispatcher = voiceChannel.client.connection.play('');
            voiceChannel.client.dispatcher.pause();

            // Join message
            embedMessage.setColor('#0099ff');
            embedMessage.setTitle( 'DJ '+message.client.user.username+' is now on the 1\'s and 2\'s');
            embedMessage.attachFiles(["./assets/cat.jpg"]);
			embedMessage.setThumbnail("attachment://cat.jpg");
            embedMessage.setFooter("Summoned by: " + message.author.tag, message.author.avatarURL());
            message.channel.send(embedMessage);

            // Disconnect listener
            voiceChannel.client.connection.on('disconnect', () => {

                voiceChannel.client.connection = 'disconnected';
                message.channel.send('Goodbye forever :smiling_face_with_tear:');
                message.guild.me.setNickname(message.client.user.username);

            });

        }).catch(error => console.log(error));    // could not join

    }   // end execute()

}   // end modules.export