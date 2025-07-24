const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'Leaves the voice channel.',
    execute(message) {
        const connection = getVoiceConnection(message.guild.id);
        if (!connection) {
            return message.channel.send('I am not in a voice channel!');
        }
        connection.destroy();
        message.channel.send('Left the voice channel.');
    },
};
