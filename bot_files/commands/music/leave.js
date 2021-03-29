/** 
 * leave.js
 * 
 * This file handles !leave command.
 * 
 */

module.exports = {

    name: 'leave',
    description: 'Asks the bot to leave your voice channel',
    aliases: ['begone'],
    category: 'music',
    
    execute(message){

        const sender = message.author.id;
        const voiceChannel = message.member.voice.channel;

        // Check if sender is in vc
        try {
            // If user is not connected, channel is not defined (error)
            if( voiceChannel.members.has( sender ) === null );
        } catch {
            return message.reply(' you must be connected to a voice channel.');
        }

        // Bot must be connected to vc 
        if ( message.client.connection == 'disconnected' ){
            return message.reply(' I already left :\'(' );
        }
        
        // Leave channel and Clear q
        message.client.connection.disconnect();
        message.client.playQueue.clear()
        
    }

}