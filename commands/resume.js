module.exports = {
    name: 'resume',
    description: 'Resumes the current song.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no song to resume!');
        }
        if (serverQueue.player.state.status === 'playing') {
            return message.channel.send('The song is already playing!');
        }
        serverQueue.player.unpause();
        message.channel.send('Resumed the song.');
    },
};
