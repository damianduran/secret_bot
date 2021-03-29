<div align="center">
	<p>
    	<img style="border-radius: 10px" width="100" height="100" src="bot_files\assets\cat.jpg">
	</p>
	<h2>Secret Bot</h2>
    <h4>A Discord bot.</h4>
</div>

## Commands

Run `!help` to see command usage.

#### Info

| Command | Description |
| ------- | ----------- |
| `!help` | Displays a list of available commands |
| `!about` | Displays information about the bot |
| `!server` | Displays information about this server |


#### Fun Stuff

| Command | Description |
| ------- | ----------- |
| `!art` | Displays a random piece of artwork from [Harvard Art Musuem archive](https://harvardartmuseums.org/collections?) |
| `!dadjoke` | Tells you a HILARIOUS dad joke |
| `!dog` | Shows you some cool dog pics |
| `!cat` | Shows you some cool cat pics |
| `!bird` | Shows you some cool bird pics |
| `!shibe` | Shows you some cool shibe pics |
| `!space` | Fetch NASA\'s [Astronomy Picture of the Day](https://apod.nasa.gov/) |
| `!weather` | Searches the weather for a specified location |

#### Music

| Command | Description |
| ------- | ----------- |
| `!join` | Make the bot join your current voice channel |
| `!leave` | Make the bot leave your voice channel |
| `!play` | Search YouTube for something to play |
| `!pause` | Pauses audio  |
| `!resume` | Resumes audio |
| `!next` | Skips to the next song in the queue |
| `!nowplaying` | Shows the currently playing song |
| `!queue` | Shows the contents of the song queue |


---


## Installing and Hosting 
#### Prerequisites 
You will need to have [node](https://nodejs.org/en/) installed on your machine.

#### Installing
To install the bot, you can clone this repo.
```
git clone https://github.com/damianduran/secret-bot.git
```
#### Setting Up
You will have to create a `config.json` file in the `/bot_files` folder. The file should look like this:
```
{
    "prefix": "!",
    "discordToken": "YOUR_TOKEN_HERE",
    "apiKeys": {
        "youtubeKey": "your_API_key_here",
        "harvard_art_key": "your_API_key_here",
        "nasa_key": "your_API_key_here",
        "weather_key": "your_API_key_here",
    }
}

```

Head over to the Discord [Developer Portal](https://discordapp.com/developers/applications/) to create an app.  
Then use the client token you are provided as the `discordToken`.
To obtain keys for the other APIs, visit:
- [YouTube](https://developers.google.com/youtube/v3/getting-started) - This API is used for music playback.
- [Harvard Art](https://harvardartmuseums.org/collections/api) - This API is used to serve artwork from the Harvard Art Museum archive.
- [NASA](https://api.nasa.gov/) - This API is used to serve NASA.gov's astronomy picture of the day.
- [Weather](https://www.weatherbit.io/account/create) - (*Work in progress*) Used to show weather.

#### Running
To start running, in the `/bot_files` directory, run:
```
node bot.js
```
