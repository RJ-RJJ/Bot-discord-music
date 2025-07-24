module.exports = {
    name: 'stop',
    description: 'Stops the music and clears the queue.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no queue to stop!');
        }
        serverQueue.songs = [];
        serverQueue.player.stop();
        message.channel.send('Stopped the music and cleared the queue.');
    },
};
