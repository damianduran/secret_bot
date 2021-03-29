/** 
 * art.js
 * 
 * This file handles !art command.
 * On request, returns an image from the Harvard
 * Art Museums' photo archive.
 * 
 */

const Discord = require('discord.js');
const axios = require('axios');
const { apiKeys } = require('../../config.json');

module.exports = {

    name: 'art',
    description: 'Art from Harvard Art Musuem archive',
    category: 'fun',
    
    execute(message){

        message.channel.send('Looking through the archives...')

        // Request
        //axios.get(`https://api.harvardartmuseums.org/image?apikey=${process.env.HARVARD_API_KEY}&q=alttext:>1&sort=random`)
        axios.get(`https://api.harvardartmuseums.org/image?apikey=${apiKeys.harvard_art_key}&q=alttext:>1&sort=random`)
            .then(resonse => {

                const id = resonse.data.records[0].idsid;
                const attachment = new Discord.MessageAttachment('https://ids.lib.harvard.edu/ids/iiif/' + id + '/full/full/0/default.jpg');

                // Message send
                message.channel.send(attachment)
                    .then( () =>{
                        message.channel.send('**Description:** ' + resonse.data.records[0].alttext);
                        //console.log(resonse.data.records[0]);
                    })

            }).catch ((error) => {

                    console.log(error);
                    message.channel.send('Oh no, something went wrong :/');
            })
    }
}