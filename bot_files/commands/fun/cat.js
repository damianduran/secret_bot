/** 
 * cat.js
 * 
 * This file handles !cat command.
 * 
 */

const Discord = require('discord.js');
const axios = require('axios');

module.exports = {

    name: 'cat',
    description: 'Cool cat pics',
    category: 'fun',
    
    execute(message){


        axios.get('http://shibe.online/api/cats?')
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