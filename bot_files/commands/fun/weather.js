/** 
 * weather.js
 * 
 * This file handles !weather command.
 * 
 */

const Discord = require('discord.js');
const axios = require('axios');
require('dotenv').config();
const { apiKeys } = require('../../config.json')

module.exports = {

    name: 'weather',
    description: 'Shows you the weather! (City,State)',
    usage: '[City State]',
    args: true,
    category: 'fun',
    
    execute(message, args){

        let embedMessage = new Discord.MessageEmbed();

        // Make args list to string
		var searchString = "";
		JSON.stringify(args);
		args.forEach((element) => {
			searchString += element += " ";
		});

        axios.get(`https://api.weatherbit.io/v2.0/current?&city=${searchString}&country=US&units=I&key=${apiKeys.weather_key}`)
            .then(response => {

                //console.log(response.data.data[0]);

                const entry = response.data.data[0];

                let imgLocation = 'https://www.weatherbit.io/static/img/icons/' + entry.weather.icon + '.png';

                embedMessage.setThumbnail(imgLocation);
                embedMessage.setTitle(`Weather for ${entry.city_name}, ${entry.state_code}, USA `);
                embedMessage.addFields(
                    { name: 'Temperature(F): ', value: entry.temp, inline: true},
                    { name: 'Cloud Coverage: ', value: `${entry.clouds}%`, inline: true },
                    { name: 'Currently: ', value: entry.weather.description, inline: true },
                    
                )
                embedMessage.addFields(
                    { name: 'Sunrise: ', value: entry.sunrise , inline: true},
                    { name: 'Sunset: ', value: entry.sunset, inline: true },
                    { name: 'Wind: ', value: `${entry.wind_spd} MPH  `, inline: true },
                    
                )
                embedMessage.setTimestamp();
                message.channel.send(embedMessage);


            }).catch( error =>{
                console.log(error);
                message.channel.send('Oh no, something went wrong :/');
            })
    }
}