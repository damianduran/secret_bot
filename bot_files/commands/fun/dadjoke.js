/** 
 * dadjoke.js
 * 
 * This file handles !dadjoke command.
 * 
 */

const axios = require('axios');

module.exports = {

    name: 'dadjoke',
    description: 'Tells you a HILARIOUS dad joke',
    category: 'fun',
    
    execute(message, args){

        var msg = ':man_tipping_hand:';

        axios.get('https://icanhazdadjoke.com/',{
            headers: {Accept: 'text/plain'}
        })
            .then( response => {

                msg += response.data;
                return message.channel.send(msg);

            }).catch( error => {
                console.log(error);
                message.channel.send('Oh no, something went wrong :/');
            })
    }
}