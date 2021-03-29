/** 
 * bird.js
 * 
 * This file handles !bird command.
 * 
 */

const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

    name: 'bird',
    description: 'Cool bird pics',
    aliases: ['birb'],
    category: 'fun',
    
    execute(message){


        axios.get('http://shibe.online/api/birds?')
            .then(response => {
                const attachment = new Discord.MessageAttachment(response.data[0]);
                message.channel.send(attachment);
                //console.log(response);

            }).catch( error =>{
                console.log(error);
                message.channel.send('Oh no, something went wrong :/');
            })
    }
}