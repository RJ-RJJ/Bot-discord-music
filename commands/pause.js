module.exports = {
    name: 'pause',
    description: 'Pauses the current song.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no song to pause!');
        }
        if (serverQueue.player.state.status === 'paused') {
            return message.channel.send('The song is already paused!');
        }
        serverQueue.player.pause();
        message.channel.send('Paused the song.');
    },
};
