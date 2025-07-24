# Discord Music Bot

A feature-rich Discord music bot built with Node.js and discord.js.

## Features

- **Music Playback**: Play, pause, resume, stop, and skip songs.
- **Queue Management**: View and manage the song queue.
- **YouTube Search**: Search for songs on YouTube.
- **Volume Control**: Adjust the playback volume.
- **Voice Channel Management**: Join and leave voice channels.

## Prerequisites

- Node.js (v16.6.0 or newer)
- npm
- A Discord Bot Token

## Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/discord-music-bot.git
   cd discord-music-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the bot:**
   - Create a `.env` file in the root directory.
   - Add the following to your `.env` file:
     ```
     DISCORD_TOKEN=YOUR_DISCORD_TOKEN
     PREFIX=!
     ```

## Running the Bot

To start the bot, run the following command:

```bash
node index.js
```

## Commands

- `!ping`: Checks if the bot is responsive.
- `!join`: Joins the voice channel you are in.
- `!leave`: Leaves the voice channel.
- `!play <song name or URL>`: Plays a song from YouTube or adds it to the queue.
- `!pause`: Pauses the current song.
- `!resume`: Resumes the current song.
- `!skip`: Skips the current song.
- `!stop`: Stops the music and clears the queue.
- `!queue`: Displays the current song queue.
- `!nowplaying`: Shows the currently playing song.
- `!volume <0-10>`: Adjusts the playback volume.

## Permissions Required

The bot requires the following permissions on your Discord server:

- **View Channels**
- **Send Messages**
- **Embed Links**
- **Connect**
- **Speak**
- **Use Voice Activity**
