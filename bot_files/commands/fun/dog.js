/** 
 * dog.js
 * 
 * This file handles !dog command.
 * 
 */

const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

    name: 'dog',
    description: 'Cool dog pics',
    category: 'fun',
    
    execute(message, args){


        axios.get('https://dog.ceo/api/breeds/image/random')
            .then(response => {
                const attachment = new Discord.MessageAttachment(response.data.message);
                message.channel.send(attachment);
                //console.log(resonse.data.message);

            }).catch( error =>{
                console.log(error);
                message.channel.send('Oh no, something went wrong :/');
            })
    }
}