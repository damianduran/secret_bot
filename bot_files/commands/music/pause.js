/** 
 * pause.js
 */

module.exports = {

    name: 'pause',
    description: 'Pauses music from Youtube.',
    aliases: ['stop'],
    category: 'music',

    execute(message){

        const voiceChannel = message.member.voice.channel;
		const sender = message.author.id;
		
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
            return message.reply(' I am currently not connected to a voice channel :smiling_face_with_tear:');
        }

        //
        try{ message.client.dispatcher.pause(); }
        catch{ return message.channel.send('Cannot pause'); }
    },
};