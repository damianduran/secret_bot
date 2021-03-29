/** 
 * shibe.js
 * 
 * This file handles !shibe command.
 * 
 */

const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

    name: 'shibe',
    description: 'Cool shibe pics',
    category: 'fun',
    
    execute(message){

        axios.get('http://shibe.online/api/shibes?')
            .then(response => {
                const attachment = new Discord.MessageAttachment(response.data[0]);
                message.channel.send(attachment);
                //console.log(response.data);

            }).catch( error =>{
                console.log(error);
                message.channel.send('Oh no, something went wrong :/');
            })
    }
}