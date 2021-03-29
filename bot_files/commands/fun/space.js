/** 
 * space.js
 * 
 * This file handles !space command.
 * APOD is NASA.gov's:
 * Astronomy
 * Picture 
 * Of the
 * Day
 * 
 */

const axios = require('axios');
const Discord = require('discord.js');
const { apiKeys } = require('../../config.json');

module.exports = {

    name: 'space',
    description: 'Fetch NASA.gov\'s Astronomy Picture of the Day ',
    category: 'fun',
    
    execute(message){

        const embedMessage = new Discord.MessageEmbed();

        axios.get(`https://api.nasa.gov/planetary/apod?api_key=${apiKeys.nasa_key}&thumbs=true`)
            .then( response => {

                // Videos 
                if(response.data.media_type == 'video') embedMessage.setImage(response.data.thumbnail_url);
                else embedMessage.setImage(response.data.url);

                embedMessage.setAuthor('Astronomy Picture of the Day ', 'https://api.nasa.gov/assets/img/favicons/favicon-192.png','https://apod.nasa.gov');
                embedMessage.setTitle(response.data.title);
                embedMessage.setURL(response.data.url);
                embedMessage.setDescription(response.data.explanation);
                embedMessage.setTimestamp();
                message.channel.send(embedMessage);
                //console.log(response.data);
                
            }).catch( error => {
                console.log(error);
                message.channel.send('Oh no, something went wrong :/');
            })
    }
}