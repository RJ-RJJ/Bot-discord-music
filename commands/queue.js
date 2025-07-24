const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'queue',
    description: 'Displays the current song queue.',
    execute(message, args, client) {
        const serverQueue = client.queue.get(message.guild.id);
        if (!serverQueue) {
            return message.channel.send('There is no queue!');
        }

        const queueEmbed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('Music Queue')
            .setDescription(serverQueue.songs.map((song, index) => `${index + 1}. ${song.title}`).join('\n'))
            .setTimestamp();

        message.channel.send({ embeds: [queueEmbed] });
    },
};
