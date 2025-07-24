module.exports = {
    name: 'skip',
    description: 'Skips the current song.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no song to skip!');
        }
        serverQueue.player.stop();
        message.channel.send('Skipped the song.');
    },
};
