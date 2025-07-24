module.exports = {
    name: 'volume',
    description: 'Adjusts the playback volume.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no song to adjust the volume for!');
        }

        if (!args[0]) {
            return message.channel.send(`The current volume is: **${serverQueue.volume}**`);
        }

        const volume = parseInt(args[0]);
        if (isNaN(volume) || volume < 0 || volume > 10) {
            return message.channel.send('Please provide a number between 0 and 10 for the volume.');
        }

        serverQueue.volume = volume;
        // The volume is not directly applied to the player in this version of discord.js/voice
        // This is a placeholder for the logic to adjust the volume of the resource.
        // For now, it will just store the volume level.
        message.channel.send(`Volume set to: **${volume}**`);
    },
};
